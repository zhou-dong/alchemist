import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import React from 'react';
import { Solution } from './Switcher';
import One from "./one";
import Two from "./two";
import Header from './Header';

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Main = ({ renderer, camera, scene }: Props) => {

    const [solution, setSolution] = React.useState<Solution>("one");

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Header solution={solution} setSolution={setSolution} />
                {solution === "one" && <One renderer={renderer} camera={camera} scene={scene} />}
                {solution === "two" && <Two renderer={renderer} camera={camera} scene={scene} />}
            </ThemeProvider>
        </GameWrapper>
    );
};

export default Main;
