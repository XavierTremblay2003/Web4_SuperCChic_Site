import { Autocomplete, Box, Button, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useState } from "react";
import IApiAdresseData from "../DataInterfaces/IApiAdresseData";
import IProduitFactureData from "../DataInterfaces/IProduitFactureData";
import AdressCompletDataService from "../DataServices/AdressCompletDataService";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextField from "../Controls/FormTextField";
import FactureDataService from "../DataServices/FactureDataService";
import IfactureData from "../DataInterfaces/IFactureData";
import useScript from "../hooks/useScript";


type FactureProps = {
    handleClose: () => void
    handleSetFacture : React.Dispatch<React.SetStateAction<IfactureData | undefined>>
    produitFacture: IProduitFactureData[] | undefined
    total: string
}

type FormPayerFacture = {
    numerotDeCarte: string,
    nomDeCarte : string,
    dateExpiration : string,
    codeSecurite : number
    adress : string
};

const formSchema = yup.object().shape({
    numerotDeCarte : yup
        .number()
        .typeError("Le numerot de carte ne contien pas de lettre")
        .required("le numérot de la carte est obligatoire")
        .integer("Le numerot de carte ne contien pas de lettre"),
    nomDeCarte : yup
        .string()
        .required("Le nom sur la carte est obligatoire"),
    dateExpiration : yup
        .string()
        .required("La date d'expiration est obligatoire"),
    codeSecurite : yup
    .number()
    .typeError("Le code de sécurite ne contien pas de lettre")
    .required("Le code de sécurité est obligatoire")
    .integer("Le code de sécurite ne contien pas de lettre"),
    adress : yup
    .string()
    .required("L'adress est obligatoire")
});

export default function Facture({ handleClose, produitFacture, total,handleSetFacture }: FactureProps): JSX.Element {

    useScript("http://ws1.postescanada-canadapost.ca/js/addresscomplete-2.30.min.js?key=bt93-kf34-df32-ey55")

    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FormPayerFacture>({
        resolver: yupResolver(formSchema),
    });

    const handleFormSubmit = (data: FormPayerFacture): void => {
        FactureDataService.FinishFacture()
            .then((responce) =>{
                handleSetFacture(undefined);
                handleClose();
            })
            .catch((err) => {
                console.log("Erreur de connection a api");
            })
    }


    const [adressComplet, setAdressComplet] = useState<string>("");
    const [adressRecherche, setAdressRecherche] = useState<Array<IApiAdresseData>>()

    const formatter = new Intl.NumberFormat("fr-ca", {
        style: "currency",
        currency: "CAD"
    })

    useEffect(() => {
        if (adressComplet !== "") {
            AdressCompletDataService.get("245 ", "", "CAD")
                .then((responce) => {
                    setAdressRecherche(responce.data.Items);
                })
                .catch((err) => {
                    console.log(err);
                })
        }


    }, [adressComplet])

    const optionAdress = () => {
        return adressRecherche?.map((adress) => `${adress.Text} ${adress.Description}`) ?? [""]
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogTitle>
                <Typography variant="h4">Facture</Typography>
            </DialogTitle>
            <Grid spacing={1} container >
                <Grid sx={{ m: 2, textAlign: "center" }} xs={6} item>
                    <Box border={1} sx={{ p: 2 }}>
                        <Typography sx={{ mb: 1 }} variant="h5">Information de payment</Typography>
                        <Container sx={{ width: "100%" }} component="form">
                            <FormTextField errorText={errors.numerotDeCarte?.message} registerReturn={register("numerotDeCarte")} fullWidth sx={{ mb: 2 }} label="Numérot de la carte"></FormTextField>
                            <FormTextField errorText={errors.nomDeCarte?.message} registerReturn={register("nomDeCarte")} fullWidth sx={{ mb: 2 }} label="Nom sur la carte"></FormTextField>
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <FormTextField errorText={errors.dateExpiration?.message} registerReturn={register("dateExpiration")} sx={{ alignSelf: "flex-start" }} label="Date d'expiration"></FormTextField>
                                <FormTextField errorText={errors.codeSecurite?.message} registerReturn={register("codeSecurite")} sx={{ alignSelf: "flex-end" }} label="Code de sécurite"></FormTextField>
                            </Box>      
                        </Container>
                    </Box>
                    <Box border={1} sx={{ p: 2, mt: 1 }}>
                        <Typography sx={{ mb: 1 }} variant="h5">Information de Livraison</Typography>
                        <Container>
                            <FormTextField errorText={errors.adress?.message} registerReturn={register("adress")} label="Adress" fullWidth />
                        </Container>
                    </Box>
                </Grid>
                <Grid xs={5} sx={{ m: 2, textAlign: "center" }} item >
                    <Box border={1} sx={{ p: 2, display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "space-between" }}>
                        <Container sx={{ alignSelf: "flex-start" }}>
                            <Typography sx={{ mb: 1 }} variant="h5">Facture</Typography>

                            {produitFacture?.map((prodFacture) => {
                                return (
                                    <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Typography>{prodFacture.produit.nom} X {prodFacture.nombre_produit}</Typography>
                                        <Typography>{formatter.format(prodFacture.prix_total)}</Typography>
                                    </Container>
                                )
                            })}
                        </Container>

                        <Typography variant="h4">Total : {total}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" autoFocus sx={{ background: "#FFEE00ff", color: "black", ":hover": { bgcolor: "#FFEE00AA" }, width: 250 }}>
                    Payer
                </Button>
            </DialogActions>
        </Box>
    )
}