import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import IfactureData from "../DataInterfaces/IFactureData";
import FactureDataService from "../DataServices/FactureDataService";
import PanierCard from "./PanieCard";




export default function PnierCardControler(): JSX.Element {

    const [facture, setFacture] = useState<IfactureData>();
    const dataLoaded = useRef<boolean>()

    useEffect(() => {
        if (!dataLoaded.current) {
            dataLoaded.current = true
            FactureDataService.GetFactureEnCours()
                .then((response) => {
                    setFacture(response.data)
                })
                .catch((err) => {
                    console.log("Erreur de connection a api");
                })
        }
    });


    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ mb: 2 }} variant="h3">Votre panier</Typography>

            {facture?.produit_factures?.map((produitFacture) => (
                <PanierCard key={produitFacture.id} produit={produitFacture.produit} />
            ))}
        </Container>
    )
}