import * as React from 'react';
import Footer from '../../commons/Footer';
import { Paper, ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import Logo from '../../commons/Logo';

const Body = () => {


    return (
        <Paper sx={{ backgroundColor: "#f8f9fa" }}>
            123
        </Paper>
    )

}

const Main = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ marginLeft: 40, marginRight: 40 }}>
                <Logo />

                <Body />

                {/* <Header open={open} setOpen={setOpen} />
                <Filters open={open} setOpen={setOpen} />
                <List /> */}
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Main;
