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
import ProduitForm from "./ProduitForm";

type FormAjoutProduitFields = {
  quantite: Number
};

type ProduitCardProps = {
  produit: IProduitData
}

export default function ProduitCard({ produit }: ProduitCardProps): JSX.Element {

  return (
    <>
      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          component="img"
          image={baseURL + produit.url_image}
          title="Image du produit"
          height="350"
        />
        <CardContent sx={{ textAlign: "center" }} >
          <Typography variant="h5" gutterBottom>
            {produit.nom}
          </Typography>
          <Container sx={{ display: "flex", alignContent: "center", justifyContent: "center", m: 1 }}>
            <Typography variant="h6" >Prix: {produit.prix} $</Typography>
          </Container>
          <ProduitForm produit={produit}></ProduitForm>
        </CardContent>
      </Card>
    </>
  );
}