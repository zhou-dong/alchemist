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

const BasicsOfTrees: Step = {
    ...base,
    value: "Basic of Trees",
    text: "Tree Basics",
    emoji: "🌳",
}

const BinaryTree: Step = {
    ...base,
    value: "Tree Traversals",
    text: "Binary Tree",
    emoji: "🌲",
}

const TreeTraversals: Step = {
    ...base,
    value: "Tree Traversals",
    text: "Traversals",
    emoji: "🧭",
}

const BST: Step = {
    ...base,
    value: "Binary Search Tree",
    text: "BST",
    emoji: "🔍"
}

const TreeHeight: Step = {
    ...base,
    text: "Tree Height",
    emoji: "📏",
}

const TreeDiameter: Step = {
    ...base,
    text: "Tree Diameter",
    emoji: "📐",
}

const TreeBalancing: Step = {
    ...base,
    text: "Tree Balance",
    emoji: "⚖️",
}

const LCA: Step = {
    ...base,
    value: "Lowest Common Ancestor",
    text: "LCA",
    emoji: "👥"
}

const AdvancedTopics: Step = {
    ...base,
    text: "Advanced Topics",
    emoji: "🚀",
}

export const steps = [
    BasicsOfTrees,
    BinaryTree,
    TreeTraversals,
    BST,
    TreeHeight,
    TreeDiameter,
    TreeBalancing,
    LCA,
    AdvancedTopics,
]
