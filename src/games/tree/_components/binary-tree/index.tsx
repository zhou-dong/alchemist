import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Alert, Collapse } from '@mui/material';

import Node from "./dataNode";
import TreeNode, { Status } from "./treeNode";
import Tree from "./tree";
import { createTreeNodes } from "./helpers/displayNodesBuilder";
import ButtonGroups from "./buttons";
import { Actions } from "./actions/action";

const baseButtonStyle = {
    minWidth: 60,
    minHeight: 30,
    padding: 0,
};

const filledButtonStyle = {
    ...baseButtonStyle,
    color: "black",
    // backgroundColor: "gold"
};

export { Node };

export interface Props {
    challengeId: number;
    root: Node;
    svgHeight: number;
    svgWidth: number;
    heightUnit: number;
    nodeRadius: number;
    y: number;
    actions: Actions;
    leftTextContent: string;
    middleTextContent: string;
    rightTextContent: string;
    goLeftIndex: number;
    printIndex: number;
    goRightIndex: number;
}

interface ResultsProps {
    size: number;
    values: string[]
};

const Results = ({ size, values }: ResultsProps) => {
    const contents: string[] = Array(size).fill("");
    const styles = Array(size).fill(baseButtonStyle);
    values.forEach((value, index) => {
        contents[index] = value;
        styles[index] = filledButtonStyle;
    });
    return (
        <ButtonGroup size="small" key={0} style={{ marginTop: "0px" }}>
            {contents.map((data, index) => <Button size="small" key={index} style={styles[index]} disabled>{data}</Button>)}
        </ButtonGroup>
    );
};

interface StartButtonProps {
    handleClick: () => void;
    actionIndex: number;
}

const StartButton = ({ actionIndex, handleClick }: StartButtonProps) => {
    const style = { ...baseButtonStyle, color: "white" };
    if (actionIndex === -1) {
        return (<Button onClick={handleClick} color="primary" variant="contained" style={style}>START</Button>);
    } else {
        return (<Button variant="outlined" disabled >START</Button>);
    }
};

const BinaryTree = ({
    root,
    svgHeight,
    svgWidth,
    heightUnit,
    nodeRadius,
    y,
    challengeId,
    actions,
    leftTextContent,
    middleTextContent,
    rightTextContent,
    goLeftIndex,
    printIndex,
    goRightIndex,
}: Props) => {
    const [results, setResults] = useState<string[]>([]);
    const [treeNodes, setTreeNodes] = useState<TreeNode[]>(createTreeNodes(root, svgWidth, heightUnit, nodeRadius, y));
    const [actionIndex, setActionIndex] = useState<number>(-1);

    const handleStart = () => {
        setTreeNodes(previous => {
            const results = [...previous];
            results[0].status = Status.ACTIVATED;
            return results;
        })
        setActionIndex(0);
    };

    // re-render tree after svgWidth changed.
    useEffect(() => {
        setTreeNodes(previous => {
            const map = new Map<number, TreeNode>();
            const newNodes = createTreeNodes(root, svgWidth, heightUnit, nodeRadius, y);
            newNodes.forEach(node => {
                map.set(node.index, node);
            });

            return [...previous].map(node => {
                const cloned: TreeNode = map.get(node.index)!;
                node.circleCx = cloned.circleCx;
                node.circleCy = cloned.circleCy;
                node.textX = cloned.textX;
                node.textY = cloned.textY;
                return node;
            });
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [svgWidth]);

    useEffect(() => {
        setTreeNodes(createTreeNodes(root, svgWidth, heightUnit, nodeRadius, y));
        setActionIndex(-1);
        setResults([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [root]);

    const [alertOpen, setAlertOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Collapse in={alertOpen} style={{ margin: "0 auto", maxWidth: "600px" }}>
                <Alert variant="filled" severity="error" style={{ marginBottom: "10px" }}>Oops, please try again.</Alert>
            </Collapse>
            <div>
                <Results size={root.size} values={results} />
            </div>
            <svg height={svgHeight} width={svgWidth} style={{}}>
                <Tree nodes={treeNodes} />
                <ButtonGroups
                    challengeId={challengeId}
                    actions={actions}
                    treeNodes={treeNodes}
                    actionsIndex={actionIndex}
                    leftTextContent={leftTextContent}
                    middleTextContent={middleTextContent}
                    rightTextContent={rightTextContent}
                    goLeftIndex={goLeftIndex}
                    printIndex={printIndex}
                    goRightIndex={goRightIndex}
                    setActionIndex={setActionIndex}
                    setTreeNodes={setTreeNodes}
                    setResults={setResults}
                    setAlertOpen={setAlertOpen}
                />
            </svg>
            <div>
                <StartButton actionIndex={actionIndex} handleClick={handleStart} />
            </div>
        </React.Fragment >
    );
};

export default BinaryTree;
