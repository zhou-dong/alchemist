import { styled } from '@mui/system';
import { useAlgoContext } from "./AlgoContext";
import { Alert, Button, ButtonGroup, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import { edgeDisabledColor, edgeOriginalColor, nodeEnabledSkinColor, nodeEnabledTextColor, nodeOriginalSkinColor, nodeOriginalTextColor } from "./styles";

const DashboardPosition = styled('div')({
    position: "fixed",
    top: "20%",
    left: "10%",
});

const HasCycle = () => {
    const { state, steps } = useAlgoContext();

    const Displayer = () => {
        const hasCycle: boolean | undefined = steps[steps.length - 1]?.hasCycle;
        const severity = hasCycle ? "error" : "success";
        const title = hasCycle ? "Has Cycle" : "No Cycle";
        const content = hasCycle ? "Detected cycle in the graph" : "No cycle in the graph";

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

const AdjacencyList = () => {
    const { steps, index } = useAlgoContext();
    const step = steps[index];

    const Display = () => {
        const { adjacency } = step;
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} align='center'>
                            Adjacency List
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Array.from(adjacency.entries()).map((entry, i) => {
                            const [key, values] = entry;
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        {key}
                                    </TableCell>
                                    <TableCell sx={{ borderLeft: "1px solid lightgray" }}>
                                        {"[" + values.join(", ") + "]"}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        );
    }

    return (
        <>
            {step && <Display />}
        </>
    );
}

const Schedule = () => {
    const { steps, index } = useAlgoContext();
    const step = steps[index];

    const Display = () => {
        const { stack, numCourses } = step;
        const courses: string[] = [];
        for (let i = 0; i < numCourses; i++) {
            courses.push(" ");
        }
        for (let i = 0; i < stack.length; i++) {
            courses[i] = stack[i] + "";
        }
        return (
            <ButtonGroup color='inherit'>
                <Button sx={{ textTransform: "none" }}>
                    Schedule
                </Button>
                {
                    courses.map((course, i) => <Button key={i} sx={{ width: "45px" }}>{course}</Button>)
                }
            </ButtonGroup>
        );
    };

    return (
        <>
            {step && <Display />}
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

        const { visited, current, adjacency, stack } = step;
        for (let i = 0; i < graph.nodes.length; i++) {
            const node = graph.nodes[i];
            if (visited.indexOf(node.value) > -1) {
                await node.skin.setColor(nodeEnabledSkinColor);
                await node.text.setColor(nodeEnabledTextColor);
            } else {
                await node.skin.setColor(nodeOriginalSkinColor);
                await node.text.setColor(nodeOriginalTextColor);
            }
            if (node.value === current) {
                await node.skin.setColor(nodeEnabledSkinColor);
                await node.text.setColor(nodeEnabledTextColor);
            }

            if (stack.indexOf(node.value) > -1) {
                await node.skin.setColor("lightgray");
                await node.text.setColor(nodeEnabledTextColor);
            }
        }

        for (let i = 0; i < graph.edges.length; i++) {
            const edge = graph.edges[i];
            const targets: number[] = adjacency.get(edge.source.value) || [];
            if (targets.length === 0) {
                await edge.setColor(edgeDisabledColor);
            } else {
                await edge.setColor(edgeOriginalColor);
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
        <DashboardPosition>
            <Stack direction="column" spacing={2}>
                <HasCycle />
                <AdjacencyList />
                <Schedule />
            </Stack>
        </DashboardPosition>
        <ActionPanelPosition>
            <ActionPanel />
        </ActionPanelPosition>
    </>
);

export default Main;
