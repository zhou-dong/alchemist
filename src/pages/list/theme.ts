import { green, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        text: {
            primary: grey[900]
        },
        primary: {
            main: green[600],
        },
        // background: {
        // paper: green[600]
        // }
    },
});

export default theme;
