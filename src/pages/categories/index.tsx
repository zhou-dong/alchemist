import { Link } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../../commons/theme';
import Header from '../commons/Header';
import Footer from '../commons/Footer';

const Main = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
            >
                <Header />
                <Link to="/pages/categories/tree">Tree</Link>
                <Footer />
            </Box>
        </ ThemeProvider>
    );
}

export default Main;
