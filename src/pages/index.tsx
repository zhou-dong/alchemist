
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Logo from './Logo';
import Filters from "./Filters";
import MenuButton from './Menu';
import List from './Lists';
import theme from "./theme";

const Home = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <ThemeProvider theme={theme}>
            <Logo />
            <MenuButton open={open} setOpen={setOpen} />
            <Filters open={open} setOpen={setOpen} />
            <List />
        </ThemeProvider>
    )
};

export default Home;
