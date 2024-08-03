import * as React from 'react';
import Filters from "./Filters";
import List from '../commons/List';
import Footer from '../commons/Footer';
import { Divider, ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import Header from "./Header";

const Home = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const xs = 6;
    const sm = 4;
    const md = 3;
    const lg = 2;
    const xl = 1.5;

    return (
        <ThemeProvider theme={theme}>
            <div style={{ marginLeft: 40, marginRight: 40 }}>
                <Header open={open} setOpen={setOpen} />
                <Filters open={open} setOpen={setOpen} />
                <List xs={xs} sm={sm} md={md} lg={lg} xl={xl} />
                <Divider sx={{ marginTop: "20px" }} />
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Home;
