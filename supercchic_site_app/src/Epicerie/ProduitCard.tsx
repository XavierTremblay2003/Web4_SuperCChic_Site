import { Card, CardContent, CardMedia, Typography } from "@mui/material";



export default function ProduitCard(): JSX.Element {
  
    return (
      <Card>
        <CardMedia
        image="/public/image_not_available.png"
        title="Image du produit"
        />
        <CardContent>
            <Typography variant="h5"  gutterBottom>
                Je suis un produit
            </Typography>
            <Typography>
                Je suis une description de produit
            </Typography>
        </CardContent>
      </Card>
    );
  }