import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IDepartementData from '../DataInterfaces/IDepartementData';
import { useState, MouseEvent, useEffect, useRef } from 'react';
import DepartementDataService from '../DataServices/DepartementsDataService';

type DepartementFiltreProps = {
    rechercheDepartement : Number | undefined
    handleSetRechercheDepardement: React.Dispatch<React.SetStateAction<number | undefined>>
  }

export default function DepartementFiltre({rechercheDepartement, handleSetRechercheDepardement} : DepartementFiltreProps) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (idDepartement : number) => {
        handleSetRechercheDepardement(idDepartement);
        setAnchorEl(null);
    };

    const [departements, setDepartements] = useState<Array<IDepartementData>>(Array<IDepartementData>);
    const dataLoaded = useRef<boolean>(false);


    useEffect(() => {
        if(!dataLoaded.current) {
            dataLoaded.current = true;
            DepartementDataService.getAll()
                .then((response) => {
                    setDepartements(response.data);
                })
                .catch((err) => {
                    console.log("Erreur de connection a api");
                })
        }
    });

    return (
        <>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: "white" }}

            >
                Departement
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {departements.map((dep) => {
                    return <MenuItem key={dep.id} onClick={() => handleClose(dep.id)}>{dep.nom}</MenuItem>
                }) }
            </Menu>
        </>
    );
}