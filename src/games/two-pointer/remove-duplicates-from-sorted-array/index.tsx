import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import One from "./impl";
import Header from './Header';

const Main = () => {
    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Header />
                <One />
            </ThemeProvider>
        </GameWrapper>
    );
};

export default Main;
