import
 {
     Close as CloseIcon
 } from "@mui/icons-material";
import { Box, Card, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from 'mui-image';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import FormTextField from "../Controls/FormTextField";
import IProduitData from "../DataInterfaces/IProduitData";
import IProduitFactureData from "../DataInterfaces/IProduitFactureData";
import { baseURL } from "../DataServices/Axios";
import PanierForm from "./PanierForm";
import ProduitForm from "./ProduitForm";


type PanierCardProps = {
    produitFacture: IProduitFactureData
    handleModifieProduit: (idProduitFacture: number, nombreProduit: number) => void
    handleSuprimerProduit: (idproduitFacture: number) => void
}

export default function PanierCard({ produitFacture, handleModifieProduit,handleSuprimerProduit }: PanierCardProps): JSX.Element {

    const formatter = new Intl.NumberFormat("fr-ca", {
        style : "currency",
        currency : "CAD"
    })

    return (
        <Grid container sx={{ border: 1, m: 1 }}>
            <Grid item xs={12} sm={12} md={2}>
                <Image src={baseURL + produitFacture.produit.url_image}></Image>
            </Grid>
            <Grid xs={12} item sm={12} md={4}>
                <Container sx={{ height: '100%' }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>{produitFacture.produit.nom} </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>{produitFacture.produit.code_universel_produit} </Typography>
                    <Typography sx={{ mt: 2 }}>{produitFacture.produit.description != null ? produitFacture.produit.description : "Aucune description"}</Typography>
                </Container>
            </Grid>
            <Grid xs={12} item sm={12} md={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <PanierForm handleModifieProduit={handleModifieProduit} produitFacture={produitFacture} ></PanierForm>
            </Grid>
            <Grid xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} item sm={12} md={2}>
                <Typography variant="h5">{formatter.format(produitFacture.prix_total)}</Typography>
            </Grid>
            <Grid xs={12} sm={12} item md={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IconButton sx={{ background : "black", color : "white", ':hover' : {bgcolor : "white", color : "black"} }} onClick={() => handleSuprimerProduit(produitFacture.id)} aria-label="delete">
                    < CloseIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
}