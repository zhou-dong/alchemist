import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import Title from './Title';
import { ThemeProvider } from '@mui/material';
import theme from "../../../commons/theme";
import Introduction from "./Introduction";
import { AlgoContextProvider } from "./AlgoContext";
import Algo from './Algo';

const Main = () => (
    <GameWrapper path={info.path}>
        <ThemeProvider theme={theme}>
            <AlgoContextProvider>
                <Introduction />
                <Title />
                <Algo />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
