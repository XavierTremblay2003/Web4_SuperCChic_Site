import {
  Add as AddIcon,
  AddShoppingCart as AddShoppingCartIcon,
  Remove as RemoveIcon
} from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, IconButton, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import * as yup from 'yup';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextField from '../Controls/FormTextField';
import IProduitData from "../DataInterfaces/IProduitData";

type FormLoginFields = {
  produitId: Number
  quantite: Number
};

type ProduitCardProps = {
  produit : IProduitData
}

export default function ProduitCard({produit} : ProduitCardProps): JSX.Element {
  
  const [submitWarning, setSubmitWarning] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');

  const [nombreProduit, setNombreProduit] = useState<number>();
  
  const formSchema = yup.object().shape({
    quantite: yup
    .number()
    .min(1,"La quantité ne doit pas être négative")
    .required("La quantité est obligatoire")
    .integer("La quantit doit être un entier"),
    produitId: yup
    .number()
    .required()
    .integer()
  });

  
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormLoginFields>({
    resolver: yupResolver(formSchema),
  });
  
  const handleFormSubmit = (data: FormLoginFields): void => {
    setSubmitWarning('');
    setSubmitError('');    
  }

  const handleQuantiteFieldChange = (e : any) : void => {

    if(isNaN(Number(e.target.value)) || e.target.value === "") {
      setNombreProduit(undefined);
    } else {
      setNombreProduit(Number(e.target.value));
    }
  }

  useEffect(() => {

  },[nombreProduit])



  const testAjoutProduit = (nombreAAjoute: number) => {

    let nombre = nombreProduit ?? 0

    if ((nombre + nombreAAjoute) > 0) {
      setNombreProduit(nombre + nombreAAjoute)
    }
  }

  return (
    <Card sx={{ maxWidth: 400 }} >
      <CardMedia
        component="img"
        image="/image-not-available.png"
        title="Image du produit"
        height="300"
      />
      <CardContent sx={{ textAlign: "center" }} >
        <Typography variant="h5" gutterBottom>
          {produit.nom}
        </Typography>
        <Typography gutterBottom>
          {produit.description}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit) } >
          <Container sx={{ display: "flex", alignContent: "center", justifyContent: "center"}}>
            <IconButton onClick={() => testAjoutProduit(-1)} aria-label="retirerUn"> <RemoveIcon /> </IconButton>
            <FormTextField onChangeCapture={handleQuantiteFieldChange} registerReturn={register("quantite")} type="tel" value={nombreProduit} sx={{ maxWidth: 75 }}></FormTextField>
            <IconButton onClick={() => testAjoutProduit(1)} sx={{ alignSelf: "center" }} aria-label="retirerUn"> <AddIcon /> </IconButton>
          </Container>
          <Typography sx={{mb: 2 }} color="Red">{errors.quantite?.message}</Typography>
          <Button type="submit" sx={{ background: "#FFEE00ff", color: "black", ":hover": { bgcolor: "#FFEE00AA" } }} variant="contained" size="medium" startIcon={<AddShoppingCartIcon />}>Ajouté au panier</Button>
        </Box>
      </CardContent>
    </Card>
  );
}