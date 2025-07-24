import React from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { at } from 'obelus';
import { createDualRenderer, createOrthographicCamera } from '../../../../utils/threeUtils';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { buildAnimateTimeline, type PlayableStep } from 'obelus-gsap-player';
import { useThreeContainer } from '../../../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../../../hooks/useThreeAutoResize';
import { DualScene, textStyle, latex, type TimelineSceneThree, render, axisStyle, axis, text } from 'obelus-three-render';
import { AnimationController } from '../../../../utils/animation-controller';
import KseToKmv from './KseToKmv';
import TimelinePlayer from '../../components/TimelinePlayer';
import { Container, Button, Box, Tooltip, Fab } from '@mui/material';

import * as PlayArrow from '@mui/icons-material/PlayArrow';
import * as Settings from '@mui/icons-material/Settings';
import * as Lightbulb from '@mui/icons-material/Lightbulb';
import KmvConfigDialog from './KmvConfigDialog';

const SettingsIcon = Settings.default as unknown as React.ElementType;
const PlayArrowIcon = PlayArrow.default as unknown as React.ElementType;
const LightbulbIcon = Lightbulb.default as unknown as React.ElementType;

const axisWidth = window.innerWidth / 2;

const buildAxis = () => {
    const y = window.innerHeight / 10;
    const start = { x: -axisWidth / 2, y };
    const end = { x: axisWidth / 2, y };
    const axisLine = axis("axis", start, end, { ...axisStyle, dotCount: 2 });
    const axisStart = text("axis_start", "0", { ...start, y: y - 15 }, textStyle);
    const axisEnd = text("axis_end", "1", { ...end, y: y - 15 }, textStyle);
    return [axisLine, axisStart, axisEnd];
}

const stepScene: TimelineSceneThree = {
    objects: [
        ...buildAxis(),
    ],
    timeline: [
        // at(0.1).animate('circle1', { position: { y: 200 } }, { duration: 1 }),
    ],
}

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

const record = render(stepScene.objects, scene as any);
let timeline: gsap.core.Timeline = buildAnimateTimeline(
    [], //stepScene.steps,
    record,
    animationController.startAnimation,
    animationController.stopAnimation
);

let index = -1;

function ThetaSketchPageContent({
    setShowStepper,
}: {
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = React.useState(false);
    const [displayIntroduction, setDisplayIntroduction] = React.useState(false);
    const [openKmvConfigDialog, setOpenKmvConfigDialog] = React.useState(false);
    const [showTimelinePlayer, setShowTimelinePlayer] = React.useState(false);

    const defaultK = 5;
    const defaultStreamSize = 100;
    const defaultAnimationSpeed = 1;

    const [k, setK] = React.useState(defaultK);
    const [streamSize, setStreamSize] = React.useState(defaultStreamSize);
    const [animationSpeed, setAnimationSpeed] = React.useState(defaultAnimationSpeed);

    const { containerRef } = useThreeContainer(renderer);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    React.useEffect(() => {
        if (index > -1) {
            setShowStepper(false);
            return;
        }

        return () => {
            animationController.stopAnimation();
        };
    }, []);

    const onClick = async () => {
        if (index === -1) {
            setShowStepper(false);
            setDisabled(true);
            setDisplayIntroduction(true);
            index = 0;
            return;
        }

        // if (index === steps.length) {
        navigate('/sketches/theta/set-operations');
        // return;
        // }

        setDisabled(true);
        // await steps[index].play();

        index = index + 1;
        setDisabled(false);
    };

    const KmvSettings = () => (
        <Tooltip title={openKmvConfigDialog ? 'Close Config' : 'KMV Config'} placement="left">
            <Fab
                onClick={() => setOpenKmvConfigDialog(!openKmvConfigDialog)}
                sx={{
                    position: 'fixed',
                    bottom: 168,
                    right: 24,
                    zIndex: 1000
                }}
            >
                <SettingsIcon />
            </Fab>
        </Tooltip>
    );

    const IntroductionToggle = () => (
        <Tooltip title={displayIntroduction ? 'Hide Introduction' : 'Show Introduction'} placement="left">
            <Fab
                onClick={() => setDisplayIntroduction(!displayIntroduction)}
                sx={{
                    position: 'fixed',
                    bottom: 312,
                    right: 24,
                    zIndex: 1000
                }}
            >
                <LightbulbIcon />
            </Fab>
        </Tooltip>
    );

    const TimelineToggle = () => (
        <Tooltip title={showTimelinePlayer ? 'Hide Timeline' : 'Show Timeline'} placement="left">
            <Fab
                onClick={() => setShowTimelinePlayer(!showTimelinePlayer)}
                sx={{
                    position: 'fixed',
                    bottom: 240,
                    right: 24,
                    zIndex: 1000
                }}
            >
                < PlayArrowIcon sx={{ fontSize: 28 }} />
            </Fab>
        </Tooltip>
    );

    const TimelinePlayerContainer = () => (
        <Container
            maxWidth="sm"
            sx={{ position: 'fixed', bottom: 100, left: 0, right: 0, }}
        >
            <TimelinePlayer timeline={timeline} />
        </Container>
    );

    return (
        <>
            {displayIntroduction && <KseToKmv setDisabled={setDisabled} setDisplayIntroduction={setDisplayIntroduction} />}
            {showTimelinePlayer && <TimelinePlayerContainer />}
            <KmvSettings />
            <TimelineToggle />
            <IntroductionToggle />

            <Container maxWidth="xs">
                <KmvConfigDialog
                    open={openKmvConfigDialog}
                    onClose={() => { setOpenKmvConfigDialog(false) }}
                    onStart={() => { }}
                    k={k}
                    animationSpeed={animationSpeed}
                    streamSize={streamSize}
                    setK={setK}
                    setAnimationSpeed={setAnimationSpeed}
                    setStreamSize={setStreamSize}
                    defaultK={defaultK}
                    defaultAnimationSpeed={defaultAnimationSpeed}
                    defaultStreamSize={defaultStreamSize}
                />
            </Container>

            <div ref={containerRef} style={{ width: '100vw', height: '100vh', }} />
        </>
    );
}

export default function ThetaSketchPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="K Minimum Value (KMV)" activeStep={2} showStepper={showStepper} setShowStepper={setShowStepper}>
            <ThetaSketchPageContent setShowStepper={setShowStepper} />
        </WrapperProvider>
    );
};
