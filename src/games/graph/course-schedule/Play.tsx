import { styled } from '@mui/system';
import { useAlgoContext } from "./AlgoContext";
import { Alert, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import { nodeEnabledSkinColor, nodeEnabledTextColor, nodeOriginalSkinColor, nodeOriginalTextColor } from "./styles";

const DisplayCanFinishPosition = styled('div')({
    position: "fixed",
    top: "20%",
    left: "10%"
});

const DisplayCanFinish = () => {
    const { state, steps } = useAlgoContext();

    const Displayer = () => {
        const canFinish: boolean | undefined = steps[steps.length - 1]?.canFinish;
        const severity = canFinish ? "success" : "error";
        const title = canFinish ? "Can Finish" : "Can Not Finish";
        const content = canFinish ? "No cycle in the graph" : "Detected cycle in the graph";

        return (
            <Alert
                severity={severity}
                iconMapping={{
                    success: <TaskAltIcon fontSize="inherit" />,
                    error: <DangerousIcon fontSize="inherit" />,
                }}
            >
                <strong>{title}</strong> - {content}
            </Alert>
        );
    }

    return (
        <>
            {state === State.Finished && <Displayer />}
        </>
    );
}

const ActionPanelPosition = styled('div')({
    display: "flex",
    position: "fixed",
    bottom: "150px",
    justifyContent: "center",
    width: "100%",
    alignItems: "center"
});

const ActionPanel = () => {

    const { animate, cancelAnimate, state, setState, graph, steps, index, setIndex } = useAlgoContext();

    const step = steps[index];

    const handleNext = async () => {
        if (!graph) {
            return;
        }

        if (!step) {
            return;
        }

        setState(State.Computing);

        const { visited, current } = step;
        for (let i = 0; i < graph.nodes.length; i++) {
            const node = graph.nodes[i];
            if (visited.indexOf(node.value) > -1) {
                await node.skin.color.setColor(nodeEnabledSkinColor);
                await node.text.color.setColor(nodeEnabledTextColor);
            } else {
                await node.skin.color.setColor(nodeOriginalSkinColor);
                await node.text.color.setColor(nodeOriginalTextColor);
            }

            if (node.value === current) {
                await node.skin.color.setColor(nodeEnabledSkinColor);
                await node.text.color.setColor(nodeEnabledTextColor);
            }
        }

        animate();
        wait(0.2);
        cancelAnimate();

        if (index === steps.length - 1) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
            setIndex(i => i + 1);
        }
    }

    const color = state === State.Playing ? "success" : "default";
    const borderColor = state === State.Playing ? "green" : "lightgray";

    return (
        <IconButton
            size="large"
            onClick={handleNext}
            disabled={state !== State.Playing}
            color={color}
            sx={{
                border: `1px solid ${borderColor}`,
                zIndex: 1
            }}
        >
            <PlayArrowIcon fontSize="large" />
        </IconButton>
    );
}

const Main = () => (
    <>
        <DisplayCanFinishPosition>
            <DisplayCanFinish />
        </DisplayCanFinishPosition>
        <ActionPanelPosition>
            <ActionPanel />
        </ActionPanelPosition>
    </>
);

export default Main;
