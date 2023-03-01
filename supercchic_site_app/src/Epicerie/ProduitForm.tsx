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

type ProduitFormProp = {
    produit: IProduitData
    readonly: boolean
    autoSubmit : boolean
}

type FormAjoutProduitFields = {
    quantite: Number
};

export default function ProduitForm({ produit, readonly, autoSubmit }: ProduitFormProp): JSX.Element {

    const [submitWarning, setSubmitWarning] = useState<string>('');
    const [submitError, setSubmitError] = useState<string>('');

    const [nombreProduit, setNombreProduit] = useState<number>();

    const [snackBarSucces, setSnackBarSucces] = useState<boolean>(false);
    const [snackBarEroor, setSnackBarEroor] = useState<boolean>(false);

    const formSchema = yup.object().shape({
        quantite: yup
            .number()
            .typeError("La quantite doit être un nombre")
            .min(1, "La quantité ne doit pas être négative")
            .required("La quantité est obligatoire")
            .integer("La quantit doit être un entier")
    });

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarSucces(false);
        setSnackBarEroor(false);
    };


    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
    } = useForm<FormAjoutProduitFields>({
        resolver: yupResolver(formSchema),
    });

    const handleFormSubmit = (data: FormAjoutProduitFields): void => {
        setSubmitWarning('');
        setSubmitError('');

        let quantite = nombreProduit != undefined ? nombreProduit : 0

        FactureDataService.AddProduitPanier(produit.id, quantite)
            .then((responce) => {
                setSnackBarSucces(true);
            })
            .catch((err) => {
                setSnackBarEroor(true);
            });

    }

    const handleQuantiteFieldChange = (e: any): void => {

        if (isNaN(Number(e.target.value)) || e.target.value === "") {
            setNombreProduit(undefined);
        } else {
            setNombreProduit(Number(e.target.value));
        }
    }


    const testAjoutProduit = (nombreAAjoute: number) => {

        let nombre = nombreProduit ?? 0

        if ((nombre + nombreAAjoute) > 0) {
            setNombreProduit(nombre + nombreAAjoute);
            setValue("quantite", nombre + nombreAAjoute)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} >
            <Container sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                <IconButton onClick={() => testAjoutProduit(-1)} aria-label="retirerUn"> <RemoveIcon /> </IconButton>
                <FormTextField onChangeCapture={handleQuantiteFieldChange} registerReturn={register("quantite")} sx={{ maxWidth: 75 }} InputProps={{ readOnly: readonly }} value={nombreProduit}></FormTextField>
                <IconButton onClick={() => testAjoutProduit(1)} sx={{ alignSelf: "center" }} aria-label="retirerUn"> <AddIcon /> </IconButton>
            </Container>
            <Typography sx={{ mb: 2, height: 12 }} color="Red">{errors.quantite?.message}</Typography>
            { !autoSubmit && <Button type="submit" sx={{ background: "#FFEE00ff", color: "black", ":hover": { bgcolor: "#FFEE00AA" } }} variant="contained" size="medium" startIcon={<AddShoppingCartIcon />}>Ajouté au panier</Button>}

            <Snackbar open={snackBarSucces} autoHideDuration={1200} onClose={handleClose}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Le produit a été ajouter avec succès
                </Alert>
            </Snackbar>

            <Snackbar open={snackBarEroor} autoHideDuration={1200} onClose={handleClose}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Un erreur est survenue lors de l'ajout du produit
                </Alert>
            </Snackbar>

        </Box>
    )
}