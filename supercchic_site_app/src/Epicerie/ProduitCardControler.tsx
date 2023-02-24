import { Co2Sharp } from "@mui/icons-material";
import { Grid, Pagination, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useRef, useState } from "react";
import IProduitData from "../DataInterfaces/IProduitData";
import ProduitDataService from "../DataServices/ProduitDataService";
import ProduitCard from "./ProduitCard";


type ProduitCardControlerProps = {
    recherche?: string | null
}



export default function ProduitCardControler({ recherche }: ProduitCardControlerProps): JSX.Element {
    const [produits, setProduits] = useState<Array<IProduitData>>(Array<IProduitData>);
    const [pageActuel, setPageActuel] = useState<number>(1);
    const [pageTotal, setPageTotal] = useState<number>(0);


    useEffect(() => {
        ProduitDataService.getAllByPage(pageActuel)
            .then((response) => {
                setProduits(response.data.results);
                setPageTotal(Math.ceil(response.data.count / 6));
            })
            .catch((err) => {
                console.log("Erreur de connection a api");
            })

    }, [recherche, pageActuel]);

    const handlePageActuelChange = (e: any, value : number): void => {
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