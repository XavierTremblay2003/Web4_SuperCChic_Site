import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white,0.96),
    },
    color : theme.palette.common.black,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

type RechercheProps = {
    recherche : string
    handleSetRecherche : React.Dispatch<React.SetStateAction<string>>
}

export default function Recherche({recherche, handleSetRecherche} : RechercheProps): JSX.Element {

    const [rechercheText, setRechercheText] = useState<string>("");

    const HandleKeyPress = (e:any) => {
        if (e.keyCode === 13) {
            handleSetRecherche(e.target.value);
        }
    }

    const handleRechercheChange = (e:any) => {
        setRechercheText(e.target.value);
    }

    return (
        <Search sx={{height : 40 , mt : {xs : 0, md : 1  }, m : {xs : 0}}}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Recherche..."
                inputProps={{ 'aria-label': 'search'}}
                onKeyUp={(e) => HandleKeyPress(e)}
                onChange={handleRechercheChange}
                value={rechercheText}
                
            />
        </Search>
    )
}