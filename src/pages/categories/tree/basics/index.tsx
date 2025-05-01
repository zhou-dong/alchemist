import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import theme from "../../../../commons/theme";
import Footer from "../../../commons/Footer";
import Header from "../../../commons/Header";



const Main = () => (
    <ThemeProvider theme={theme}>
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Header />
            123
            <Footer />
        </Box>
    </ ThemeProvider>
);

export default Main;
