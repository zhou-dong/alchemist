import React from 'react';
import { useNavigate } from 'react-router-dom';
import { at } from 'obelus';
import { createDualRenderer, createOrthographicCamera } from '../../../../utils/threeUtils';
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { buildAnimateTimeline } from 'obelus-gsap-player';
import { useThreeContainer } from '../../../../hooks/useThreeContainer';
import { useThreeAutoResize } from '../../../../hooks/useThreeAutoResize';
import { DualScene, type TimelineSceneThree, render, axis, text, circle, defaultTheme, latex, line } from 'obelus-three-render';
import { AnimationController } from '../../../../utils/animation-controller';
import KseToKmv from './KseToKmv';
import TimelinePlayer from '../../components/TimelinePlayer';
import { Container, Tooltip, Fab } from '@mui/material';

import * as PlayArrow from '@mui/icons-material/PlayArrow';
import * as Settings from '@mui/icons-material/Settings';
import * as Lightbulb from '@mui/icons-material/Lightbulb';
import KmvConfigDialog from './KmvConfigDialog';

const SettingsIcon = Settings.default as unknown as React.ElementType;
const PlayArrowIcon = PlayArrow.default as unknown as React.ElementType;
const LightbulbIcon = Lightbulb.default as unknown as React.ElementType;

const { axisStyle, textStyle, circleStyle, lineStyle } = defaultTheme;

const axisWidth = window.innerWidth / 2;
const xAlign = -axisWidth / 2;

const axisY = window.innerHeight / 10 - window.innerHeight;

const buildAxis = () => {
    const start = { x: -axisWidth / 2, y: axisY };
    const end = { x: axisWidth / 2, y: axisY };
    return [
        axis("axis", start, end, { ...axisStyle, dotCount: 2 }),
        text("axis_start", "0", { ...start, y: axisY - 15 }, textStyle),
        text("axis_end", "1", { ...end, y: axisY - 15 }, textStyle),
    ]
};

//    K = 5
//      θ
// ---- | ----
//     0.5
//   N = 100
// Estimated = (K / θ) - 1
const buildDashboard = (k: number) => {
    return [
        text("k_value", `K = ${k}`, { y: window.innerHeight / 10 * 2 - window.innerHeight, x: 0 }, textStyle),
        latex("theta_latex", "\\theta", { x: axisWidth + xAlign, y: axisY + 30 }, textStyle),
        line("theta_line", { x: axisWidth + xAlign, y: axisY + 15 }, { x: axisWidth + xAlign, y: axisY }, 2, lineStyle),
        text("theta_value", "1", { x: axisWidth + xAlign, y: axisY - 15 }, textStyle),
        text("n_value", `N(Expected) = 0`, { y: -window.innerHeight }, textStyle),
        text("estimated", "Estimated = (K / θ) - 1", { y: -window.innerHeight - 30 }, textStyle),
    ]
};

const displayAxisAndDashboard = () => {
    const steps = ["axis", "axis_start", "axis_end", "theta_line", "theta_latex", "theta_value", "estimated", "k_value", "n_value"];
    return steps.map((id) => at(0).animate(id, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 }));
}

interface TimelineEntry {
    id: string;
    k: number;
    theta: number;
    n: number;
    estimated: number;
    circle: any;
    updatedThetaX: number;
}

const buildTimelineEntries = (size: number, k: number): TimelineEntry[] => {
    const radius = 3;


    const buildHashValues = (size: number): number[] => {
        const set = new Set<number>();
        while (set.size < size) {
            const hash: number = Math.random();
            set.add(hash);
        }
        const shuffledArray = [...set].sort(() => Math.random() - 0.5);
        return shuffledArray;
    }

    const hashValues = buildHashValues(size);

    let previousThetaX = axisWidth + xAlign;
    return hashValues.map((hash, index) => {
        const x = hash * axisWidth + xAlign;
        const id = "circle_" + index;
        const newCircle = circle(id, radius, { x, y: axisY }, circleStyle);
        const sortedHashes = hashValues.slice(0, index + 1).sort((a, b) => a - b);
        const n: number = index + 1;
        const theta: number = k > n ? 1 : sortedHashes[k - 1];
        const estimated: number = k > n ? n : (k / theta) - 1;

        const thetaX = theta * axisWidth + xAlign;

        let updatedThetaX = thetaX - previousThetaX;
        previousThetaX = thetaX;

        const item: TimelineEntry = {
            id,
            k,
            theta,
            n,
            estimated,
            circle: newCircle,
            updatedThetaX
        };

        return item;
    });
}

const buildTimeline = (entries: TimelineEntry[]) => {
    const timeline: any[] = [];

    entries.forEach((entry, index) => {
        const { id, k, theta, n, estimated, updatedThetaX } = entry;
        timeline.push(
            at(index + 1).animate(id, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 })
        );
        timeline.push(
            at(index + 1).animate("n_value", { element: { textContent: `N(Expected) = ${n}` } }, { duration: 0 })
        );
        timeline.push(
            at(index + 1).animate("estimated", { element: { textContent: `Estimated = (K / θ) - 1 = (${k} / ${theta.toFixed(2)}) - 1 = ${estimated.toFixed(2)}` } }, { duration: 0 })
        );
        timeline.push(
            at(index + 1).animate("theta_line", { position: { x: `+=${updatedThetaX}` } }, { duration: 1 })
        );
        timeline.push(
            at(index + 1).animate("theta_latex", { position: { x: `+=${updatedThetaX}` } }, { duration: 1 })
        );
        timeline.push(
            at(index + 1).animate("theta_value", { element: { textContent: `${theta.toFixed(2)}` } }, { duration: 0 })
        );
        timeline.push(
            at(index + 1).animate("theta_value", { position: { x: `+=${updatedThetaX}` } }, { duration: 1 })
        );
    });

    return timeline;
}

const entries = buildTimelineEntries(50, 5);

const stepScene: TimelineSceneThree = {
    objects: [
        ...buildDashboard(5),
        ...buildAxis(),
        ...entries.map(entry => entry.circle),
    ],
    timeline: [
        ...displayAxisAndDashboard(),
        ...buildTimeline(entries),
    ],
}

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

const record = render(stepScene.objects, scene as any);
let timeline = buildAnimateTimeline(
    stepScene.timeline,
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
            <TimelinePlayer
                timeline={timeline}
                startAnimation={animationController.startAnimation}
                stopAnimation={animationController.stopAnimation}
            />
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
