import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        text: {
            primary: "#000000"
        },
        primary: {
            main: green[800],
        },
        // secondary: {
        //     main: green[700],
        //     contrastText: grey[50]
        // },
        // background: {
        // paper: green[600]
        // }
    },
});

export default theme;
