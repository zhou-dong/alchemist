import * as THREE from 'three';
import Algo from "./Algo";
import AlgoMenu from "./AlgoMenu";
import Title from './Title';
import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ContainerProvider } from "./ContainerContext";

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Main = ({ renderer, camera, scene }: Props) => {
    return (
        <GameWrapper path={info.path}>
            <ContainerProvider renderer={renderer} camera={camera} scene={scene}>
                <Title />
                <AlgoMenu />
                <Algo />
            </ContainerProvider>
        </GameWrapper>
    );
}

export default Main;
