import * as THREE from 'three';
import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import Title from './Title';
import { ThemeProvider } from '@mui/material';
import localTheme from "./theme";
import Instructions from "./AlgoInstructions";
import Algo from './Algo';
import { AlgoContextProvider } from "./AlgoContext";

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Main = ({ renderer, camera, scene }: Props) => (
    <GameWrapper path={info.path}>
        <ThemeProvider theme={localTheme}>
            <AlgoContextProvider renderer={renderer} camera={camera} scene={scene}>
                <Instructions />
                <Title />
                <Algo />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
