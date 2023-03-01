import { Box, Card, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from 'mui-image';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import FormTextField from "../Controls/FormTextField";
import IProduitData from "../DataInterfaces/IProduitData";
import { baseURL } from "../DataServices/Axios";
import ProduitForm from "./ProduitForm";

type PanierCardProps = {
    produit : IProduitData
}

export default function PanierCard({produit} : PanierCardProps): JSX.Element {




    return (
        <Grid container spacing={2}>
            <Grid item xl={2}>
                <Image src={baseURL + produit.url_image}></Image>
            </Grid>
            <Grid item xl={4}>
                <Container>
                    <Typography sx={{ fontWeight: "bold" }}>Nom du produit</Typography>
                    <Typography>Description du produit</Typography>
                </Container>
            </Grid>
            <Grid item xl={3}>
                <ProduitForm produit={produit} readonly autoSubmit></ProduitForm>
            </Grid>
            <Grid item xl={2}>

            </Grid>
            <Grid item xl={1}>

            </Grid>
        </Grid>
    )
}