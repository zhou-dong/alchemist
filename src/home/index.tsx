
import * as React from 'react';
import Filters from "./Filters";
import MenuButton from './Menu';
import List from './List';
import Footer from '../commons/Footer';

const Home = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <>
            <div style={{ width: "100%", height: "80px", minHeight: "80px" }} >
                <MenuButton open={open} setOpen={setOpen} />
            </div>
            <Filters open={open} setOpen={setOpen} />
            <List />
            <Footer />
        </>
    )
};

export default Home;
