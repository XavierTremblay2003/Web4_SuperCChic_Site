import {
    Add as AddIcon,
    AddShoppingCart as AddShoppingCartIcon,
    AlignHorizontalCenter,
    Remove as RemoveIcon
} from "@mui/icons-material";
import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import * as yup from 'yup';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextField from '../Controls/FormTextField';
import IProduitData from "../DataInterfaces/IProduitData";
import { baseURL } from "../DataServices/Axios";
import FactureDataService from "../DataServices/FactureDataService";
import IProduitFactureData from "../DataInterfaces/IProduitFactureData";

type ProduitFormProp = {
    produitFacture: IProduitFactureData
    handleModifieProduit : (idProduitFacture: number, nombreProduit: number) => void
}

export default function PanierForm({ produitFacture, handleModifieProduit }: ProduitFormProp): JSX.Element {

    return (
        <Box component="form">
            <Container sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                <IconButton onClick={() => handleModifieProduit(produitFacture.id, -1)} aria-label="retirerUn"> <RemoveIcon /> </IconButton>
                <TextField inputProps={{ readonly : true, style: { textAlign: 'center' } }}  sx={{ maxWidth: 75 }} value={produitFacture.nombre_produit}></TextField>
                <IconButton onClick={() => handleModifieProduit(produitFacture.id, 1)} sx={{ alignSelf: "center" }} aria-label="retirerUn"> <AddIcon /> </IconButton>
            </Container>
        </Box>
    )
}