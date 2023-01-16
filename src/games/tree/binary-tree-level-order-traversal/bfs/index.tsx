import { AlgoContextProvider } from "./AlgoContext";
import Bfs from "./Bfs";
import Instructions from "./Instructions";

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Main = ({ renderer, camera, scene }: Props) => {
    return (
        <AlgoContextProvider renderer={renderer} camera={camera} scene={scene}>
            <Instructions />
            <Bfs />
        </AlgoContextProvider>
    )
}

export default Main;
