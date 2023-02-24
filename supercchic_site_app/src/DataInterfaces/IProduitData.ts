export default interface IProduitData {
  id: number
  nom: string
  code_universel_produit: string
  prix: number
  quantite_inventaire : number,
  est_taxable : number,
  est_actif : number,
  description : string,
  url_image : string
}
