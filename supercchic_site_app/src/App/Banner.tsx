import React, { useState } from 'react';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  ArrowBack as ArrowBackIcon,
  InfoOutlined as InfoOutlinedIcon,
  Logout as LogoutIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
} from '@mui/icons-material';
import { baseUserNameVariableName } from '../DataServices/Axios';
import Recherche from '../Epicerie/Recherche';
import { type } from '@testing-library/user-event/dist/type';

type BannerProps = {
  recherche : string
  handleSetRecherche : React.Dispatch<React.SetStateAction<string>>
}


function Banner({recherche, handleSetRecherche} : BannerProps): JSX.Element {
  //console.log('Load Banner Component');

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [userAnchorEl, setUserAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleGoHomeClick = (): void => {
    navigate('/');
  }

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(e.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setUserAnchorEl(null);
  }

  const handleOpenAbout = (): void => {
    setUserAnchorEl(null);
    setAboutOpen(true);
  }

  const handleCloseAbout = (): void => {
    setAboutOpen(false);
  }

  const handleLogoutClick = (): void => {
    setUserAnchorEl(null);
    navigate('/auth/logout');
  }

  return (
    <AppBar sx={{background: "#D8551Eff"}} position="static">
      <Container component="nav">
        <Toolbar>
          {location.pathname !== '/' && (
            <Tooltip title={"Retour au tableau de bord"}>
              <IconButton color="inherit" onClick={handleGoHomeClick} sx={{ mr: 1, p: 0 }}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Super CChic
          </Typography>
          <Recherche recherche={recherche} handleSetRecherche={handleSetRecherche}></Recherche>
          <Box>
            <Tooltip title={"Ouvrir le menu utilisateur"}>
              <IconButton
                aria-controls="user-menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenUserMenu}
                sx={{ ml: 2, px: 0 }}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={userAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id="user-menu-appbar"
              keepMounted
              onClose={handleCloseUserMenu}
              open={Boolean(userAnchorEl)}
              sx={{ mt: '30px' }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {localStorage.getItem(baseUserNameVariableName) ? (
                <MenuItem sx={{ py: '4px' }}>
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography sx={{ fontSize: '0.95rem' }}>
                      {localStorage.getItem(baseUserNameVariableName)}
                    </Typography>
                  </ListItemText>
                </MenuItem>
              ) : (
                <span />
              )}
              <MenuItem onClick={handleOpenAbout} sx={{ py: '4px' }}>
                <ListItemIcon>
                  <InfoOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ fontSize: '0.95rem' }}>À propos</Typography>
                </ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogoutClick} sx={{ py: '4px' }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ fontSize: '0.95rem' }}>{"Se déconnecter"}</Typography>
                </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        aria-describedby="about-dialog-description"
        aria-labelledby="about-dialog-title"
        onClose={handleCloseAbout}
        open={aboutOpen}
      >
        <DialogTitle id="about-dialog-title">À propos</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="about-dialog-description" variant="body2" textAlign="justify">
            Rogatus ad ultimum admissusque in consistorium ambage nulla praegressa inconsiderate
            et leviter proficiscere inquit ut praeceptum est, Caesar sciens quod si cessaveris,
            et tuas et palatii tui auferri iubebo prope diem annonas. hocque solo contumaciter
            dicto subiratus abscessit nec in conspectum eius postea venit saepius arcessitus.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 3 }}>
          <Button
            autoFocus
            color="primary"
            onClick={handleCloseAbout}
            size="small"
            variant="outlined"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Banner;
