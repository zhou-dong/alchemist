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
    text: "Basics",
    emoji: "Tree",
}

const BinaryTree: Step = {
    ...base,
    value: "Tree Traversals",
    text: "Tree",
    emoji: "Binary",
}

const TreeTraversals: Step = {
    ...base,
    value: "Tree Traversals",
    text: "Traversals",
    emoji: "Tree",
}

const BST: Step = {
    ...base,
    value: "Binary Search Tree",
    text: "BST",
    emoji: "🔍"
}

const TreeHeight: Step = {
    ...base,
    text: "Height",
    emoji: "Tree",
}

const TreeDiameter: Step = {
    ...base,
    text: "Diameter",
    emoji: "Tree",
}

const TreeBalancing: Step = {
    ...base,
    text: "Balance",
    emoji: "Tree",
}

const LCA: Step = {
    ...base,
    value: "Lowest Common Ancestor",
    text: "LCA",
    emoji: "👥"
}

const AdvancedTopics: Step = {
    ...base,
    text: "Topics",
    emoji: "Advanced",
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
