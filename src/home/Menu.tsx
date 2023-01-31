import React from "react";
import { IconButton } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { green } from '@mui/material/colors';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton = ({ open, setOpen }: Props) => (
    <IconButton
        size="medium"
        sx={{
            ...(open && { display: 'none' }),
            backgroundColor: green[600],
            "&:hover": {
                backgroundColor: green[800],
            }
        }}
        onClick={() => setOpen(true)}
    >
        <MenuRoundedIcon sx={{ color: "#FFF" }} />
    </IconButton>
);

export default MenuButton;
