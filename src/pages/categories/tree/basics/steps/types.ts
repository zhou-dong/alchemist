import React from "react";

export interface StepProps {
    containerRef: React.RefObject<HTMLDivElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}

export enum Step {
    FIND_ROOT = "FIND_ROOT",
    FIND_LEAFS = "FIND_LEAFS", 
    FIND_PARENT = "FIND_PARENT",
    FIND_CHILDREN = "FIND_CHILDREN",
    TREE_HEIGHT = "TREE_HEIGHT",
    PREORDER_TRAVERSAL = "PREORDER_TRAVERSAL",
    INORDER_TRAVERSAL = "INORDER_TRAVERSAL",
    POSTORDER_TRAVERSAL = "POSTORDER_TRAVERSAL",
}

export const stepNames = {
    [Step.FIND_ROOT]: "Find Root",
    [Step.FIND_LEAFS]: "Find Leaves", 
    [Step.FIND_PARENT]: "Find Parent",
    [Step.FIND_CHILDREN]: "Find Children",
    [Step.TREE_HEIGHT]: "Tree Height",
    [Step.PREORDER_TRAVERSAL]: "Preorder Traversal",
    [Step.INORDER_TRAVERSAL]: "Inorder Traversal",
    [Step.POSTORDER_TRAVERSAL]: "Postorder Traversal"
};

export const stepNumber = (currentStep: Step): number => {
    return Object.keys(stepNames).indexOf(currentStep.toString()) + 1;
};

export const totalSteps = Object.keys(stepNames).length;
