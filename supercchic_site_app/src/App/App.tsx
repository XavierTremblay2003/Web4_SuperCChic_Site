import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import Banner from './Banner';
import { useState } from 'react';

function App(): JSX.Element {
  //console.log('Load App Component');
  const [recherche, SetRecherche] = useState<string>("Allo");

  return (
    <SnackbarProvider maxSnack={2}>
      <CssBaseline />
      <Banner recherche={recherche} handleSetRecherche={SetRecherche} />
      <Container component="main">
        <Box padding={3}>
          <Outlet context={recherche}/>
        </Box>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
