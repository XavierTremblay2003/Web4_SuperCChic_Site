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
  Login as LoginIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  LocalGroceryStoreRounded as LocalGroceryStoreRoundedIcon,
} from '@mui/icons-material';
import { baseUserNameVariableName } from '../DataServices/Axios';
import Recherche from '../Epicerie/Recherche';
import { type } from '@testing-library/user-event/dist/type';
import DepartementFiltre from '../Epicerie/DepartementFiltre';
import MoreIcon from '@mui/icons-material/MoreVert';

type BannerProps = {
  recherche: string
  handleSetRecherche: React.Dispatch<React.SetStateAction<string>>
  rechercheDepartement: Number | undefined
  handleSetRechercheDepardement: React.Dispatch<React.SetStateAction<number | undefined>>
}


function Banner({ recherche, handleSetRecherche, rechercheDepartement, handleSetRechercheDepardement }: BannerProps): JSX.Element {
  //console.log('Load Banner Component');

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [userAnchorEl, setUserAnchorEl] = React.useState<HTMLElement | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleGoHomeClick = (): void => {
    navigate('/');
  }

  const handleGoCarsClick = (): void => {
    navigate('/panier');
  }

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(e.currentTarget);
    setMenuAnchorEl(null);
  }

  const handleCloseUserMenu = () => {
    setUserAnchorEl(null);
  }

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(e.currentTarget);
  }

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  }

  const handleLogoutClick = (): void => {
    setUserAnchorEl(null);
    navigate('/auth/logout');
  }

  const handleLoginClick = (): void => {
    setUserAnchorEl(null);
    navigate('/auth/login');
  }

  const renderMenuSmall = (
    <Menu
      anchorEl={menuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="menu-appbar"
      keepMounted
      onClose={handleCloseMenu}
      open={Boolean(menuAnchorEl)}
      sx={{ mt: '30px' }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {localStorage.getItem(baseUserNameVariableName) ? (
        <>
          <MenuItem>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography>
                {localStorage.getItem(baseUserNameVariableName)}
              </Typography>
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography>{"Se déconnecter"}</Typography>
            </ListItemText>
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleLoginClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography>{"Se Connectée"}</Typography>
          </ListItemText>
        </MenuItem>
      )}
      <Divider />
      <MenuItem onClick={handleGoCarsClick}>
        <ListItemIcon>
          <LocalGroceryStoreRoundedIcon sx={{ color: 'black' }} fontSize="small" />
        </ListItemIcon>
        <Typography>
          Panier
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Recherche recherche={recherche} handleSetRecherche={handleSetRecherche}></Recherche>
      </MenuItem>
    </Menu>
  )

  return (
    <AppBar sx={{ background: "#D8551Eff" }} position="static">
      <Container component="nav">
        <Toolbar>
          {location.pathname !== '/' && (
            <Tooltip title={"Retour au tableau de bord"}>
              <IconButton color="inherit" onClick={handleGoHomeClick} sx={{ mr: 1, p: 0 }}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          <Container sx={{ flexgro: 1, flexDirection: "row", display: "flex" }}>
            <Typography variant="h6">
              Super CChic
            </Typography>
            <DepartementFiltre rechercheDepartement={rechercheDepartement} handleSetRechercheDepardement={handleSetRechercheDepardement}></DepartementFiltre>
          </Container>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Recherche recherche={recherche} handleSetRecherche={handleSetRecherche}></Recherche>
            <Tooltip title="Accéder aux panier">
              <IconButton onClick={handleGoCarsClick}>
                <LocalGroceryStoreRoundedIcon sx={{ color: "white" }} fontSize="large" />
              </IconButton>
            </Tooltip>
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
                <>
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
                  <Divider />
                  <MenuItem onClick={handleLogoutClick} sx={{ py: '4px' }}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography sx={{ fontSize: '0.95rem' }}>{"Se déconnecter"}</Typography>
                    </ListItemText>
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleLoginClick} sx={{ py: '4px' }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography sx={{ fontSize: '0.95rem' }}>{"Se Connectée"}</Typography>
                  </ListItemText>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleOpenMenu}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      {renderMenuSmall}
    </AppBar>
  );
}

export default Banner;
