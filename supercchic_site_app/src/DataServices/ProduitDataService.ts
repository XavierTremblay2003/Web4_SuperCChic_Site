import { AxiosResponse } from 'axios';
import IProduitData from '../DataInterfaces/IProduitData';
import axiosInstance from './Axios';

const rootPath = '/produits';

const getAllByPage = (page : number): Promise<AxiosResponse<any>> =>
  axiosInstance.get<unknown, AxiosResponse<any>>(`${rootPath}/?page=${page}`);

const get = (id: number): Promise<AxiosResponse<IProduitData>> =>
  axiosInstance.get<unknown, AxiosResponse<IProduitData>>(`${rootPath}/${id}`);

const ProduitDataService = {
  getAllByPage,
  get,
}

export default ProduitDataService;
