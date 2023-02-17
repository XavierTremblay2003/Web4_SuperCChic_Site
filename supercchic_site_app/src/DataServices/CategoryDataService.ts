import { AxiosResponse } from 'axios';
import axiosInstance from './Axios';
import ICategoryData from '../DataInterfaces/ICategoryData';

const rootPath = '/categories';

const getAll = (): Promise<AxiosResponse<ICategoryData[]>> =>
  axiosInstance.get<unknown, AxiosResponse<ICategoryData[]>>(rootPath);

const get = (id: number): Promise<AxiosResponse<ICategoryData>> =>
  axiosInstance.get<unknown, AxiosResponse<ICategoryData>>(`${rootPath}/${id}`);

const create = (data: ICategoryData): Promise<AxiosResponse<ICategoryData>> =>
  axiosInstance.post<ICategoryData, AxiosResponse<ICategoryData>>(`${rootPath}/`, data);

const updateOrCreate = (
  id: number,
  data: ICategoryData,
): Promise<AxiosResponse<ICategoryData>> => {
  if (id > 0) {
    return axiosInstance.put<ICategoryData, AxiosResponse<ICategoryData>>(
      `${rootPath}/${id}/`,
      data,
    );
  }
  return create(data);
}

const remove = (id: number): Promise<AxiosResponse<unknown>> =>
  axiosInstance.delete<unknown, AxiosResponse<unknown>>(`${rootPath}/${id}/`);

const CategoryDataService = {
  getAll,
  get,
  create,
  updateOrCreate,
  remove,
}

export default CategoryDataService;
