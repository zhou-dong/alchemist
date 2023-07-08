import * as THREE from "three";
import { useAlgoContext } from "./AlgoContext";
import { Button, Stack } from '@mui/material';
import { wait } from "../../../data-structures/_commons/utils";
import { State } from "./AlgoState";
import { SimpleGraphSkin, SimpleGraphText } from "../../../data-structures/graph/node.three";
import { GraphNode } from "../../../data-structures/graph/node.interface";
import { GraphEdge } from "../../../data-structures/graph/edge.interface";
import { SimpleUndirectedGraphEdge } from "../../../data-structures/graph/edge.three";
import { Graph } from "../../../data-structures/graph";
import { clearScene } from '../../../commons/three';

const Main = () => {

    const { animate, cancelAnimate, index, steps, setIndex, state, depthTreeSteps, setState, scene } = useAlgoContext();

    const handleOnClick = async () => {
        clearScene(scene);

        const nodeA = new GraphNode<string>(0, "A", new SimpleGraphSkin(scene, "blue"), new SimpleGraphText("A", scene, "green"));
        const nodeB = new GraphNode<string>(1, "B", new SimpleGraphSkin(scene, "blue"), new SimpleGraphText("A", scene, "green"));
        const nodeC = new GraphNode<string>(2, "C", new SimpleGraphSkin(scene, "blue"), new SimpleGraphText("A", scene, "green"));

        const edgeAB: GraphEdge<string> = new SimpleUndirectedGraphEdge(nodeA, nodeB, scene, "gold");
        const edgeBC: GraphEdge<string> = new SimpleUndirectedGraphEdge(nodeB, nodeC, scene, "pink");
        const graph = new Graph([nodeA, nodeB, nodeC], [edgeAB, edgeBC]);

        animate();
        try {
            graph.nodes.forEach(node => {
                node.show();
            });

            graph.edges.forEach(edge => {
                edge.show();
            });

            await wait(0.2);
            console.log("haha")
        } catch (error) {
            console.log(error);
        }
        cancelAnimate();
    }

    return (
        <Stack
            spacing={2}
            direction="column"
            style={{
                display: "flex",
                position: "fixed",
                bottom: "150px",
                justifyContent: "center",
                width: "100%",
                alignItems: "center"
            }}
        >
            <div>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleOnClick}
                    sx={{ color: "#FFF", zIndex: 1 }}
                    // disabled={state !== State.Playing}
                    color="info"
                >
                    next
                </Button>
            </div>
        </Stack>
    );
}

export default Main;
