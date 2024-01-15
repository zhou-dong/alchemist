import { ThemeProvider } from "@mui/material";
import GameWrapper from "../../commons/GameWrapper";
import { AlgoContextProvider } from "./AlgoContext";
import Introduction from "./Introduction";
import Play from "./Play";
import info from "./info";
import theme from '../../dp/_commons/theme';
import Header from "./Header";

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Main = ({ renderer, camera, scene }: Props) => (
    <GameWrapper path={info.path}>
        <ThemeProvider theme={theme}>
            <AlgoContextProvider renderer={renderer} camera={camera} scene={scene}>
                <Header />
                <Introduction />
                <Play />
            </AlgoContextProvider>
        </ThemeProvider>
    </GameWrapper>
);

export default Main;
