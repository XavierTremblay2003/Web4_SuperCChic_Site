import { Box, Button, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useState } from "react";
import IApiAdresseData from "../DataInterfaces/IApiAdresseData";
import IProduitFactureData from "../DataInterfaces/IProduitFactureData";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextField from "../Controls/FormTextField";
import FactureDataService from "../DataServices/FactureDataService";
import IfactureData from "../DataInterfaces/IFactureData";
import useScript from "../hooks/useScript";
import { AddressAutocompleteValue } from 'mui-address-autocomplete';
import AddressAutocomplete from 'mui-address-autocomplete';
import SecureshipRatesDataService, { RootObject, FromAddress, ToAddress, Package } from "../DataServices/SecureshipRatesDataService"



type FactureProps = {
    handleClose: () => void
    handleSetFacture: React.Dispatch<React.SetStateAction<IfactureData | undefined>>
    produitFacture: IProduitFactureData[] | undefined
    total: string
}

type FormPayerFacture = {
    numerotDeCarte: string,
    nomDeCarte: string,
    dateExpiration: string,
    codeSecurite: number
    adress: string
};

const formSchema = yup.object().shape({
    numerotDeCarte: yup
        .number()
        .typeError("Le numerot de carte ne contien pas de lettre")
        .required("le numérot de la carte est obligatoire")
        .integer("Le numerot de carte ne contien pas de lettre"),
    nomDeCarte: yup
        .string()
        .required("Le nom sur la carte est obligatoire"),
    dateExpiration: yup
        .string()
        .required("La date d'expiration est obligatoire"),
    codeSecurite: yup
        .number()
        .typeError("Le code de sécurite ne contien pas de lettre")
        .required("Le code de sécurité est obligatoire")
        .integer("Le code de sécurite ne contien pas de lettre"),
    adress: yup
        .string()
        .required("L'adress est obligatoire")
});

export default function Facture({ handleClose, produitFacture, total, handleSetFacture }: FactureProps): JSX.Element {

    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<FormPayerFacture>({
        resolver: yupResolver(formSchema),
    });

    const handleFormSubmit = (data: FormPayerFacture): void => {
        FactureDataService.FinishFacture()
            .then((responce) => {
                handleSetFacture(undefined);
                handleClose();
            })
            .catch((err) => {
                console.log("Erreur de connection a api");
            })
    }

    const onchangeAddr = (e: any, value: any | null) => {

        if (value === null) {
            return;
        }

        console.log(value);

        let fromAddr: FromAddress = {
            PostalCode: "G7H1Z6",
            City: "Chicoutimi",
            CountryCode: "CA",
            Residential: false
        };

        let postalCode: string = "";
        let city: string = "";
        let contryCode: string = "";

        value.address_components.forEach((addrInfo: any) => {

            if (addrInfo.types.indexOf("locality") > -1) {
                city = addrInfo.short_name
            }

            if (addrInfo.types.indexOf("country") > -1) {
                contryCode = addrInfo.short_name
            }

            if (addrInfo.types.indexOf("postal_code") > -1) {
                postalCode = addrInfo.short_name
            }
        })

        let toAddr: ToAddress = {
            PostalCode: postalCode,
            City: city,
            CountryCode: contryCode,
            Residential: true
        };

        let packageBase: Package = {
            Weight: "15",
            WeightUnits: "LBS"
        };

        let rootObject: RootObject = {
            ApiKey: "ac54ce1a-f207-4948-9938-05abe0893927",
            CurrencyCode: "CAD",
            AccountNumber: "139126",
            Username: "2031982@etu.cchic.ca",
            ReturnSampleData: "false",
            BillingPostalCode: fromAddr.PostalCode,
            FromAddress: fromAddr,
            ToAddress: toAddr,
            PackageType: "MyPackage",
            Packages: [packageBase]
        };

        let jsonCote: string = JSON.stringify(rootObject);

        SecureshipRatesDataService.GetRates(jsonCote)
            .then((responce) => {
                console.log(responce);
            })
            .catch((err) => {
                console.log("Cote api inacccésible");
                console.log(err);
            })
    }


    const formatter = new Intl.NumberFormat("fr-ca", {
        style: "currency",
        currency: "CAD"
    })

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
                            <AddressAutocomplete value={null} fields={['geometry']} onChange={(e: any, value: AddressAutocompleteValue | null) => onchangeAddr(e, value)} label="Address" apiKey="AIzaSyDgO9ft1mnb1HYH0KTuL0BAjIvSFH-r9so" />
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