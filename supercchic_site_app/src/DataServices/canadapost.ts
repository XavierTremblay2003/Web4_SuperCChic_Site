import kebabCase from 'lodash.kebabcase';
import camelCase from 'lodash.camelcase';
import { Url } from 'url';
import fetch from 'node-fetch';
import xml2js from 'xml2js';
import axios from 'axios';


const parser = new xml2js.Parser({ explicitArray: false });

const parseXML = (string : string, opts? : any) : any => {
  return new Promise((resolve, reject) => {
    const cb = (err : any, res : any) => err ? reject(err) : resolve(res);
    parser.parseString(string, cb);
  });
};

const get = (obj : any, path : string, def : any) => {
  try {
    const val = path.replace(/(^[.[\]\s]+|[.[\]\s]+$)/g, '').split(/[.[\]]/).reduce((a, p) => a[p], obj);
    return val === undefined ? def : val;
  } catch (err) {
    return def;
  }
};

const normalizeArray = (val : any) => {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

class CanadaPostError extends Error {

  code : string
  originalMessages : any

  constructor (message : any, code : string) {
    let finalMessage = message;
    let finalCode = code;
    let originalMessages = message;
    if (Array.isArray(message)) {
      // Handle case where we passed an array of Canada Post messages
      finalMessage = message.map(m => `${m.description} - (code ${m.code})`).join('\n');
      finalCode = message.map(m => `${m.code}`).join(',');
    } else if (message.description && message.code) {
      // Handle case where we passed a single Canada Post messaeg
      finalMessage = message.description;
      finalCode = message.code;
      originalMessages = [message];
    } else {
      // Handle case where we passed a string (and code?)
      originalMessages = [];
    }
    super(finalMessage);
    this.code = finalCode;
    this.originalMessages = originalMessages;
    Error.captureStackTrace(this, CanadaPostError);
  }
}

export default  class CanadaPostClient {

  ENDPOINT = 'soa-gw.canadapost.ca';
  ENDPOINT_DEV = 'ct.soa-gw.canadapost.ca';
  canadaPostError = CanadaPostError;
  endpoint : string
  auth : string;
  customer : any;
  lang : string

  constructor (userId : string, password : string, customer? : string, lang? : string, useTestEndpoint? : boolean) {
    if (useTestEndpoint === true) {
      this.endpoint = this.ENDPOINT_DEV;
    } else if (useTestEndpoint === false) {
      this.endpoint = this.ENDPOINT;
    } else {
      this.endpoint = process.env.NODE_ENV === 'production' ? this.ENDPOINT : this.ENDPOINT_DEV;
    }

    this.auth = `${userId}:${password}`
    this.customer = customer;
    this.lang = lang || 'en-CA';
  }

   _request (call : any, params : any, contentType : any, path? : any, method = 'GET') {
    // Set-up the URL & Parameters
    const reqUrl = new URL(`https://${this.endpoint}`);

    if (path) {
      reqUrl.pathname = `/${path}/${call}`;
    } else if (this.customer) {
      reqUrl.pathname = `/rs/${this.customer}/${call}`;
    } else {
      reqUrl.pathname = `/${call}`;
    }

    let body;
    if (params && method === 'GET') {
      reqUrl.search = params;
    } else if (params) {
      const builder = new xml2js.Builder();
      body = builder.buildObject(params);
    }

    return this._rawRequest(method, reqUrl.toString(), contentType, body);
  }

   _rawRequest (method : any, url : any, contentType : any, body : any) {
    // Set-up the request
    const reqParams = {
      method,
      body,
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
        Authorization: `Basic ${this.auth}`,
        'Accept-language': this.lang
      }
    };

    const axiosInstance = axios.create({
      timeout: 30000, // 30 seconds
      headers: reqParams.headers
      });

    let result : any;
    // Perform the request
    let test = axiosInstance.post(url, reqParams.body)
    .then((responce => {
        result = parseXML(responce.data);
    }))
    .catch((err) => {
      console.log(err);
    })

    


    // We got a response, but Canada Post indicates an error
    if (result && result.messages && result.messages.message) {
      // Parsing errors handled in CanadaPostError constructor
      throw new CanadaPostError(result.messages.message,"");
    }

    // No error? Let's return that.
    return result;
  }

   discoverServices (originPostalCode : any, destinationCountry : any, destinationPostalCode : any) {
    const request = {
      origpc: originPostalCode,
      country: destinationCountry,
      destpc : null
    };

    if (destinationPostalCode) {
      request.destpc = destinationPostalCode;
    }

    const result =  this._request('service', request, 'application/vnd.cpc.ship.rate-v4+xml', 'rs/ship');

    CanadaPostClient.checkResultFormat(result, 'services.service', Array.isArray(result.services.service));

    return get(result, 'services.service', []).map((r : any) => ({
      serviceCode: r['service-code'],
      serviceName: r['service-name']
    }));
  }

  getRates (scenario : any) {
    const mailingScenario = CanadaPostClient.setNamespace(scenario, 'http://www.canadapost.ca/ws/ship/rate-v4');

    if (this.customer) {
      mailingScenario.customerNumber = this.customer;
    }

    let result =  this._request('price', { mailingScenario }, 'application/vnd.cpc.ship.rate-v4+xml', 'rs/ship', 'POST');
    result = CanadaPostClient.normalizeObject(result, false, true);

    CanadaPostClient.checkResultFormat(result, 'priceQuotes.priceQuote', Array.isArray(result.priceQuotes.priceQuote));

    result = result.priceQuotes.priceQuote;
    return result.map((r : any) => {
      delete r.serviceLink;
      r.priceDetails.adjustments = normalizeArray(r.priceDetails.adjustments && r.priceDetails.adjustments.adjustment);
      r.priceDetails.options = normalizeArray(r.priceDetails.options && r.priceDetails.options.option);
      return r;
    });
  }

  static normalizeObject (obj : any, kebab : any, ignoreAttrs? : any) : any {
    if ((!Array.isArray(obj) && typeof obj !== 'object') || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(o => CanadaPostClient.normalizeObject(o, kebab, ignoreAttrs));
    } else {
      let out : { [key : string ] : any; } = {};
      const keys = Object.keys(obj);
      keys.forEach(key => {
        if (key === '_' && (keys.length === 1 || (keys.length === 2 && obj.$ && ignoreAttrs))) {
          out = obj._;
        } else if (key !== '$') {
          const newKey = kebab ? kebabCase(key) : camelCase(key);
          out[newKey] = CanadaPostClient.normalizeObject(obj[key], kebab, ignoreAttrs);
        } else if (!ignoreAttrs) {
          out[key] = obj[key];
        }
      });
      return out;
    }
  }

  static checkResultFormat (result : any, path : any, and : any) {
    if (get(result, path, undefined) === undefined || and === false) {
      throw new Error(`Response was in an unknown format. Expected: ${path}, found ${JSON.stringify(result, null, 4)}`);
    }
  }

  static setNamespace (obj : any, xmlns : any) {
    return Object.assign({}, obj, { $: { xmlns } });
  }

}
