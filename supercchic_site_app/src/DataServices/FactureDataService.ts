import { AxiosResponse } from 'axios';
import axiosInstance from './Axios';

const rootPath = '/factures';

const AddProduitPanier = (idProduitAjoute : number, quantite : number ): Promise<AxiosResponse<string>> =>
  axiosInstance.post<unknown, AxiosResponse<string>>(`${rootPath}/ajout_produit_facture/`, {produit_a_ajouter : idProduitAjoute, quantite : quantite});

const FactureDataService = {
    AddProduitPanier
}

export default FactureDataService;
