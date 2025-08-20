import CategoryType from "../../../games/commons/segments/category";
import { Content } from "../../commons/circle";

export const categories: Content<CategoryType>[] = [
    { value: CategoryType.Heap, emoji: "⏳", selected: false, text: CategoryType.Heap.toString() },
    { value: CategoryType.Stack, emoji: "📚", selected: false, text: CategoryType.Stack.toString() },
    { value: CategoryType.Queue, emoji: "🚶‍♂️🚶‍♂️", selected: false, text: CategoryType.Queue.toString() },
    { value: CategoryType.Sorting, emoji: "🔄", selected: false, text: CategoryType.Sorting.toString() },
    { value: CategoryType.Tree, emoji: "🌳", selected: false, text: CategoryType.Tree.toString() },
    { value: CategoryType.SegmentTree, emoji: "🌲", selected: false, text: CategoryType.SegmentTree.toString() },
    { value: CategoryType.UnionFind, emoji: "🔗", selected: false, text: CategoryType.UnionFind.toString() },
    { value: CategoryType.BinarySearch, emoji: "🔍", selected: false, text: CategoryType.BinarySearch.toString() },
    { value: CategoryType.TwoPointers, emoji: "➡️➡️", selected: false, text: CategoryType.TwoPointers.toString() },
    { value: CategoryType.DynamicProgramming, emoji: "🧩", selected: false, text: CategoryType.DynamicProgramming.toString() },
    { value: CategoryType.Graph, emoji: "🌐", selected: false, text: CategoryType.Graph.toString() },
    { value: CategoryType.Recursion, emoji: "🌀", selected: false, text: CategoryType.Recursion.toString() },
    { value: CategoryType.LinkedList, emoji: "🖇️", selected: false, text: CategoryType.LinkedList.toString() },
    { value: CategoryType.HashTable, emoji: "🗂️", selected: false, text: CategoryType.HashTable.toString() },
    { value: CategoryType.TopologicalSort, emoji: "🔣", selected: false, text: CategoryType.TopologicalSort.toString() },
];

export const categoryMap: Map<CategoryType, Content<CategoryType>> = new Map<CategoryType, Content<CategoryType>>(
    categories.map(category => [category.value, category])
);

export const connections: CategoryType[][] = [
    [CategoryType.HashTable, CategoryType.Sorting],
    [CategoryType.HashTable, CategoryType.Stack],
    [CategoryType.HashTable, CategoryType.Queue],
    [CategoryType.HashTable, CategoryType.TwoPointers],
    [CategoryType.TwoPointers, CategoryType.LinkedList],

    [CategoryType.LinkedList, CategoryType.Tree],

    [CategoryType.HashTable, CategoryType.BinarySearch],
    [CategoryType.BinarySearch, CategoryType.Tree],
    [CategoryType.Stack, CategoryType.LinkedList],
    [CategoryType.Queue, CategoryType.LinkedList],
    [CategoryType.Tree, CategoryType.SegmentTree],
    [CategoryType.Tree, CategoryType.Heap],
    [CategoryType.Tree, CategoryType.UnionFind],
    [CategoryType.Recursion, CategoryType.DynamicProgramming],
    [CategoryType.Graph, CategoryType.TopologicalSort],
    [CategoryType.Tree, CategoryType.Recursion],
    [CategoryType.Tree, CategoryType.Graph],
]
