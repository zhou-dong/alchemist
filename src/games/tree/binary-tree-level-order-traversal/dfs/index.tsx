import { AlgoContextProvider } from "./AlgoContext";
import Dfs from "./Dfs";
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
            <Dfs />
        </AlgoContextProvider>
    )
}

export default Main;
