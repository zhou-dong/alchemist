import * as THREE from 'three';
import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import localTheme from "./theme";
import Instructions from "./AlgoInstructions";
import { AlgoContextProvider } from "./AlgoContext";
import AlgoCode from './AlgoCode';

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
                <AlgoCode />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
