import IProduitData from "./IProduitData"


export default interface ICategoryData {
  id: number
  code: string
  name: string
  products: IProduitData[]
}
