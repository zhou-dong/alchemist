import * as React from 'react';
import Filters from "./Filters";
import List from '../commons/List';
import Footer from '../commons/Footer';
import { ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';

import MenuButton from './Menu';
import Header from '../commons/Header';

const Home = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const xs = 6;
    const sm = 4;
    const md = 3;
    const lg = 2;
    const xl = 1.5;

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <div style={{ marginLeft: 40, marginRight: 40, marginBottom: 40 }}>
                <MenuButton open={open} setOpen={setOpen} />
                <Filters open={open} setOpen={setOpen} />
                <List xs={xs} sm={sm} md={md} lg={lg} xl={xl} />
            </div>
            <Footer />
        </ThemeProvider>
    );
};

export default Home;
