export enum CategoryType {
    Heap = "Heap",
    Stack = "Stack",
    Queue = "Queue",
    Sorting = "Sorting",
    Tree = "Tree",
    SegmentTree = "Segment Tree",
    UnionFind = "Union Find",
    BinarySearch = "Binary Search",
    TwoPointers = "Two Pointers",
    DP = "DP",
    Graph = "Graph",
    Recursion = "Recursion",
    LinkedList = "Linked List",
    HashTable = "Hash Table",
    TopologicalSort = "Topological Sort",
}

export interface Category {
    categoryType: CategoryType;
    emoji: string;
}

export const categories: Category[] = [
    { categoryType: CategoryType.Heap, emoji: "⏳" },
    { categoryType: CategoryType.Stack, emoji: "📚" },
    { categoryType: CategoryType.Queue, emoji: "🚶‍♂️🚶‍♂️" },
    { categoryType: CategoryType.Sorting, emoji: "🔄" },
    { categoryType: CategoryType.Tree, emoji: "🌳" },
    { categoryType: CategoryType.SegmentTree, emoji: "🌲" },
    { categoryType: CategoryType.UnionFind, emoji: "🔗" },
    { categoryType: CategoryType.BinarySearch, emoji: "🔍" },
    { categoryType: CategoryType.TwoPointers, emoji: "➡️➡️" },
    { categoryType: CategoryType.DP, emoji: "🧩" },
    { categoryType: CategoryType.Graph, emoji: "🌐" },
    { categoryType: CategoryType.Recursion, emoji: "🌀" },
    { categoryType: CategoryType.LinkedList, emoji: "🖇️" },
    { categoryType: CategoryType.HashTable, emoji: "🗂️" },
    { categoryType: CategoryType.TopologicalSort, emoji: "🔣" },
];
