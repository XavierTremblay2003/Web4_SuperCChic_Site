const kebabCase = require('lodash.kebabcase');
const camelCase = require('lodash.camelcase');
const URL = require('url').Url;
const fetch = require('node-fetch');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false });

const parseXML = (string : string, opts : any) => {
  return new Promise((resolve, reject) => {
    const cb = (err : any, res : any) => err ? reject(err) : resolve(res);
    parser.parseString(string, opts || cb, cb);
  });
};

const get = (obj : any, path : string, def : string) => {
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
  ENDPOINT_DEV = 'ct.soa-gw.canadapost.ca'
  canadaPostError = CanadaPostError;
  endpoint : string

  constructor (userId : string, password : string, customer : string, lang : string, useTestEndpoint : boolean) {
    if (useTestEndpoint === true) {
      this.endpoint = this.ENDPOINT_DEV;
    } else if (useTestEndpoint === false) {
      this.endpoint = this.ENDPOINT;
    } else {
      this.endpoint = process.env.NODE_ENV === 'production' ? CanadaPostClient.ENDPOINT : CanadaPostClient.ENDPOINT_DEV;
    }

    this.auth = Buffer.from(`${userId}:${password}`, 'utf8').toString('base64');
    this.customer = customer;
    this.lang = lang || 'en-CA';
  }

  async _request (call, params, contentType, path = null, method = 'GET') {
    // Set-up the URL & Parameters
    const reqUrl = new URL();
    reqUrl.hostname = this.endpoint;
    reqUrl.protocol = 'https:';

    if (path) {
      reqUrl.pathname = `/${path}/${call}`;
    } else if (this.customer) {
      reqUrl.pathname = `/rs/${this.customer}/${call}`;
    } else {
      reqUrl.pathname = `/${call}`;
    }

    let body;
    if (params && method === 'GET') {
      reqUrl.query = params;
    } else if (params) {
      const builder = new xml2js.Builder();
      body = builder.buildObject(CanadaPostClient.normalizeObject(params, true));
    }

    return this._rawRequest(method, reqUrl.format(), contentType, body);
  }

  async _rawRequest (method, url, contentType, body) {
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

    // Perform the request
    const rawResult = await fetch(url, reqParams);
    const result = await parseXML(await rawResult.text());

    // We got a response, but Canada Post indicates an error
    if (result && result.messages && result.messages.message) {
      // Parsing errors handled in CanadaPostError constructor
      throw new CanadaPostError(result.messages.message);
    }

    // No error? Let's return that.
    return result;
  }

  async discoverServices (originPostalCode, destinationCountry, destinationPostalCode) {
    const request = {
      origpc: originPostalCode,
      country: destinationCountry
    };

    if (destinationPostalCode) {
      request.destpc = destinationPostalCode;
    }

    const result = await this._request('service', request, 'application/vnd.cpc.ship.rate-v3+xml', 'rs/ship');

    CanadaPostClient.checkResultFormat(result, 'services.service', Array.isArray(result.services.service));

    return get(result, 'services.service', []).map(r => ({
      serviceCode: r['service-code'],
      serviceName: r['service-name']
    }));
  }

  async getRates (scenario) {
    const mailingScenario = CanadaPostClient.setNamespace(scenario, 'http://www.canadapost.ca/ws/ship/rate-v3');

    if (this.customer) {
      mailingScenario.customerNumber = this.customer;
    }

    let result = await this._request('price', { mailingScenario }, 'application/vnd.cpc.ship.rate-v3+xml', 'rs/ship', 'POST');
    result = CanadaPostClient.normalizeObject(result, false, true);

    CanadaPostClient.checkResultFormat(result, 'priceQuotes.priceQuote', Array.isArray(result.priceQuotes.priceQuote));

    result = result.priceQuotes.priceQuote;
    return result.map(r => {
      delete r.serviceLink;
      r.priceDetails.adjustments = normalizeArray(r.priceDetails.adjustments && r.priceDetails.adjustments.adjustment);
      r.priceDetails.options = normalizeArray(r.priceDetails.options && r.priceDetails.options.option);
      return r;
    });
  }
}
