import { AxiosResponse } from 'axios';
import axiosInstance from './Axios';
import ICategoryData from '../DataInterfaces/IDepartementData';
import DepartementFiltre from '../Epicerie/DepartementFiltre';

const rootPath = '/departements';

const getAll = (): Promise<AxiosResponse<ICategoryData[]>> =>
  axiosInstance.get<unknown, AxiosResponse<ICategoryData[]>>(`${rootPath}/GetAllNoPage/`);

const DepartementDataService = {
  getAll,
}

export default DepartementDataService;
