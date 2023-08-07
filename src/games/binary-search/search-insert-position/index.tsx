import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import Title from "./Title";
import { ThemeProvider } from '@mui/material';
import theme from "../../../commons/theme";
import Instructions from "./Instructions"
import { AlgoContextProvider } from "./AlgoContext";
import ActionPanel from './ActionPanel';
import Dashboard from "./Dashboard";

const Main = () => {
    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <AlgoContextProvider>
                    <Title />
                    <Instructions />
                    <ActionPanel />
                    <Dashboard />
                </AlgoContextProvider>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
