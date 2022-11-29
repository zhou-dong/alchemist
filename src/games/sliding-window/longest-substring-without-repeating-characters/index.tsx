import GameWrapper from "../../commons/GameWrapper";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import info from "./info";
import Play from './Play';
import { AlgoContextProvider } from './AlgoContext';

const Main = () => (
    <GameWrapper path={info.path}>
        <ThemeProvider theme={theme}>
            <AlgoContextProvider >
                <Play />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
