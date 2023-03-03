import { Autocomplete, Box, Button, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useState } from "react";
import IApiAdresseData from "../DataInterfaces/IApiAdresseData";
import IProduitFactureData from "../DataInterfaces/IProduitFactureData";
import AdressCompletDataService from "../DataServices/AdressCompletDataService";

type FactureProps = {
    handleClose: () => void
    produitFacture: IProduitFactureData[] | undefined
    total: string
}


export default function Facture({ handleClose, produitFacture, total }: FactureProps): JSX.Element {


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
        <>
            <DialogTitle>
                <Typography variant="h4">Facture</Typography>
            </DialogTitle>
            <Grid spacing={1} container>
                <Grid sx={{ m: 2, textAlign: "center" }} xs={6} item>
                    <Box border={1} sx={{ p: 2 }}>
                        <Typography sx={{ mb: 1 }} variant="h5">Information de payment</Typography>
                        <Container sx={{ width: "100%" }} component="form">
                            <TextField fullWidth sx={{ mb: 1 }} label="Numérot de la carte"></TextField>
                            <TextField fullWidth sx={{ mb: 1 }} label="Nom sur la carte"></TextField>
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <TextField sx={{ alignSelf: "flex-start" }} label="Date d'expiration"></TextField>
                                <TextField sx={{ alignSelf: "flex-end" }} label="Code de sécurite"></TextField>
                            </Box>
                        </Container>
                    </Box>
                    <Box border={1} sx={{ p: 2, mt: 1 }}>
                        <Typography sx={{ mb: 1 }} variant="h5">Information de Livraison</Typography>
                        <Container>
                            <TextField label="Adress" fullWidth />
                        </Container>
                    </Box>
                </Grid>
                <Grid xs={5} sx={{ m: 2, textAlign: "center" }} item >
                    <Box border={1} sx={{ p: 2, display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent : "space-between" }}>
                        <Container sx={{ alignSelf : "flex-start" }}>
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
                <Button autoFocus sx={{ background: "#FFEE00ff", color: "black", ":hover": { bgcolor: "#FFEE00AA" }, width: 250 }} onClick={handleClose}>
                    Payer
                </Button>
            </DialogActions>
        </>
    )
}