import { IconButton, styled } from "@mui/material";

export const StyledButton = styled(IconButton)(({ theme }) => ({
    width: "50px",
    height: "50px",
    border: "1px solid " + theme.palette.primary.light,
    backgroundColor: "#fff",
    color: theme.palette.primary.light,
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
    },
    '&&.Mui-selected': {
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.dark,
        color: "#fff",
    },
    '&&.Mui-disabled': {
        backgroundColor: "lightgray",
        color: "#fff",
    },
}));
