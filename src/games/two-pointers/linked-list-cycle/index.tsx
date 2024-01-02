import { AlgoContextProvider } from "./AlgoContext";
import Introduction from "./Introduction";
import Play from "./Play";
import Header from "./Header";

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Main = ({ renderer, camera, scene }: Props) => (
    <AlgoContextProvider renderer={renderer} camera={camera} scene={scene}>
        <Header />
        <Introduction />
        <Play />
    </AlgoContextProvider>
);

export default Main;
