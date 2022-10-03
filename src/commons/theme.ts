import { green } from '@mui/material/colors';
import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
        }
    },
    typography: {
        fontFamily: [
            "Circular",
            "-apple-system",
            "BlinkMacSystemFont",
            "Roboto",
            "Helvetica Neue",
            "sans-serif",
            "monospace"
        ].join(",")
    },
});

export default theme;
