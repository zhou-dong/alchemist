import * as React from 'react';
import GameWrapper from "../../commons/GameWrapper";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import info from "./info";
import Demo from './Demo';
import Play from './Play';
import { AlgoContextProvider } from './AlgoContext';

const Main = () => {

    const [alignment, setAlignment] = React.useState('play');

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <AlgoContextProvider >
                    {alignment === "play" && <Play alignment={alignment} setAlignment={setAlignment} />}
                    {/* {alignment === "display" && <Demo alignment={alignment} setAlignment={setAlignment} />} */}
                </AlgoContextProvider>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
