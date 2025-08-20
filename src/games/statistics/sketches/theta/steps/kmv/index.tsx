import React from 'react';
import gsap from 'gsap';
import { at } from 'obelus';
import { clearScene, createDualRenderer, createOrthographicCamera } from "../../../../../../utils/threeUtils";
import { WrapperProvider } from '../../components/wrapper/WrapperProvider';
import { buildAnimateTimeline } from 'obelus-gsap-player';
import { useThreeContainer } from "../../../../../../hooks/useThreeContainer";
import { useThreeAutoResize } from "../../../../../../hooks/useThreeAutoResize";
import { DualScene, type TimelineSceneThree, render, axis, text, circle, defaultTheme, latex, line } from 'obelus-three-render';
import { AnimationController } from "../../../../../../utils/animation-controller";
import KseToKmv from './KseToKmv';
import TimelinePlayer from '../../components/TimelinePlayer';
import { Container, Tooltip, Fab } from '@mui/material';
import KmvConfigDialog from './KmvConfigDialog';

import * as Settings from '@mui/icons-material/Settings';
import * as TipsAndUpdates from '@mui/icons-material/TipsAndUpdates';
import * as SportsEsports from '@mui/icons-material/SportsEsports';
import NextPageButton from '../../components/NextPageButton';
import StartButton from '../../components/StartButton';

const SettingsIcon = Settings.default as unknown as React.ElementType;
const TipsAndUpdatesIcon = TipsAndUpdates.default as unknown as React.ElementType;
const SportsEsportsIcon = SportsEsports.default as unknown as React.ElementType;

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

    // build hash values and sort them randomly
    const buildHashValues = (size: number): number[] => {
        const set = new Set<number>();
        while (set.size < size) {
            const hash: number = Math.random();
            set.add(hash);
        }
        const shuffledArray = Array.from(set).sort(() => Math.random() - 0.5);
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

        return { id, k, theta, n, estimated, updatedThetaX, circle: newCircle };
    });
}

const buildTimeline = (entries: TimelineEntry[]) => {
    const timeline: any[] = [];

    entries.forEach((entry, index) => {
        const { id, k, theta, n, estimated, updatedThetaX } = entry;
        timeline.push(
            at(index + 2).animate(id, { position: { y: `+=${window.innerHeight}` } }, { duration: 1 })
        );
        timeline.push(
            at(index + 2).animate("n_value", { element: { textContent: `N(Expected) = ${n}` } }, { duration: 0 })
        );
        timeline.push(
            at(index + 2).animate("estimated", { element: { textContent: `Estimated = (K / θ) - 1 = (${k} / ${theta.toFixed(2)}) - 1 = ${estimated.toFixed(2)}` } }, { duration: 0 })
        );
        timeline.push(
            at(index + 2).animate("theta_line", { position: { x: `+=${updatedThetaX}` } }, { duration: 1 })
        );
        timeline.push(
            at(index + 2).animate("theta_latex", { position: { x: `+=${updatedThetaX}` } }, { duration: 1 })
        );
        timeline.push(
            at(index + 2).animate("theta_value", { element: { textContent: `${theta.toFixed(2)}` } }, { duration: 0 })
        );
        timeline.push(
            at(index + 2).animate("theta_value", { position: { x: `+=${updatedThetaX}` } }, { duration: 1 })
        );
    });

    return timeline;
}

const renderer = createDualRenderer();
const camera = createOrthographicCamera();
const scene = new DualScene();
const animationController = new AnimationController(renderer, scene, camera);

let componentLevelShowStepper: boolean = true;
let componentLevelShowNextPageButton: boolean = false;

function ThetaSketchPageContent({
    showStepper,
    setShowStepper,
}: {
    showStepper: boolean;
    setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const defaultK = 10;
    const defaultStreamSize = 50;
    const [k, setK] = React.useState(defaultK);
    const [streamSize, setStreamSize] = React.useState(defaultStreamSize);

    const [displayIntroduction, setDisplayIntroduction] = React.useState(false);
    const [openKmvConfigDialog, setOpenKmvConfigDialog] = React.useState(false);
    const [showTimelinePlayer, setShowTimelinePlayer] = React.useState(false);
    const [showNextPageButton, setShowNextPageButton] = React.useState(false);

    const [timeline, setTimeline] = React.useState<any>(null);

    const { containerRef } = useThreeContainer(renderer);
    useThreeAutoResize(containerRef, renderer, scene, camera);

    React.useEffect(() => {
        setShowStepper(componentLevelShowStepper);
        setShowNextPageButton(componentLevelShowNextPageButton);
        return () => {
            animationController.stopAnimation();
        };
    }, []);

    const handleBuildTimeline = () => {
        animationController.stopAnimation();
        gsap.globalTimeline.clear();
        clearScene(scene);
        animationController.renderAnimationOnce();

        const entries = buildTimelineEntries(streamSize, k);

        const stepScene: TimelineSceneThree = {
            objects: [
                ...buildDashboard(k),
                ...buildAxis(),
                ...entries.map(entry => entry.circle),
            ],
            timeline: [
                ...displayAxisAndDashboard(),
                ...buildTimeline(entries),
            ],
        }

        const record = render(stepScene.objects, scene as any);
        let timeline = buildAnimateTimeline(
            stepScene.timeline,
            record,
            animationController.startAnimation,
            animationController.stopAnimation
        );
        setTimeline(timeline);
    }

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
                <TipsAndUpdatesIcon />
            </Fab>
        </Tooltip>
    );

    const KmvSettingsToggle = () => (
        <Tooltip title={openKmvConfigDialog ? 'Close Config' : 'KMV Config'} placement="left">
            <Fab
                onClick={() => setOpenKmvConfigDialog(!openKmvConfigDialog)}
                sx={{
                    position: 'fixed',
                    bottom: 240,
                    right: 24,
                    zIndex: 1000
                }}
            >
                <SettingsIcon />
            </Fab>
        </Tooltip>
    );

    const TimelinePlayerToggle = () => (
        <Tooltip title={showTimelinePlayer ? 'Hide Timeline' : 'Show Timeline'} placement="left">
            <Fab
                onClick={() => setShowTimelinePlayer(!showTimelinePlayer)}
                sx={{
                    position: 'fixed',
                    bottom: 168,
                    right: 24,
                    zIndex: 1000
                }}
            >
                < SportsEsportsIcon sx={{ fontSize: 28 }} />
            </Fab>
        </Tooltip>
    );

    const TimelinePlayerContainer = () => (
        <Container
            maxWidth="sm"
            sx={{
                position: 'fixed',
                bottom: 100,
                left: 0,
                right: 0,
                zIndex: 1000,
            }}
        >
            <TimelinePlayer
                timeline={timeline}
                onStart={() => {
                    animationController.startAnimation();
                }}
                onPause={() => {
                    animationController.stopAnimation();
                }}
                onComplete={() => {
                    setShowNextPageButton(true);
                    componentLevelShowNextPageButton = true;
                    animationController.stopAnimation();
                }}
            />
        </Container>
    );

    const handleStart = () => {
        setShowStepper(false);
        componentLevelShowStepper = false;
        setDisplayIntroduction(true);
    }

    return (
        <>
            {displayIntroduction && <KseToKmv onClose={() => {
                setDisplayIntroduction(false);
                setOpenKmvConfigDialog(true);
            }} />}
            {showTimelinePlayer && <TimelinePlayerContainer />}
            <KmvSettingsToggle />
            <TimelinePlayerToggle />
            <IntroductionToggle />

            {showStepper && <StartButton onStart={handleStart} />}

            <Container maxWidth="xs">
                <KmvConfigDialog
                    open={openKmvConfigDialog}
                    onClose={() => {
                        setOpenKmvConfigDialog(false);
                    }}
                    onStart={() => {
                        setShowTimelinePlayer(true);
                        handleBuildTimeline();
                    }}
                    k={k}
                    streamSize={streamSize}
                    setK={setK}
                    setStreamSize={setStreamSize}
                    defaultK={defaultK}
                    defaultStreamSize={defaultStreamSize}
                />
            </Container>

            {showNextPageButton && <NextPageButton nextPagePath="/algorithms/statistics/sketches/theta/steps/set-operations" title="Go to Set Operations" />}

            <div ref={containerRef} style={{ width: '100vw', height: '100vh', }} />
        </>
    );
}

export default function ThetaSketchPage() {
    const [showStepper, setShowStepper] = React.useState(true);

    return (
        <WrapperProvider title="K Minimum Value (KMV)" activeStep={2} showStepper={showStepper} setShowStepper={setShowStepper}>
            <ThetaSketchPageContent setShowStepper={setShowStepper} showStepper={showStepper} />
        </WrapperProvider>
    );
};
