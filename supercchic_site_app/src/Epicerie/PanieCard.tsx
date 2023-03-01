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
import ProduitForm from "./ProduitForm";

type PanierCardProps = {
    produitFacture: IProduitFactureData
}

export default function PanierCard({ produitFacture }: PanierCardProps): JSX.Element {




    return (
        <Grid container sx={{ border: 1, m: 1 }}>
            <Grid item xs={12} sm={12} md={2}>
                <Image src={baseURL + produitFacture.produit.url_image}></Image>
            </Grid>
            <Grid xs={12} item sm={12} md={4}>
                <Container sx={{ height: '100%'}}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>{produitFacture.produit.nom} </Typography>
                    <Typography sx={{ fontWeight: "bold" }}>{produitFacture.produit.code_universel_produit} </Typography>
                    <Typography sx={{mt : 2 }}>{produitFacture.produit.description != null ? produitFacture.produit.description : "Aucune description"}</Typography>
                </Container>
            </Grid>
            <Grid xs={12} item sm={12} md={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ProduitForm produit={produitFacture.produit} readonly autoSubmit></ProduitForm>
            </Grid>
            <Grid xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} item sm={12} md={2}>
                <Typography variant="h5" sx={{ mb: 3 }}>{produitFacture.prix_total} $</Typography>
            </Grid>
            <Grid xs={12} sm={12} item md={1}>

            </Grid>
        </Grid>
    )
}