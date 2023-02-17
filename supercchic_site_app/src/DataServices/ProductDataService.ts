import { AxiosResponse } from 'axios';
import axiosInstance from './Axios';
import IDataProduct from '../DataInterfaces/IProductData';

const rootPath = '/products';

const getAll = (): Promise<AxiosResponse<IDataProduct[]>> =>
  axiosInstance.get<unknown, AxiosResponse<IDataProduct[]>>(rootPath);

const get = (id: number): Promise<AxiosResponse<IDataProduct>> =>
  axiosInstance.get<unknown, AxiosResponse<IDataProduct>>(`${rootPath}/${id}`);

const create = (data: IDataProduct): Promise<AxiosResponse<IDataProduct>> =>
  axiosInstance.post<IDataProduct, AxiosResponse<IDataProduct>>(`${rootPath}/`, data);

const updateOrCreate = (
  id: number,
  data: IDataProduct,
): Promise<AxiosResponse<IDataProduct>> => {
  if (id > 0) {
    return axiosInstance.put<IDataProduct, AxiosResponse<IDataProduct>>(
      `${rootPath}/${id}/`,
      data,
    );
  }
  return create(data);
}

const remove = (id: number): Promise<AxiosResponse<unknown>> =>
  axiosInstance.delete<unknown, AxiosResponse<unknown>>(`${rootPath}/${id}/`);

const ProductDataService = {
  getAll,
  get,
  create,
  updateOrCreate,
  remove,
}

export default ProductDataService;
