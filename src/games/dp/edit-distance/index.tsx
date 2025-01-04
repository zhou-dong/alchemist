import GameWrapper from "../../commons/GameWrapper";
import { ThemeProvider } from '@mui/material';
import theme from '../_commons/theme';
import info from "./info";
import Game from './Game';
import Welcome from "./welcome";
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import Description from "./description";

const Component = () => {
    const { state } = useAlgoContext();

    const getComponent = () => {

        console.log("state", state);

        switch (state) {
            case State.Welcome: return <Welcome />
            case State.Description: return <Description />;
            case State.Input: return <>input</>;
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
            <Component />
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
