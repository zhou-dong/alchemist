import CategoryType from "../../../games/commons/segments/category";

export interface Category {
    categoryType: CategoryType;
    emoji: string;
    selected: boolean;
}

export const categories: Category[] = [
    { categoryType: CategoryType.Heap, emoji: "⏳", selected: false },
    { categoryType: CategoryType.Stack, emoji: "📚", selected: false },
    { categoryType: CategoryType.Queue, emoji: "🚶‍♂️🚶‍♂️", selected: false },
    { categoryType: CategoryType.Sorting, emoji: "🔄", selected: false },
    { categoryType: CategoryType.Tree, emoji: "🌳", selected: false },
    { categoryType: CategoryType.SegmentTree, emoji: "🌲", selected: false },
    { categoryType: CategoryType.UnionFind, emoji: "🔗", selected: false },
    { categoryType: CategoryType.BinarySearch, emoji: "🔍", selected: false },
    { categoryType: CategoryType.TwoPointers, emoji: "➡️➡️", selected: false },
    { categoryType: CategoryType.DynamicProgramming, emoji: "🧩", selected: false },
    { categoryType: CategoryType.Graph, emoji: "🌐", selected: false },
    { categoryType: CategoryType.Recursion, emoji: "🌀", selected: false },
    { categoryType: CategoryType.LinkedList, emoji: "🖇️", selected: false },
    { categoryType: CategoryType.HashTable, emoji: "🗂️", selected: false },
    { categoryType: CategoryType.TopologicalSort, emoji: "🔣", selected: false },
];

export const categoryMap: Map<CategoryType, Category> = new Map<CategoryType, Category>(
    categories.map(category => [category.categoryType, category])
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
