import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import { AlgoContextProvider } from "./AlgoContext";
import Introduction from "./Introduction";
import Play from './Play';

const Main = () => (
    <GameWrapper path={info.path}>
        <ThemeProvider theme={theme}>
            <AlgoContextProvider>
                {/* <Header /> */}
                <Introduction />
                <Play />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
