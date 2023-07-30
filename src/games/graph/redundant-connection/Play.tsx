import * as THREE from "three";
import { styled } from '@mui/system';
import MergeIcon from '@mui/icons-material/Merge';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAlgoContext } from "./AlgoContext";
import { Button, ButtonGroup } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import { redundantEdgeColor, regularEdgeColor } from "./styles";
import { Board } from "./Board";
import { DirectedGraphEdge, UndirectedGraphEdge } from '../../../data-structures/graph/edge.three';
import { GraphNode } from '../../../data-structures/graph/node.interface';
import { GraphEdge } from '../../../data-structures/graph/edge.interface';
import { layoutCalculator } from "./layout";

const DashboardPosition = styled('div')({
    position: "fixed",
    top: "18%",
    left: "18%",
});

const ActionPanelPosition = styled('div')({
    display: "flex",
    position: "fixed",
    bottom: "150px",
    justifyContent: "center",
    width: "100%",
    alignItems: "center"
});

const buildDirectedGraphEdge = (
    source: GraphNode<number>,
    target: GraphNode<number>,
    scene: THREE.Scene
): GraphEdge<number> => {
    const headLength: number = 1.2;
    const headWidth: number = 0.3;
    return new DirectedGraphEdge(source, target, scene, regularEdgeColor, headLength, headWidth);
}

const buildUndirectedGraphEdge = (
    source: GraphNode<number>,
    target: GraphNode<number>,
    scene: THREE.Scene
): GraphEdge<number> => {
    const material = new THREE.LineBasicMaterial({ color: redundantEdgeColor });
    return new UndirectedGraphEdge(source, target, scene, material);
}

const ActionPanel = () => {

    const { animate, cancelAnimate, state, setState, graph, index, setIndex, disjointSet, scene, edges } = useAlgoContext();

    const reDrawGraph = async (redundant: number[]) => {
        if (!graph) {
            return;
        }

        const [a, b] = redundant;
        if (a !== undefined && b !== undefined) {
            const source = graph.nodes.filter(node => node.value === a)[0];
            const target = graph.nodes.filter(node => node.value === b)[0];
            graph.addEdge(buildUndirectedGraphEdge(source, target, scene));
        }

        Array.from(disjointSet.map.entries()).forEach(entry => {
            const [key, value] = entry;
            const source = graph.nodes.filter(node => node.value === key)[0];
            const target = graph.nodes.filter(node => node.value === value.parent.value)[0];

            if (source !== target) {
                if ((a === source.value && b === target.value) || (a === target.value && b === source.value)) {
                    graph.addEdge(buildUndirectedGraphEdge(source, target, scene));
                } else {
                    graph.addEdge(buildDirectedGraphEdge(source, target, scene));
                }
            }
        });

        graph.show();

        animate();
        await wait(0.2);
        cancelAnimate();
    }


    const handleUnion = async () => {
        if (index >= edges.length) {
            return;
        }

        if (!graph) {
            return;
        }

        const findEdges = (source: number, target: number) => {
            return graph.edges.filter(edge =>
                (edge.source.value === source && edge.target.value === target) ||
                (edge.target.value === source && edge.source.value === target)
            );
        }

        setState(State.Computing);
        const [a, b] = edges[index];

        if (a !== undefined && b !== undefined) {
            findEdges(a, b).forEach(edge => {
                graph.dropEdge(edge);
            })
        }

        const rootA = disjointSet.find(a);
        const rootB = disjointSet.find(b);

        if (rootA !== rootB) {
            disjointSet.union(a, b);
            await reDrawGraph([]);
            if (index === edges.length - 1) {
                setState(State.Finished);
            } else {
                setState(State.Playing);
            }
            setIndex(i => i + 1);
        } else {
            disjointSet.union(a, b);
            await reDrawGraph([a, b]);
            setState(State.Finished);
        }
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
                onClick={handleResetPositions}
                startIcon={<RefreshIcon />}
                disabled={graph === undefined || graph.nodes.length === 0}
            >
                Reset Positions
            </Button>
        </ButtonGroup>
    );
}

const Main = () => (
    <>
        <DashboardPosition>
            <Board />
        </DashboardPosition>
        <ActionPanelPosition>
            <ActionPanel />
        </ActionPanelPosition>
    </>
);

export default Main;
