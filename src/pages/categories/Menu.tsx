import React from "react";
import { IconButton } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import { grey } from '@mui/material/colors';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton = ({ open, setOpen }: Props) => (
    <IconButton
        size="medium"
        sx={{
            // ...(open && { display: 'none' }),
            border: "1px solid",
            borderColor: grey[300],
            margin: "10px 0",
            float: "right",
            // backgroundColor: green[600],
            // "&:hover": {
            //     backgroundColor: green[800],
            // }
        }}
        onClick={() => setOpen(true)}
        disabled={open}
    >
        <GridViewIcon />
    </IconButton>
);

export default MenuButton;
