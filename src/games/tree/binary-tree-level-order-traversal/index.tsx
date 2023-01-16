import React from 'react';
import * as THREE from 'three';
import GameWrapper from '../../commons/GameWrapper';
import info from "./info";
import { ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import theme from "../../../commons/theme";
import { SolutionType } from "./styles";
import BFS from "./bfs";
import DFS from "./dfs";
import Title from "./Title";

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const Switcher: React.FC<{
    solutionType: SolutionType,
    setSolutionType: React.Dispatch<React.SetStateAction<SolutionType>>
}> = ({ solutionType, setSolutionType }) => {

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newType: SolutionType,
    ) => {
        if (newType === undefined || newType === null) {
            return;
        }
        if (newType === solutionType) {
            return;
        }
        setSolutionType(newType);
    };

    return (
        <div style={{ position: 'fixed', bottom: 150, left: 40, zIndex: 1 }}>
            <ToggleButtonGroup
                sx={{ zIndex: 1 }}
                exclusive
                value={solutionType}
                color='info'
                onChange={handleChange}
            >
                <ToggleButton value={SolutionType.BFS}>
                    <Typography variant='h5'>
                        BFS
                    </Typography>
                </ToggleButton>
                <ToggleButton value={SolutionType.DFS}>
                    <Typography variant='h5'>
                        DFS
                    </Typography>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}

const Main = ({ renderer, camera, scene }: Props) => {

    const [solutionType, setSolutionType] = React.useState<SolutionType>(SolutionType.BFS);

    return (
        <GameWrapper path={info.path}>
            <ThemeProvider theme={theme}>
                <Title />
                <Switcher setSolutionType={setSolutionType} solutionType={solutionType} />
                {solutionType === SolutionType.BFS && <BFS renderer={renderer} camera={camera} scene={scene} />}
                {solutionType === SolutionType.DFS && <DFS renderer={renderer} camera={camera} scene={scene} />}
            </ThemeProvider>
        </GameWrapper>
    );
}

export default Main;
