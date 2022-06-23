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
    components: {
        MuiTable: {
            styleOverrides: {
                root: {
                    width: '55%',
                    borderRadius: 12,
                    display: "inline-table"
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    textAlign: 'center',
                    borderBottom: 'none',
                    '&:last-child': {
                        paddingRight: 0,
                    },
                },
                body: {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: "gray",
                    color: "black",
                    borderRadius: 0,
                    fontSize: 14,
                    fontWeight: 400,
                    height: 35,
                    minWidth: 30,
                },
                head: {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: "gray",
                    color: "black",
                    borderRadius: 0,
                    fontSize: 15,
                    fontWeight: 600,
                    height: 35,
                    minWidth: 30,
                }
            }
        }
    }
});

export default theme;
