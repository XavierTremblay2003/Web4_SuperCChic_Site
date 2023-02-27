import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import Banner from './Banner';
import { useState } from 'react';

function App(): JSX.Element {
  //console.log('Load App Component');
  const [recherche, SetRecherche] = useState<string>("");
  const [rechercheDepartement, SetRechercheDepartement] = useState<number>();

  return (
    <SnackbarProvider maxSnack={2}>
      <CssBaseline />
      <Banner recherche={recherche} handleSetRecherche={SetRecherche} rechercheDepartement={rechercheDepartement} handleSetRechercheDepardement={SetRechercheDepartement}/>
      <Container component="main">
        <Box padding={3}>
          <Outlet context={[recherche, rechercheDepartement]}/>
        </Box>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
