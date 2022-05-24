import React from "react";
import { Link as RouterLink } from "react-router-dom";
import MaterialLink from "@mui/material/Link";
import { styled } from '@mui/material/styles';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { ChevronLeft, Menu } from '@mui/icons-material';

const ChevronPosition = styled("div")<{ drawer_width: number }>(({ drawer_width }) => ({
    width: drawer_width,
}));

const ChevronHolder = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const CloseDrawer: React.FC<{
    drawerWidth: number,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ drawerWidth, setOpen }) => (
    <ChevronPosition drawer_width={drawerWidth}>
        <Divider />
        <ChevronHolder>
            <IconButton onClick={() => setOpen(false)}>
                <ChevronLeft />
            </IconButton>
        </ChevronHolder>
    </ChevronPosition>
);

export const Title = () => (
    <Typography variant="h6" align="center" style={{ fontWeight: "normal" }}>
        <MaterialLink
            component={RouterLink}
            to="/"
            style={{ textDecoration: 'none' }}
        >
            alchemist
        </MaterialLink>
    </Typography>
);

export const OpenDrawer: React.FC<{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ open, setOpen }) => (
    <IconButton
        sx={{ ...(open && { display: 'none' }), marginRight: "10px" }}
        onClick={() => setOpen(true)}
    >
        <Menu />
    </IconButton>
);

const Item: React.FC<{ name: string, path: string }> = ({ name, path }) => (
    <ListItem disablePadding>
        <ListItemButton style={{ paddingLeft: 0, paddingRight: 0 }}>
            <MaterialLink
                color="textPrimary"
                component={RouterLink}
                to={path}
                style={{
                    textDecoration: 'none',
                    textAlign: 'center',
                    width: "100%",
                    // textTransform: "uppercase",
                }}
            >

                <ListItemText primary={name} />
            </MaterialLink>
        </ListItemButton>
    </ListItem>
);

const Items: React.FC<{ items: ItemProps[] }> = ({ items }) => (
    <List>
        {
            items.map((item, index) => (
                <Item key={index} name={item.name} path={item.path} />
            ))
        }
    </List>
);

interface ItemProps {
    name: string;
    path: string;
}

interface Props {
    drawerWidth: number;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    items: ItemProps[];
}

const Side = ({ drawerWidth, open, setOpen, items }: Props) => (
    <>
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
        >
            <CloseDrawer drawerWidth={drawerWidth} setOpen={setOpen} />
            <Divider />
            <Items items={items} />
        </Drawer>
        <OpenDrawer open={open} setOpen={setOpen} />
    </>

);

export default Side;
