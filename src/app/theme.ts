import { green, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: grey[50],
            contrastText: green[700]
        },
        secondary: {
            main: green[700],
            contrastText: grey[50]
        },
        background: {
            paper: green[600]
        }
    },
});

export default theme;
