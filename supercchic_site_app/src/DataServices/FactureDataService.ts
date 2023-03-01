import { AxiosResponse } from 'axios';
import IfactureData from '../DataInterfaces/IFactureData';
import axiosInstance from './Axios';

const rootPath = '/factures';

const AddProduitPanier = (idProduitAjoute : number, quantite : number ): Promise<AxiosResponse<string>> =>
  axiosInstance.post<unknown, AxiosResponse<string>>(`${rootPath}/ajout_produit_facture/`, {produit_a_ajouter : idProduitAjoute, quantite : quantite});

const GetFactureEnCours = () : Promise<AxiosResponse<IfactureData>> =>
  axiosInstance.get<unknown,AxiosResponse<IfactureData>>(`${rootPath}/get_facture_actuel/`); 

const FactureDataService = {
    AddProduitPanier,
    GetFactureEnCours,
}

export default FactureDataService;
