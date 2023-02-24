import { AxiosResponse } from 'axios';
import IProduitData from '../DataInterfaces/IProduitData';
import axiosInstance from './Axios';

const rootPath = '/produits';

const getAll = (): Promise<AxiosResponse<IProduitData[]>> =>
  axiosInstance.get<unknown, AxiosResponse<IProduitData[]>>(rootPath);

const get = (id: number): Promise<AxiosResponse<IProduitData>> =>
  axiosInstance.get<unknown, AxiosResponse<IProduitData>>(`${rootPath}/${id}`);

const ProduitDataService = {
  getAll,
  get,
}

export default ProduitDataService;
