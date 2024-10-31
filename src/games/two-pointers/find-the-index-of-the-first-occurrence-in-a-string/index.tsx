import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import { AlgoContextProvider, useAlgoContext } from "./AlgoContext";
import Introduction from "./Introduction";
import Play from './game/Play';
import Introduce from './introduce';

const Game = () => {
    const { displayIntroduce } = useAlgoContext();
    return (
        <>
            {displayIntroduce && <Introduce />}
            {!displayIntroduce && <Introduction />}
            {!displayIntroduce && <Play />}
        </>
    );
}

const Main = () => (
    <GameWrapper path={info.path}>
        <ThemeProvider theme={theme}>
            <AlgoContextProvider>
                <Game />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
