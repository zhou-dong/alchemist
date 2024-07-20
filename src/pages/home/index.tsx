import * as React from 'react';
import Filters from "./Filters";
import List from './List';
import Footer from '../../commons/Footer';
import { ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import Header from "./Header";

const Home = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ marginLeft: 40, marginRight: 40 }}>
                <Header open={open} setOpen={setOpen} />
                <Filters open={open} setOpen={setOpen} />
                <List />
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Home;
