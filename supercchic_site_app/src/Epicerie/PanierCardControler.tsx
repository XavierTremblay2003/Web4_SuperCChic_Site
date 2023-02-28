import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import PanierCard from "./PanieCard";




export default function PnierCardControler() : JSX.Element {


    return (
        <Container sx={{display : "flex", flexDirection : "column" , alignItems : "center" }}>
        <Typography variant="h3">Votre panier</Typography>

        <PanierCard/>
        </Container>
    )
}