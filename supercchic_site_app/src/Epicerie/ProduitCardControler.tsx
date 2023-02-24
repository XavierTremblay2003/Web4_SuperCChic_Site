import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useRef, useState } from "react";
import IProduitData from "../DataInterfaces/IProduitData";
import ProduitDataService from "../DataServices/ProduitDataService";
import ProduitCard from "./ProduitCard";


type ProduitCardControlerProps = {
    recherche?: string | null
}



export default function ProduitCardControler({ recherche }: ProduitCardControlerProps): JSX.Element {

    const dataLoaded = useRef<boolean>(false);
    const [produits, setProduits] = useState<Array<IProduitData>>(Array<IProduitData>);

    const aficherProduit = () => {
        return produits.map(prod => {
            return (
                <Grid item xs={8} sm={6} lg={4}>
                    <ProduitCard produit={prod} ></ProduitCard>
                </Grid>
            )
        });
    };


    useEffect(() => {
        if (!dataLoaded.current) {
            dataLoaded.current = true;
            ProduitDataService.getAll()
                .then((response) => {
                    setProduits(response.data);
                })
                .catch((err) => {
                    console.log("Erreur de connection a api");
                })
        }

    }, [recherche]);

    return (
        <Grid sx={{ display: "flex", alignItems: "center ", justifyContent: "center" }} container spacing={2}>
            {produits.map((produit) => (
                <Grid item xs={8} sm={6} lg={4}>
                    <ProduitCard produit={produit} ></ProduitCard>
                </Grid>
            ))}

        </Grid>
    );
}