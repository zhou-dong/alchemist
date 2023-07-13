import * as THREE from 'three';
import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import Title from './Title';
import { ThemeProvider } from '@mui/material';
import theme from "../../../commons/theme";
import Instructions from "./Instructions";
import { AlgoContextProvider } from "./AlgoContext";
import Algo from "./Play";

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Main = ({ renderer, camera, scene }: Props) => {
    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <AlgoContextProvider renderer={renderer} camera={camera} scene={scene}>
                    <Title />
                    <Instructions />
                    <Algo />
                </AlgoContextProvider>
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
