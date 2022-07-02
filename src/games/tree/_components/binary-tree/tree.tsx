import React from "react";
import TreeNode from "./treeNode";
import DisplayNode from "./display";
import { createDisplayNodes } from "./helpers/displayNodesBuilder";

export interface Props {
    nodes: TreeNode[];
}

const Tree = ({ nodes }: Props) => (
    <React.Fragment>
        {createDisplayNodes(nodes).map((props, index) => <DisplayNode {...props} key={index} />)}
    </React.Fragment>
);

export default Tree;
