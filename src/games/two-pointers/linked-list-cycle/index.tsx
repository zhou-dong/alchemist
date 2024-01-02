import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider } from '@mui/material';
import theme from '../../dp/_commons/theme';
import One from "./one";
import Header from './Header';

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Main = ({ renderer, camera, scene }: Props) => {
    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Header />
                <One renderer={renderer} camera={camera} scene={scene} />
            </ThemeProvider>
        </GameWrapper>
    );
};

export default Main;
