import React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

import theme from "./theme";
import Side, { OpenDrawer, Title } from './Side';
import Main from "./Main";

import Stack from "../collections/Stack";
import Queue from "../collections/Queue";
import Tree from "../collections/Tree";
import DP from "../collections/Dp";
import Sorting from "../collections/Sorting";
import { Toolbar } from '@mui/material';
import Header from './Header';

const sideItems = (
    [
        { name: "DP", path: "dp" },
        { name: "Sorting", path: "sorting" },
        { name: "Tree", path: "tree" },
        { name: "Stack", path: "stack" },
        { name: "Queue", path: "queue" },
    ]
);

const SubApps = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path="stack" element={<Stack />} />
        <Route path="queue" element={<Queue />} />
        <Route path="tree" element={<Tree />} />
        <>
            <Route path="sorting" element={<Sorting />} />

            <Route path="sorting/bubble-sort" element={<div>Bubble Sort</div>} />
            <Route path="sorting/selection-sort" element={<div>Selection Sort</div>} />
            <Route path="sorting/merge-sort" element={<div>Merge Sort</div>} />
            <Route path="sorting/insertion-sort" element={<div>Insertion Sort</div>} />
            <Route path="sorting/quick-sort" element={<div>Quick Sort</div>} />
            <Route path="sorting/heap-sort" element={<div>Heap Sort</div>} />
            <Route path="sorting/counting-sort" element={<div>Counting Sort</div>} />
            <Route path="sorting/bucket-sort" element={<div>Bucket Sort</div>} />
            <Route path="sorting/radix-sort" element={<div>Redix Sort</div>} />
        </>


        <Route path="dp" element={< DP />} />
    </Routes>
);

function Apps() {

    const drawerWidth = 240;
    const [open, setOpen] = React.useState<boolean>(true);

    return (
        <>
            <Box sx={{
                display: "flex",
                width: "100%",
                height: "100%"
            }}>
                <ThemeProvider theme={theme}>
                    <Side open={open} drawerWidth={drawerWidth} setOpen={setOpen} items={sideItems} />
                </ThemeProvider>
                <Main open={open} drawer_width={drawerWidth} >
                    <ThemeProvider theme={theme}>
                        <Header />
                    </ThemeProvider>
                    <SubApps />
                </Main>
            </Box>
        </>

    );
}

export default Apps;
