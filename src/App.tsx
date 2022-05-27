import React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/list/Home';

import theme from "./pages/theme";
import Main from "./pages/playground/Main";

import Logo from './pages/components/Logo';
import { ProblemsProvider } from './problems/commons/ProblemsContext';

const SubApps = () => (
    <Routes>
        <Route index element={<Home />} />
        <>
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
    </Routes>
);

function Apps() {

    const drawerWidth = 240;

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    // height: "100%"
                }}>
                    <Main open={true} drawer_width={drawerWidth} >
                        <ProblemsProvider>
                            <SubApps />
                        </ProblemsProvider>
                    </Main>
                </Box>
                <Logo />
            </ThemeProvider>
        </>

    );
}

export default Apps;
