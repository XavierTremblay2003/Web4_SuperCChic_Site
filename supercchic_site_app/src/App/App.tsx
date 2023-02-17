import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import Banner from './Banner';

function App(): JSX.Element {
  //console.log('Load App Component');

  return (
    <SnackbarProvider maxSnack={2}>
      <CssBaseline />
      <Banner />
      <Container component="main">
        <Box padding={3}>
          <Outlet />
        </Box>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
