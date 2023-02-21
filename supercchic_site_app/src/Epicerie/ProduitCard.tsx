import {
   Add as AddIcon,
   AddShoppingCart as AddShoppingCartIcon,
   Remove as RemoveIcon
} from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";



export default function ProduitCard(): JSX.Element {
  
    const [nombreProduit,setNombreProduit] = useState<number>(0);

    const testAjoutProduit = (nombreAAjoute : number) => {
      if ((nombreProduit + nombreAAjoute) > 0) {
        setNombreProduit(nombreProduit + nombreAAjoute)
      }
    }

    return (
      <Card sx={{ maxWidth: 400}} >
        <CardMedia
        component="img"
        image="/image-not-available.png"
        title="Image du produit"
        height="300"
        />
        <CardContent sx={{ textAlign : "center" }} >
            <Typography variant="h5" gutterBottom>
                Je suis un produit
            </Typography>
            <Typography gutterBottom>
                Je suis une description de produit
            </Typography>
            <Container sx={{ display : "flex", alignContent : "center", justifyContent : "center" }}>
              <IconButton onClick={() => testAjoutProduit(1)} sx={{ alignSelf : "center" }} aria-label="retirerUn"> <AddIcon/> </IconButton>
              <TextField value={ nombreProduit } sx={{ maxWidth : 75 }}></TextField>
              <IconButton onClick={() => testAjoutProduit(-1)} aria-label="retirerUn"> <RemoveIcon/> </IconButton>
            </Container>
        </CardContent>
        <CardActions  sx={{ display : "flex", justifyContent : "center"}}>
          <Button sx={{background : "#FFEE00ff", color : "black" , ":hover" : { bgcolor : "#FFEE00AA" } }} variant="contained" size="medium" startIcon={<AddShoppingCartIcon/>}>Ajouté au panier</Button>
        </CardActions>
      </Card>
    );
  }