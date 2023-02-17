import IProductData from './IProductData';

export default interface ICategoryData {
  id: number
  code: string
  name: string
  products: IProductData[]
}
