import { green } from '@mui/material/colors';
import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
        }
    },
    components: {
        MuiTable: {
            styleOverrides: {
                root: {
                    width: '80%',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    textAlign: 'center',
                    borderBottom: 'none',
                    '&:last-child': {
                        // paddingRight: 0,
                    },
                },
                body: {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: "lightgray",
                    color: "black",
                    lineHeight: "5px",
                },
            }
        }
    }
});

export default theme;
