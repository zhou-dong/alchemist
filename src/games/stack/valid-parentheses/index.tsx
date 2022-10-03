import * as THREE from 'three';
import Algo from "./Algo";
import AlgoMenu from "./AlgoMenu";
import Title from './Title';
import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ContainerProvider } from "./ContainerContext";
import { ThemeProvider } from '@mui/material';
import theme from "../../../commons/theme";

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Main = ({ renderer, camera, scene }: Props) => {
    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <ContainerProvider renderer={renderer} camera={camera} scene={scene}>
                    <Title />
                    <AlgoMenu />
                    <Algo />
                </ContainerProvider>
            </ThemeProvider>

        </GameWrapper>
    );
}

export default Main;
