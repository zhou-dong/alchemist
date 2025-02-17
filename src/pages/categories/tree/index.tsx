import { Box, ThemeProvider } from '@mui/material';
import theme from '../../../commons/theme';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';

const Main = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
            >
                <Header />
                tree
                <Footer />
            </Box>
        </ ThemeProvider>
    );
}

export default Main;
