import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import { AlgoContextProvider, useAlgoContext } from "./AlgoContext";
import Toolbox from "./toolbox";
import Play from './game';
import Introduction from './introduction';

const Game = () => {
    const { displayIntroduction } = useAlgoContext();
    return (
        <>
            {displayIntroduction && <Introduction />}
            {!displayIntroduction && <Toolbox />}
            {!displayIntroduction && <Play />}
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
