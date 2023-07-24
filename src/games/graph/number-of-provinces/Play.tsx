import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup, Stack } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import { edgeOriginalColor } from "./styles";
import { Board } from "./Board";
import { Graph } from '../../../data-structures/graph';
import { DirectedGraphEdge } from '../../../data-structures/graph/edge.three';
import { GraphNode } from '../../../data-structures/graph/node.interface';
import { GraphEdge } from '../../../data-structures/graph/edge.interface';

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

const ActionPanel = () => {

    const { animate, cancelAnimate, state, setState, graph, steps, index, setIndex, disjointSet, scene } = useAlgoContext();

    const buildEdge = (g: Graph<number>, i: number, j: number): GraphEdge<number> | null => {

        const findNode = (value: number) => {
            return g.nodes.filter(node => node.value === value)[0];
        }

        const source: GraphNode<number> = findNode(i);
        const target: GraphNode<number> = findNode(j);
        if (source === target) {
            return null;
        }

        const edge = new DirectedGraphEdge(
            findNode(i),
            findNode(j),
            scene,
            edgeOriginalColor,
            1.2,
            0.5
        );

        edge.show();

        return edge;
    }

    const doNext = (g: Graph<number>, row: number, col: number) => {

        g.edges
            .filter(
                edge => (edge.source.value === row && edge.target.value === col) || (edge.source.value === col && edge.target.value === row)
            )
            .forEach(
                edge => g.dropEdge(edge)
            );

        disjointSet.union(row, col);

        // g.edges
        //     .filter(edge => edge.source.value === row)
        //     .forEach(edge => g.dropEdge(edge))

        const edge1 = buildEdge(g, row, disjointSet.findRootByValue(row).parent.value);
        if (edge1) {
            g.addEdge(edge1);
        }

        const edge2 = buildEdge(g, col, disjointSet.findRootByValue(col).parent.value);
        if (edge2) {
            g.addEdge(edge2);
        }
    }

    const handleNext = async () => {
        if (!graph) {
            return;
        }
        const step = steps[index];
        if (!step) {
            return;
        }

        setState(State.Computing);
        const { row, col } = step;
        if (row !== col) {
            doNext(graph, row, col);
        }
        animate();
        wait(0.2);
        cancelAnimate();

        if (index === steps.length - 1) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }
        setIndex(i => i + 1);
    }

    return (
        <Button
            variant='contained'
            color='success'
            onClick={handleNext}
            disabled={state !== State.Playing}
            sx={{ zIndex: 1 }}
            startIcon={<MergeIcon fontSize="large" />}
        >
            union
        </Button>
    );
}

const Roots = () => {
    const { roots, state } = useAlgoContext();

    const Display = () => (
        <ButtonGroup variant='contained' color='success'>
            <Button>roots</Button>
            {
                roots.map((root, i) =>
                    <Button key={i}>
                        {root}
                    </Button>
                )
            }
        </ButtonGroup>
    )

    return (
        <>
            {state === State.Finished && <Display />}
        </>
    )
}

const Main = () => (
    <>
        <DashboardPosition>
            <Stack
                direction="column"
                spacing={2}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
