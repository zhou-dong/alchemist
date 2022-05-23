import React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

import theme from "./theme";
import Side from './Side';
import Main from "./Main";

import Stack from "../collections/Stack";
import Queue from "../collections/Queue";
import Tree from "../collections/Tree";
import DP from "../collections/Dp";
import Sorting from "../collections/Sorting";

const sideItems = (
    [
        { name: "Dynamic Programming", path: "dynamic-programming" },
        { name: "Sorting", path: "sorting" },
        { name: "Tree", path: "tree" },
        { name: "Stack", path: "stack" },
        { name: "Queue", path: "queue" },
    ]
);

const SubApps = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="stack" element={<Stack />} />
        <Route path="queue" element={<Queue />} />
        <Route path="tree" element={<Tree />} />
        <Route path="sorting" element={<Sorting />} />
        <Route path="dp" element={< DP />} />
    </Routes>
);

function Apps() {

    const drawerWidth = 220;
    const [open, setOpen] = React.useState<boolean>(true);

    return (
        <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
            <ThemeProvider theme={theme}>
                <Side open={open} drawerWidth={drawerWidth} setOpen={setOpen} items={sideItems} />
            </ThemeProvider>
            <Main open={open} drawer_width={drawerWidth} >
                <SubApps />
            </Main>
        </Box>
    );
}

export default Apps;
