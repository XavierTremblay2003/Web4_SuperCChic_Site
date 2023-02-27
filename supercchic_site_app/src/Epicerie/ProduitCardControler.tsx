import { Co2Sharp } from "@mui/icons-material";
import { Grid, Pagination, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import IProduitData from "../DataInterfaces/IProduitData";
import ProduitDataService from "../DataServices/ProduitDataService";
import ProduitCard from "./ProduitCard";





export default function ProduitCardControler(): JSX.Element {
    const [recherche, rechercheDepartement] = useOutletContext<[string, Number | undefined]>();

    const [produits, setProduits] = useState<Array<IProduitData>>(Array<IProduitData>);
    const [pageActuel, setPageActuel] = useState<number>(1);
    const [pageTotal, setPageTotal] = useState<number>(0);


    useEffect(() => {

        if (rechercheDepartement === undefined) {
            ProduitDataService.getByFiltreAndPage(pageActuel, recherche)
                .then((response) => {
                    setProduits(response.data.results);
                    setPageTotal(Math.ceil(response.data.count / 6));
                })
                .catch((err) => {
                    console.log("Erreur de connection a api");
                })
        } else {
            ProduitDataService.getByFiltreAndPageAndDepartement(pageActuel, recherche, rechercheDepartement)
                .then((response) => {
                    setProduits(response.data.results);
                    setPageTotal(Math.ceil(response.data.count / 6));
                })
                .catch((err) => {
                    console.log("Erreur de connection a api");
                })
        }

    }, [pageActuel, recherche, rechercheDepartement]);

    const handlePageActuelChange = (e: any, value: number): void => {
        setPageActuel(value)
    }


    return (
        <Container sx={{ display: "flex", alignItems: "center ", justifyContent: "center", flexDirection: "column" }}>
            <Grid sx={{ display: "flex", alignItems: "center ", justifyContent: "center", mb: 5 }} container spacing={2}>
                {produits.map((produit) => (
                    <Grid key={produit.id} item xs={8} sm={6} lg={4}>
                        <ProduitCard produit={produit} ></ProduitCard>
                    </Grid>
                ))}

            </Grid>
            <Pagination count={pageTotal} page={pageActuel} onChange={handlePageActuelChange} variant="outlined" shape="rounded" />
        </Container>
    );
}