import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import ICategoryData from '../DataInterfaces/ICategoryData';

type CategoryCardProps = {
  category: ICategoryData
}

function CategoryCard({ category }: CategoryCardProps): JSX.Element {
  //console.log('Load Category Card Component');

  const navigate: NavigateFunction = useNavigate();

  const handleViewClick = () => {
    navigate(`/category/${category.id}`);
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {category.code}
        </Typography>
        <Typography variant="h5" component="div">
          {category.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleViewClick} size="small">Consulter</Button>
      </CardActions>
    </Card>
  );
}

export default CategoryCard;