import GameWrapper from "../../commons/GameWrapper";
import { ThemeProvider } from '@mui/material';
import theme from '../_commons/theme';
import info from "./info";
import Game from './Game';
import Welcome from "./welcome";
import { AlgoContextProvider, useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import Description from "./description";
import Input from "./input";
import Code from "./code";

const Component = () => {
    const { state } = useAlgoContext();

    const getComponent = () => {
        switch (state) {
            case State.Welcome: return <Welcome />
            case State.Description: return <Description />;
            case State.DisplayCode: return <Code />;
            case State.Input: return <Input />;
            case State.Playing: return <Game />;
            case State.Finished: return <Game />;
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
