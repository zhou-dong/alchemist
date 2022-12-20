import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import { AlgoContextProvider } from "./AlgoContext";
import Play from './Play';
import Introduction from "./Introduction";
import Title from './Title';

const Main = () => (
    <GameWrapper path={info.path}>
        <ThemeProvider theme={theme}>
            <AlgoContextProvider>
                <Introduction />
                <Title />
                <Play />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
