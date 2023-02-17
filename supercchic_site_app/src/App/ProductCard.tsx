import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import IProductData from '../DataInterfaces/IProductData';

type ProductCardProps = {
  product: IProductData
}

function ProductCard({ product }: ProductCardProps): JSX.Element {
  //console.log('Load Product Card Component');

  const { enqueueSnackbar } = useSnackbar();

  const handleActionClick = () => {
    enqueueSnackbar(`Action sur "${product.name}" effectuée avec succès`, { variant: 'success' });
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary">
          {product.code}
        </Typography>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleActionClick} size="small">Action</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;