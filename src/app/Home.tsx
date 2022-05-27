import * as React from 'react';
import { styled } from '@mui/material/styles';

import Filters from "./Filters";
import MenuButton from './Menu';
import Sortings from '../collections/Sorting';
import { useProblems } from '../problems/ProblemsContext';
import { problems as allProblems } from "../problems/problems";

const Center = styled("div")(() => ({
    border: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
}));


const Home = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [segments, setSegments] = React.useState<number[]>([]);


    return (
        <>
            <MenuButton open={open} setOpen={setOpen} />
            <Filters open={open} setOpen={setOpen} />
            <Sortings />
        </>
    )
};

export default Home;
