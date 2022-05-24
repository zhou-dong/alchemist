
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import { Link as RouterLink } from "react-router-dom";
import MaterialLink from "@mui/material/Link";
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(grey[500], 0.15),
    '&:hover': {
        backgroundColor: alpha(grey[500], 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
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
    color: 'primary',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    background: "none",
                    boxShadow: "none"
                }}
            >
                <Toolbar>
                    <IconButton component={RouterLink} to="/">
                        <HomeIcon color="primary" />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" color="primary" sx={{
                        display: { xs: 'none', sm: 'block' },
                        fontWeight: "normal"
                    }}
                    >
                        <MaterialLink component={RouterLink} to="/" style={{ textDecoration: 'none' }}>
                            alchemist
                        </MaterialLink>
                    </Typography>

                    <div style={{ margin: "auto" }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon color="primary" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
