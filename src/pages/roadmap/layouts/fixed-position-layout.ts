import { Category, categoryMap, CategoryType } from "./category";
import { CategoryCircle } from "./circle";

const buildCategoryCircle = (categoryType: CategoryType, x: number, y: number) => {
    const radius: number = 70; // TODO
    const category: Category = categoryMap.get(categoryType)!;
    return { ...category, x, y, radius };
}

export const getFixedTreeLayout = (canvasWidth: number, canvasHeight: number): CategoryCircle[] => {
    const radius: number = 60; // TODO

    const centerX = canvasWidth / 2;

    const marginTop = 20;

    return [
        buildCategoryCircle(CategoryType.HashTable, centerX, marginTop + radius),
        buildCategoryCircle(CategoryType.TwoPointers, centerX - 6 * radius, marginTop + 4 * radius),
        buildCategoryCircle(CategoryType.Sorting, centerX + 6 * radius, marginTop + 4 * radius),
        buildCategoryCircle(CategoryType.Queue, centerX, marginTop + 4 * radius),
        buildCategoryCircle(CategoryType.Tree, centerX + 1.5 * radius, marginTop + 7 * radius),
        buildCategoryCircle(CategoryType.Stack, centerX - 3 * radius, marginTop + radius + 3 * radius),
        buildCategoryCircle(CategoryType.LinkedList, centerX - 4.5 * radius, marginTop + 7 * radius),
        buildCategoryCircle(CategoryType.BinarySearch, centerX + 3 * radius, marginTop + 4 * radius),
        buildCategoryCircle(CategoryType.Recursion, centerX + 6 * radius, marginTop + radius + 9 * radius),
        buildCategoryCircle(CategoryType.DP, centerX + 4.5 * radius, marginTop + radius + 12 * radius),
        buildCategoryCircle(CategoryType.Heap, centerX - 3 * radius, marginTop + 10 * radius),
        buildCategoryCircle(CategoryType.SegmentTree, centerX + 3 * radius, marginTop + 10 * radius),
        buildCategoryCircle(CategoryType.UnionFind, centerX, marginTop + 10 * radius),
        buildCategoryCircle(CategoryType.Graph, centerX - 6 * radius, marginTop + radius + 9 * radius),
        buildCategoryCircle(CategoryType.TopologicalSort, centerX - 4.5 * radius, marginTop + radius + 12 * radius),
    ];
}


export const getFixedcompactLayout = (canvasWidth: number, canvasHeight: number): CategoryCircle[] => {
    const radius: number = 60;

    const centerX = canvasWidth / 2;

    const marginTop = 20;

    return [
        buildCategoryCircle(CategoryType.HashTable, centerX, marginTop + radius),
        buildCategoryCircle(CategoryType.TwoPointers, centerX - 6 * radius, marginTop + radius + 1.5 * radius),
        buildCategoryCircle(CategoryType.Sorting, centerX + 6 * radius, marginTop + radius + 1.5 * radius),
        buildCategoryCircle(CategoryType.Queue, centerX - 0.5 * radius, marginTop + radius + 3 * radius),
        buildCategoryCircle(CategoryType.Tree, centerX + 1 * radius, marginTop + radius + 5 * radius),
        buildCategoryCircle(CategoryType.Stack, centerX - 3 * radius, marginTop + radius + 2 * radius),
        buildCategoryCircle(CategoryType.LinkedList, centerX - 3.5 * radius, marginTop + radius + 5 * radius),
        buildCategoryCircle(CategoryType.BinarySearch, centerX + 2.5 * radius, marginTop + radius + 2 * radius),
        buildCategoryCircle(CategoryType.Recursion, centerX + 4 * radius, marginTop + radius + 4 * radius),
        buildCategoryCircle(CategoryType.DP, centerX + 6.5 * radius, marginTop + radius + 6 * radius),
        buildCategoryCircle(CategoryType.Heap, centerX - 1.5 * radius, marginTop + radius + 6.5 * radius),
        buildCategoryCircle(CategoryType.SegmentTree, centerX + 4 * radius, marginTop + radius + 7 * radius),
        buildCategoryCircle(CategoryType.UnionFind, centerX + 1.5 * radius, marginTop + radius + 8 * radius),
        buildCategoryCircle(CategoryType.Graph, centerX - 1 * radius, marginTop + radius + 9 * radius),
        buildCategoryCircle(CategoryType.TopologicalSort, centerX - 4 * radius, marginTop + radius + 7.5 * radius),
    ];
}
