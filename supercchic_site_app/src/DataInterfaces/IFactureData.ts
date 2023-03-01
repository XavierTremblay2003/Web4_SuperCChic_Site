import IProduitFactureData from "./IProduitFactureData";


export default interface IFactureData {
    id : Number,
    methode_payment : string,
    date : string,
    etat : string,
    produit_factures : IProduitFactureData[]
}