import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import { AlgoContextProvider, useAlgoContext } from "./AlgoContext";
import Toolbox from "./toolbox";
import Description from './description';
import { State } from './AlgoState';
import Input from './input';

const Components = () => {
    const { state } = useAlgoContext();

    const getComponent = () => {
        switch (state) {
            case State.Description: return <Description />;
            case State.Input: return <Input />;
            case State.Playing: return <Toolbox />
            case State.Finished: return <Toolbox />
        }
    }

    return (
        <>
            {getComponent()}
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
