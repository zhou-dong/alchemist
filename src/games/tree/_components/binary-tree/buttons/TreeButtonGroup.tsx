import React from "react";
import Action, { RectProps, TextProps } from "./TreeButton";
import TreeNode, { Status } from "../treeNode";
import { ActionType, Actions } from "../actions/action";

const rx = 8; // rectangle corners rounded
const horizontalMargin = 2;
const verticalMargin = 2;
const yPlus = 17;

export interface Props {
    challengeId: number;
    width: number;
    height: number;
    treeNode: TreeNode;
    actions: Actions;
    actionsIndex: number;
    setActionIndex: React.Dispatch<React.SetStateAction<number>>;
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>;
    setResults: React.Dispatch<React.SetStateAction<string[]>>;
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
    leftTextContent: string;
    middleTextContent: string;
    rightTextContent: string;
    goLeftIndex: number;
    printIndex: number;
    goRightIndex: number;
}

interface ButtonProps extends Props {
    x: number;
    y: number;
}

const calculateStartPosition = (node: TreeNode) => {
    if (node.parent === undefined) {
        return { x: node.circleCx + 24, y: node.circleCy - 33 };
    } else {
        return { x: node.circleCx - 84, y: node.circleCy - 72 };
    }
};

const triggerAlert = (setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setAlertOpen(true);
    setTimeout(() => {
        setAlertOpen(false);
    }, 2000)
};

const doNothingClick = () => { };

const handleGoLeftClick = (
    treeNode: TreeNode,
    actions: Actions,
    actionsIndex: number,
    setActionIndex: React.Dispatch<React.SetStateAction<number>>,
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const currentAction = actions.get(actionsIndex);

    if (currentAction.node.index !== treeNode.index) {
        return;
    }

    if (currentAction.action === ActionType.GO_LEFT) {
        setTreeNodes(previous => {
            return [...previous].map(node => {
                if (treeNode.index === node.index) {
                    if (node.left) {
                        node.left.status = Status.ACTIVATED;
                    }
                    node.goLeftEnabled = false;
                }
                return node;
            })
        })
        setActionIndex(index => index + 1);
    } else {
        triggerAlert(setAlertOpen);
    }
};

const computeX = (x: number, index: number, width: number): number => (
    x + index * width + index * horizontalMargin
);

const GoLeft = ({
    x,
    y,
    width,
    height,
    actions, actionsIndex,
    leftTextContent,
    goLeftIndex,
    treeNode,
    setTreeNodes,
    setActionIndex,
    setAlertOpen
}: ButtonProps) => {
    const handleClick = treeNode.goLeftEnabled ? () => handleGoLeftClick(
        treeNode, actions, actionsIndex, setActionIndex, setTreeNodes, setAlertOpen) : doNothingClick;

    x = computeX(x, goLeftIndex, width);
    const disabled = !treeNode.goLeftEnabled;
    const rectProps: RectProps = { x, y, rx, width, height, handleClick, disabled };
    const textProps: TextProps = { x: x + 6, y: y + yPlus, content: leftTextContent, disabled };
    return <Action rect={rectProps} text={textProps} />;
};

const handlePrintValClick = (
    treeNode: TreeNode,
    actions: Actions,
    actionsIndex: number,
    setActionIndex: React.Dispatch<React.SetStateAction<number>>,
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
    setResults: React.Dispatch<React.SetStateAction<string[]>>,
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const currentAction = actions.get(actionsIndex);

    if (currentAction.node.index !== treeNode.index) {
        return;
    }

    if (currentAction.action === ActionType.PRINT_VAL) {
        setTreeNodes(previous => {
            return [...previous].map(node => {
                if (treeNode.index === node.index) {
                    node.status = Status.PRINTED;
                    node.printValEnabled = false;
                }
                return node;
            })
        });

        setResults(results => {
            const cloned = [...results];
            cloned.push(treeNode.content);
            return cloned;
        });

        setActionIndex(index => index + 1);
    } else {
        triggerAlert(setAlertOpen);
    }
};

const PrintVal = ({
    x,
    y,
    width,
    height,
    treeNode,
    printIndex,
    actions,
    actionsIndex,
    middleTextContent,
    setTreeNodes,
    setActionIndex,
    setResults,
    setAlertOpen
}: ButtonProps) => {

    x = computeX(x, printIndex, width);
    const handleClick = treeNode.printValEnabled ? () => handlePrintValClick(
        treeNode, actions, actionsIndex, setActionIndex, setTreeNodes, setResults, setAlertOpen
    ) : doNothingClick;

    const disabled = !treeNode.printValEnabled;
    const rectProps: RectProps = { x, y, rx, width, height, handleClick, disabled };
    const textProps: TextProps = { x: x + 3, y: y + yPlus, content: middleTextContent, disabled };
    return <Action rect={rectProps} text={textProps} />;
};

const handleGoRightClick = (
    treeNode: TreeNode,
    actions: Actions,
    actionsIndex: number,
    setActionIndex: React.Dispatch<React.SetStateAction<number>>,
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const currentAction = actions.get(actionsIndex);

    if (currentAction.node.index === treeNode.index && currentAction.action === ActionType.GO_RIGHT) {

        setTreeNodes(previous => {
            return [...previous].map(node => {
                if (treeNode.index === node.index) {
                    if (node.right) {
                        node.right.status = Status.ACTIVATED;
                    }
                    node.goRightEnabled = false;
                }
                return node;
            });
        })

        setActionIndex(index => index + 1);
    } else {
        triggerAlert(setAlertOpen);
    }
};

const GoRight = ({
    x,
    y,
    width,
    height,
    treeNode,
    goRightIndex,
    actions,
    actionsIndex,
    rightTextContent,
    setTreeNodes,
    setActionIndex,
    setAlertOpen
}: ButtonProps) => {
    x = computeX(x, goRightIndex, width);

    const handleClick = treeNode.goRightEnabled ? () => handleGoRightClick(
        treeNode, actions, actionsIndex, setActionIndex, setTreeNodes, setAlertOpen
    ) : doNothingClick;

    const disabled = !treeNode.goRightEnabled;
    const rectProps: RectProps = { x, y, rx, width, height, handleClick, disabled };
    const textProps: TextProps = { x: x + 2, y: y + yPlus, content: rightTextContent, disabled };

    return <Action rect={rectProps} text={textProps} />;
};

const handleReturnToParentClick = (
    treeNode: TreeNode,
    actions: Actions,
    actionsIndex: number,
    setActionIndex: React.Dispatch<React.SetStateAction<number>>,
    setTreeNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {

    const currentAction = actions.get(actionsIndex);

    if (currentAction.node.index === treeNode.index && currentAction.action === ActionType.BACK_TO_PARENT) {

        setTreeNodes(previous => {
            return [...previous].map(node => {
                if (treeNode.index === node.index) {
                    node.status = Status.FINISHED;
                    node.returnToParentEnabled = false;
                }
                return node;
            })
        })

        setActionIndex(index => index + 1);
    } else {
        triggerAlert(setAlertOpen);
    }

};

const ReturnToParent = ({
    x,
    y,
    width,
    height,
    treeNode,
    actions,
    actionsIndex,
    challengeId,
    setTreeNodes,
    setActionIndex,
    setAlertOpen
}: ButtonProps) => {
    y = y + height + verticalMargin;



    const handleClick = treeNode.returnToParentEnabled ? () => handleReturnToParentClick(
        treeNode, actions, actionsIndex, setActionIndex, setTreeNodes, setAlertOpen
    ) : doNothingClick;

    const disabled = !treeNode.returnToParentEnabled;
    const rectProps: RectProps = { x, y, rx, width: width * 3 + horizontalMargin * 2, height, handleClick, disabled };
    const textProps: TextProps = { x: x + 25, y: y + yPlus, content: "RETURN TO PARENT", disabled };

    return <Action rect={rectProps} text={textProps} />;
};

const TreeButtonGroup = (props: Props) => {
    const { actions, actionsIndex, treeNode } = props;
    const currentAction = actions.get(actionsIndex);

    if (currentAction && treeNode.index === currentAction.node.index) {
        const { x, y } = calculateStartPosition(props.treeNode);
        const buttonProps: ButtonProps = { ...props, x, y };
        return (
            <React.Fragment>
                <GoLeft {...buttonProps} />
                <PrintVal {...buttonProps} />
                <GoRight {...buttonProps} />
                <ReturnToParent {...buttonProps} />
            </React.Fragment>
        );
    } else {
        return <React.Fragment />
    }
};

export default TreeButtonGroup;
