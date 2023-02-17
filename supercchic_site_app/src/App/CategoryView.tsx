import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Box, Grid, Paper, Typography } from '@mui/material';
import ICategoryData from '../DataInterfaces/ICategoryData';
import IProductData from '../DataInterfaces/IProductData';
import CategoryDataService from '../DataServices/CategoryDataService';
import ProductCard from './ProductCard';

function CategoryView(): JSX.Element {
  const { id = '0' } = useParams();
  const categoryId: number = parseInt(id, 10);

  //console.log('Load Category Component', categoryId);

  const dataLoaded = useRef<boolean>(false);
  const [category, setCategory] = useState<ICategoryData | null>(null);

  useEffect(() => {
    if (!dataLoaded.current) {
      dataLoaded.current = true;
      CategoryDataService.get(categoryId)
        .then((response) => {
          console.log('Category data loaded', response.data);
          setCategory(response.data);
        })
        .catch((err) => {
          console.log('ERROR: An error occurred while category data loading', err, err.response);
        });
    }
  }, [categoryId]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography sx={{ fontSize: 18 }} color="text.secondary">
        {category?.code}
      </Typography>
      <Typography variant="h4">{category?.name}</Typography>
      <Box paddingTop={5}>
        <Typography variant="h6" color="text.secondary">Liste des produits</Typography>
        <Grid container spacing={2} marginTop={1}>
          {category?.products.map((product: IProductData) => (
            <Grid
              key={`product-${product.id}`}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

export default CategoryView;
