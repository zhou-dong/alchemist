import { Content } from "../../commons/circle";

export interface Step extends Content<string> { }

const base: Step = {
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
    text: "Binary Search Tree",
    emoji: "📊"
}

export const LCA: Step = {
    ...base,
    text: "Lowest Common Ancestor",
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
