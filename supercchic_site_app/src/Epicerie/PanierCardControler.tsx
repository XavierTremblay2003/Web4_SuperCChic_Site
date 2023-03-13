import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { response } from "express";
import { useEffect, useRef, useState } from "react";
import IfactureData from "../DataInterfaces/IFactureData";
import IProduitFactureData from "../DataInterfaces/IProduitFactureData";
import FactureDataService from "../DataServices/FactureDataService"
import Facture from "./Facture";
import PanierCard from "./PanieCard";




export default function PanierCardControler(): JSX.Element {

    const [facture, setFacture] = useState<IfactureData>();

    const [open, setOpen] = useState(false);

    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        FactureDataService.GetFactureEnCours()
            .then((response) => {
                setFacture(response.data);
            })
            .catch((err) => {
                console.log("Erreur de connection a api");
            })
    }, []);

    const modifierUnProduit = (idProduitFacture: number, nombreProduit: number) => {

        let produitFacture = facture?.produit_factures.find((produitFac) => produitFac.id == idProduitFacture);

        if (produitFacture === undefined) {
            return;
        }

        if (produitFacture.nombre_produit + nombreProduit > 0) {

            FactureDataService.EditProduitPanier(produitFacture.id, produitFacture.nombre_produit + nombreProduit)
                .then((response => {

                    if (facture === undefined || produitFacture === undefined) {
                        return;
                    }

                    let tempFacture = JSON.parse(JSON.stringify(facture));

                    let index = facture.produit_factures.indexOf(produitFacture)

                    tempFacture.produit_factures[index].nombre_produit += nombreProduit;
                    tempFacture.produit_factures[index].prix_total = tempFacture.produit_factures[index].nombre_produit * produitFacture.produit.prix

                    setFacture(tempFacture);
                }))
                .catch((err) => {
                    console.log("Erreur de connection a api");
                })


        } else {
            suprimerProduit(produitFacture.id);
        }
    }

    const suprimerProduit = (idProduitFacture: number) => {

        let produitFacture = facture?.produit_factures.find((produitFac) => produitFac.id == idProduitFacture);

        if (produitFacture === undefined) {
            return;
        }

        FactureDataService.DeleteProduitPanier(produitFacture.id)
            .then((reponce) => {

                if (facture === undefined || produitFacture === undefined) {
                    return;
                }

                let tempFacture = JSON.parse(JSON.stringify(facture));

                let index = facture.produit_factures.indexOf(produitFacture);
                tempFacture.produit_factures.splice(index, 1);

                setFacture(tempFacture);
            })
            .catch((err) => {
                console.log("Erreur de connection a api");
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const calculetotalFacture = () => {

        let total = 0.00;
        facture?.produit_factures.forEach((produiFacture) => {
            total += Number(produiFacture.prix_total);
        });

        let formatter = new Intl.NumberFormat("fr-ca", {
            style: "currency",
            currency: "CAD"
        })

        return formatter.format(total);

    }




    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ mb: 2 }} variant="h3">Votre panier</Typography>

            {facture?.produit_factures.length != 0 ?
                facture?.produit_factures?.map((produitFacture) => (
                    <PanierCard handleSuprimerProduit={suprimerProduit} handleModifieProduit={modifierUnProduit} key={produitFacture.id} produitFacture={produitFacture} />
                )) : <Typography variant="h4">Le panier est vide</Typography>}

            {facture?.produit_factures.length != 0 &&
                <>
                    <Typography variant="h5" sx={{ mb: 1 }}>Total : {calculetotalFacture()}</Typography>
                    <Button variant="contained" onClick={handleClickOpen} sx={{ background: "#FFEE00ff", color: "black", ":hover": { bgcolor: "#FFEE00AA" }, width: 250 }}>Commander</Button>
                </>}

            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={open}
                onClose={handleClose}
            >
                <Facture handleSetFacture={setFacture} produitFacture={facture?.produit_factures} sousTotal={calculetotalFacture()} handleClose={handleClose}></Facture>
            </Dialog>

        </Container>
    )
}