import { AxiosResponse } from "axios";
import axiosInstanceCanadaPost from "./AxiosPostCanada";


const rootPath = '/AddressComplete/Interactive/Find/v2.10/json3.ws?Key=MM84-RY74-AB52-TX72';

const get = (SearchTerm : string,lastId : string, contry : string): Promise<AxiosResponse<any>> =>
  axiosInstanceCanadaPost.get<unknown, AxiosResponse<any>>(`${rootPath}&SearchTerm=${encodeURIComponent(SearchTerm)}&LastId=${lastId}&Contry=${contry}&LanguagePreference=FR&MaxResults=7`);

const AdressCompletDataService = {
  get,
}

export default AdressCompletDataService;