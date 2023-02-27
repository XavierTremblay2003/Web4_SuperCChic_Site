import { AxiosResponse } from 'axios';
import IProduitData from '../DataInterfaces/IProduitData';
import axiosInstance from './Axios';

const rootPath = '/produits';

const getAllByPage = (page: number): Promise<AxiosResponse<any>> =>
  axiosInstance.get<unknown, AxiosResponse<any>>(`${rootPath}/?page=${page}`);

const getByFiltreAndPage = (page: number, recherche : string): Promise<AxiosResponse<any>> =>
  axiosInstance.get<unknown, AxiosResponse<any>>(`${rootPath}/filter_list?page=${page}&recherche=${recherche}`);

const getByFiltreAndPageAndDepartement = (page: number, recherche : string, departement : Number | undefined): Promise<AxiosResponse<any>> => {

  let command = `${rootPath}/filter_departement_list?page=${page}&recherche=${recherche}`

  if(departement !== undefined ) {
    command += `&departement=${departement}`
  }

  return axiosInstance.get<unknown, AxiosResponse<any>>(command);
}

const get = (id: number): Promise<AxiosResponse<IProduitData>> =>
  axiosInstance.get<unknown, AxiosResponse<IProduitData>>(`${rootPath}/${id}`);

const ProduitDataService = {
  getAllByPage,
  get,
  getByFiltreAndPage,
  getByFiltreAndPageAndDepartement,
}

export default ProduitDataService;
