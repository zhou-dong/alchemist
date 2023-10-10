import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import React from 'react';
import { Solution } from './Switcher';
import One from "./one";
import Two from "./two";
import Header from './Header';

const Main = () => {

    const [solution, setSolution] = React.useState<Solution>("one");

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>

                <Header solution={solution} setSolution={setSolution} />
                {solution === "one" && <One />}
                {solution === "two" && <Two />}
            </ThemeProvider>
        </GameWrapper>
    );
};

export default Main;
