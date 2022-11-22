import { createTheme } from "@mui/material";

const theme = createTheme({
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
