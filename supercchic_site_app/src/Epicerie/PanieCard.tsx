import { Card, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from 'mui-image';



export default function PanierCard(): JSX.Element {

    return (
        <Grid container spacing={2}>
            <Grid item xl={2}>
                <Image src="image-not-available.png"></Image>
            </Grid>
            <Grid item xl={6}>
                <Container>
                    <Typography>Nom du produit</Typography>
                </Container>
            </Grid>
            <Grid item xl={1}>

            </Grid>
            <Grid item xl={2}>

            </Grid>
            <Grid item xl={1}>

            </Grid>
        </Grid>
    )
}