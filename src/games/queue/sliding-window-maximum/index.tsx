import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import Title from './Title';
import { ThemeProvider } from '@mui/material';
import theme from "../../../commons/theme";
import Instructions from "./Instructions";
import { AlgoContextProvider } from "./AlgoContext";
import Algo from './Play';

const Main = () => {
    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <AlgoContextProvider>
                    <Instructions />
                    <Title />
                    <Algo />
                </AlgoContextProvider>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
