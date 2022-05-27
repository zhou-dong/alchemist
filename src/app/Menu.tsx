import React from "react";
import { IconButton, Toolbar } from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton = ({ open, setOpen }: Props) => (
    <Toolbar sx={{ position: "static", paddingTop: "20px" }}>
        <IconButton
            sx={{
                ...(open && { display: 'none' }),
                border: "1px solid"
            }}
            onClick={() => setOpen(true)}
        >
            <MenuRoundedIcon sx={{ padding: "10px" }} />
        </IconButton>
    </Toolbar>
);

export default MenuButton;
