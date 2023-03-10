import { AxiosResponse } from 'axios';
import axiosInstanceSecureship from './AxiosSecureship';

const rootPath = '/webship/api/rates';

const GetRates = (json: string): Promise<AxiosResponse<any>> => {

  return  axiosInstanceSecureship.post<unknown, AxiosResponse<any>>(`${rootPath}`,json);
}


const SecureshipRatesDataService = {
  GetRates,

}

export interface FromAddress {
  PostalCode: string;
  City: string;
  CountryCode: string;
  Residential: boolean;
}

export interface ToAddress {
  PostalCode: string;
  City: string;
  CountryCode: string;
  Residential: boolean;
}

export interface Package {
  Weight: any;
  WeightUnits: string;
  Length?: number;
  Width?: number;
  Height?: number;
  DimensionUnits?: string;
  Insurance?: number;
  AdditionalHandling?: boolean;
}

export interface RootObject {
  ApiKey: string;
  CurrencyCode: string;
  AccountNumber: string;
  Username: string;
  ReturnSampleData: string;
  BillingPostalCode: string;
  FromAddress: FromAddress;
  ToAddress: ToAddress;
  PackageType: string;
  Packages: Package[];
}





export default SecureshipRatesDataService;
