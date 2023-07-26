import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import CompressIcon from '@mui/icons-material/Compress';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import { edgeOriginalColor } from "./styles";
import { Board } from "./Board";
import { DirectedGraphEdge } from '../../../data-structures/graph/edge.three';
import { GraphNode } from '../../../data-structures/graph/node.interface';
import { GraphEdge } from '../../../data-structures/graph/edge.interface';
import { layoutCalculator } from "./layout";

const DashboardPosition = styled('div')({
    position: "fixed",
    top: "10%",
    left: "8%",
});

const ActionPanelPosition = styled('div')({
    display: "flex",
    position: "fixed",
    bottom: "150px",
    justifyContent: "center",
    width: "100%",
    alignItems: "center"
});

const buildDirectedGraphEdge = (source: GraphNode<number>, target: GraphNode<number>, scene: THREE.Scene): GraphEdge<number> => {
    const headLength: number = 1.2;
    const headWidth: number = 0.3;
    return new DirectedGraphEdge(source, target, scene, edgeOriginalColor, headLength, headWidth);
}

const ActionPanel = () => {

    const { animate, cancelAnimate, state, setState, graph, steps, index, setIndex, disjointSet, scene } = useAlgoContext();

    const reDrawGraph = async () => {
        if (!graph) {
            return;
        }

        [...graph.edges].forEach(edge => graph.dropEdge(edge));

        Array.from(disjointSet.map.entries()).forEach(entry => {
            const [key, value] = entry;
            const source = graph.nodes.filter(node => node.value === key)[0];
            const target = graph.nodes.filter(node => node.value === value.parent.value)[0];
            // if (source !== target) {
            graph.addEdge(buildDirectedGraphEdge(source, target, scene));
            // }
        });

        graph.show();

        animate();
        await wait(0.2);
        cancelAnimate();
    }

    const handleUnion = async () => {
        const step = steps[index];
        if (!step) {
            return;
        }

        setState(State.Computing);
        const { row, col } = step;
        disjointSet.union(row, col);

        await reDrawGraph()

        if (index === steps.length - 1) {
            setState(State.Compress);
        } else {
            setState(State.Playing);
        }
        setIndex(i => i + 1);
    }

    const handleCompress = async () => {
        setState(State.Computing);
        disjointSet.compress();
        await reDrawGraph();
        setState(State.Finished);
    }

    const handleResetPositions = async () => {
        if (!graph) {
            return;
        }

        graph.setPositions(layoutCalculator as any);

        animate();
        await wait(0.2);
        cancelAnimate();
    }

    return (
        <ButtonGroup variant='contained' color='success' size='large'>
            <Button
                sx={{ textTransform: 'none' }}
                disabled={state !== State.Playing}
                onClick={handleUnion}
                startIcon={<MergeIcon />}
            >
                Union
            </Button>
            <Button
                sx={{ textTransform: 'none' }}
                disabled={state !== State.Compress}
                onClick={handleCompress}
                startIcon={<CompressIcon />}
            >
                Compress
            </Button>
            <Button
                sx={{ textTransform: 'none' }}
                onClick={handleResetPositions}
                startIcon={<RefreshIcon />}
                disabled={graph === undefined || graph.nodes.length === 0}
            >
                Reset Positions
            </Button>
        </ButtonGroup>
    );
}

const Roots = () => {
    const { roots, state } = useAlgoContext();

    const Display = () => (
        <ButtonGroup variant='contained' color='success'>
            <Button sx={{ textTransform: 'none' }}>Roots</Button>
            {
                roots.map((root, i) => <Button key={i}>{root}</Button>)
            }
        </ButtonGroup>
    );

    return (
        <>
            {state === State.Finished && <Display />}
        </>
    );
}

const Main = () => (
    <>
        <DashboardPosition>
            <Stack
                direction="column"
                spacing={2}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
                <Board />
                <Roots />
            </Stack>
        </DashboardPosition>
        <ActionPanelPosition>
            <ActionPanel />
        </ActionPanelPosition>
    </>
);

export default Main;
