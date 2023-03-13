import { AxiosResponse } from 'axios';
import { IRatesResponce } from '../DataInterfaces/IRatesData';
import axiosInstance from './Axios';

const rootPath = '/secureship_get_rates';

const GetRates = (codePostal : string, ville : string, codepays : string): Promise<AxiosResponse<IRatesResponce>> => {
  return  axiosInstance.post<unknown, AxiosResponse<IRatesResponce>>(`${rootPath}`,{codePostal : codePostal, ville : ville, codePays : codepays});
}


const SecureshipRatesDataService = {
  GetRates,
}

export default SecureshipRatesDataService
