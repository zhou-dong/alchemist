import { ContentCircle } from "../../commons/circle";

interface Step extends ContentCircle<string> { }

const base: Step = {
    x: 0,
    y: 0,
    radius: 0,
    value: "",
    text: "",
    emoji: "",
    selected: false,
}

export const BasicsOfTrees: Step = {
    ...base,
    text: "Basic of Trees",
    emoji: "🌳",
}

export const TreeTraversals: Step = {
    ...base,
    text: "Tree Traversals",
    emoji: "🔍",
}

export const BST: Step = {
    ...base,
    value: "Binary Search Tree",
    text: "BST",
    emoji: "📊"
}

export const LCA: Step = {
    ...base,
    value: "Lowest Common Ancestor",
    text: "LCA",
    emoji: "🔗"
}

export const TreeHeightDiameterAndBalancing: Step = {
    ...base,
    text: "Tree Height, Diameter, and Balancing",
    emoji: "📏",
}

export const BinaryTreeRepresentation: Step = {
    ...base,
    text: "Binary Tree Representation",
    emoji: "🗂",
}

export const AdvancedTopics: Step = {
    ...base,
    text: "Advanced Topics",
    emoji: "🚀",
}

export const steps = [
    BasicsOfTrees,
    TreeTraversals,
    BST,
    LCA,
    TreeHeightDiameterAndBalancing,
    BinaryTreeRepresentation,
    AdvancedTopics,
]
