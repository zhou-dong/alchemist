import React from "react";
import { IconButton, Toolbar } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton = ({ open, setOpen }: Props) => (
    <Toolbar
        sx={{ position: "fixed", top: 0, right: 0 }}
    >
        <IconButton
            sx={{
                ...(open && { display: 'none' }),
                border: "1px solid grey"
            }}
            onClick={() => setOpen(true)}
        >
            <MenuRoundedIcon />
        </IconButton>
    </Toolbar>
);

export default MenuButton;
