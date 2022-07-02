import React from 'react';
import * as THREE from "three";
import TwoThreeTree from "../_components/two-three-tree";
import RedBlackTree from "../_components/red-black-tree";
import { init as initThree, createPlane, createLight, getWidth, getHeight } from "../_components/helpers/three-helpers";
import { Button, Grid, IconButton, MobileStepper, Typography, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, RefreshOutlined } from '@mui/icons-material';
import GameWrapper from '../../commons/GameWrapper';
import info from "./info";

interface Params<T> {
    input: T[];
}

const width = getWidth();
const height = getHeight();

const three1 = initThree(width, height);
const scene1 = new THREE.Scene();
const plane1 = createPlane();
const light1 = createLight();

const three2 = initThree(width, height);
const scene2 = new THREE.Scene();
const plane2 = createPlane();
const light2 = createLight();

export const buildTreeData = (): number[] => {
    let result: number[] = []
    for (let i = 0; i < 15; i++) {
        result.push(i + 1);
    }
    return result;
}

const Main = <T extends unknown>({ input }: Params<T>) => {

    const [current, setCurrent] = React.useState<T[]>([]);

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setCurrent(previous => {
            const nextLength = previous.length + 1;
            return input.slice(0, nextLength);
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setCurrent(previous => {
            const nextLength = previous.length - 1;
            return input.slice(0, nextLength);
        });
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleRefresh = () => {
        setActiveStep(() => 0);
        setCurrent(() => []);
    };

    return (
        <GameWrapper path={info.path}>
            <div style={{ overflow: "hidden" }}>
                <Grid container alignItems="center">
                    <Grid item sm={11}>
                        <MobileStepper
                            variant="dots"
                            steps={input.length}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === input.length}>
                                    Next  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} Back
                                </Button>
                            }
                        />
                    </Grid>
                    <Grid item sm={1}>
                        <IconButton onClick={handleRefresh}>
                            <RefreshOutlined />
                        </IconButton>
                    </Grid>
                </Grid>

                <Grid container alignItems="center">
                    <Grid item sm={6}>
                        <Typography align="center">
                            2-3 Tree
                        </Typography>
                        <TwoThreeTree
                            {...three1}
                            scene={scene1}
                            input={current}
                            marginY={3}
                            radius={0.5}
                            startY={4}
                            plane={plane2}
                            light={light2}
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <Typography align="center">
                            <span style={{ color: "red" }}>Red</span>-Black Tree
                        </Typography>
                        <RedBlackTree
                            {...three2}
                            scene={scene2}
                            input={current}
                            marginY={3}
                            radius={0.5}
                            startY={13}
                            plane={plane1}
                            light={light1}
                        />
                    </Grid>
                </Grid>
            </div>
        </GameWrapper>
    );
};

export default Main;
