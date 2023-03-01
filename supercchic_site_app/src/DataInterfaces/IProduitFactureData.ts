import IProduitData from "./IProduitData";

export default interface IProduitFactureData {
    id : number,
    nombre_produit : number,
    prix_total : number,
    produit : IProduitData,
}