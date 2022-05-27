import * as React from 'react';
import { styled } from '@mui/material/styles';

import Filters from "./Filters";
import MenuButton from './components/Menu';
import Sortings from '../collections/Sorting';

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

    return (
        <>
            <MenuButton open={open} setOpen={setOpen} />
            <Filters open={open} setOpen={setOpen} />
            <Sortings />
            <Center>center</Center>
        </>
    )
};

export default Home;
