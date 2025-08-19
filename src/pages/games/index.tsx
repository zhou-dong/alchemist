import * as React from 'react';
import Filters from "./Filters";
import List from '../commons/List';
import Footer from '../commons/Footer';
import { ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';

import MenuButton from './Menu';
import Header from '../commons/Header';
import { Container } from '@mui/material';

const Home = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const xs = 6;
    const sm = 4;
    const md = 4;
    const lg = 3;
    const xl = 3;

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Container maxWidth="xl" sx={{ px: 5, pb: 5 }}>
                <MenuButton open={open} setOpen={setOpen} />
                <Filters open={open} setOpen={setOpen} />
                <List xs={xs} sm={sm} md={md} lg={lg} xl={xl} />
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default Home;
