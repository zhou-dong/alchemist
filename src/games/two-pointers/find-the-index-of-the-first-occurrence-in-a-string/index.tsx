import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import { AlgoContextProvider, useAlgoContext } from "./AlgoContext";
import Toolbox from "./toolbox";
import Game from './game';
import Introduction from './introduction';

const Components = () => {
    const { displayIntroduction } = useAlgoContext();
    return (
        <>
            {displayIntroduction ? <Introduction /> : <Toolbox />}
        </>
    );
}

const Main = () => (
    <GameWrapper path={info.path}>
        <ThemeProvider theme={theme}>
            <AlgoContextProvider>
                <Components />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
