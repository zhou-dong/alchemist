import React from "react";
import { IconButton } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton = ({ open, setOpen }: Props) => (
    <IconButton
        size="large"
        sx={{
            ...(open && { display: 'none' }),
            backgroundColor: "green",
        }}
        onClick={() => setOpen(true)}
    >
        <MenuRoundedIcon sx={{ color: "#FFF" }} />
    </IconButton>
);

export default MenuButton;
