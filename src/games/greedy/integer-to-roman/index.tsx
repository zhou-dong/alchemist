import React from 'react';
import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import theme from '../../dp/_commons/theme';
import Hardcode from './hardcode';
import Greedy from "./greedy";

const Switcher: React.FC<{
    view: string,
    setView: React.Dispatch<React.SetStateAction<string>>
}> = ({ view, setView }) => {

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newView: string,
    ) => {
        if (newView && newView !== view) {
            setView(newView);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: 100, left: 20, zIndex: 1, width: "100%", margin: "auto", textAlign: "center" }}>
            <ToggleButtonGroup
                sx={{ zIndex: 1 }}
                exclusive
                value={view}
                color='info'
                onChange={handleChange}
            >
                <ToggleButton value="greedy">
                    Greedy
                </ToggleButton>
                <ToggleButton value="hardcode">
                    Hardcode
                </ToggleButton>

            </ToggleButtonGroup>
        </div>
    );
}

const Main = () => {
    const [view, setView] = React.useState<string>("greedy");

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Switcher view={view} setView={setView} />
                {view === "greedy" && <Greedy />}
                {view === "hardcode" && <Hardcode />}
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
