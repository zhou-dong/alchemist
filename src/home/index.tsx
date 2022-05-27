
import * as React from 'react';
import Logo from '../Logo';
import Filters from "./Filters";
import MenuButton from './Menu';
import List from './Lists';

const Home = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <>
            <Logo />
            <MenuButton open={open} setOpen={setOpen} />
            <Filters open={open} setOpen={setOpen} />
            <List />
        </>
    )
};

export default Home;
