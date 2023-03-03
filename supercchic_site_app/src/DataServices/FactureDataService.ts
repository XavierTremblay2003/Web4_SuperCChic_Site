import { AxiosResponse } from 'axios';
import IfactureData from '../DataInterfaces/IFactureData';
import axiosInstance from './Axios';

const rootPath = '/factures';

const AddProduitPanier = (idProduitAjoute : number, quantite : number ): Promise<AxiosResponse<string>> =>
  axiosInstance.post<unknown, AxiosResponse<string>>(`${rootPath}/ajout_produit_facture/`, {produit_a_ajouter : idProduitAjoute, quantite : quantite});

const EditProduitPanier = (idProduitFacture : number, quantiteFinal : number) : Promise<AxiosResponse<string>> =>
  axiosInstance.put<unknown, AxiosResponse<string>>(`${rootPath}/modifie_produit_facture/`, {produit_facture_a_modifie : idProduitFacture, quantite_final : quantiteFinal})

const DeleteProduitPanier = (idProduitFacture : number) : Promise<AxiosResponse<string>> =>
  axiosInstance.delete<unknown,AxiosResponse<string>>(`${rootPath}/suprimer_produit_facture/?produit_facture_a_suprimer=${idProduitFacture}`)

const GetFactureEnCours = () : Promise<AxiosResponse<IfactureData>> =>
  axiosInstance.get<unknown,AxiosResponse<IfactureData>>(`${rootPath}/get_facture_actuel/`); 

const FinishFacture = () : Promise<AxiosResponse<string>> =>
  axiosInstance.post<unknown, AxiosResponse<string>>(`${rootPath}/payer_facture_actuel/`);

const FactureDataService = {
    AddProduitPanier,
    EditProduitPanier,
    DeleteProduitPanier,
    GetFactureEnCours,
    FinishFacture,
}

export default FactureDataService;
