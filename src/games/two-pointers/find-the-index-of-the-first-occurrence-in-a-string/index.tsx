import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import { AlgoContextProvider, useAlgoContext } from "./AlgoContext";
import Description from './description';
import { State } from './AlgoState';
import Input from './input';
import Game from './game';
import Welcome from './welcome';

const Component = () => {
    const { state } = useAlgoContext();

    const getComponent = () => {
        switch (state) {
            case State.Welcome: return <Welcome />;
            case State.Description: return <Description />;
            case State.Input: return <Input />;
            case State.Playing: return <Game />
            case State.Finished: return <Game />
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
                <Component />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
