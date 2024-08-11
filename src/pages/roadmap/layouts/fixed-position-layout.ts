import CategoryType from "../../../games/commons/segments/category";
import { Category, categoryMap } from "./category";
import { CategoryCircle } from "./circle";

const buildCategoryCircle = (radius: number, categoryType: CategoryType, x: number, y: number) => {
    const category: Category = categoryMap.get(categoryType)!;
    return { ...category, x, y, radius };
}

export const getFixedTreeLayout = (canvasWidth: number, canvasHeight: number): CategoryCircle[] => {
    const marginTop = 10;
    const radius: number = (canvasHeight - 2 * marginTop) / 14;
    const centerX = canvasWidth / 2;

    return [
        buildCategoryCircle(radius, CategoryType.HashTable, centerX, marginTop + radius),
        buildCategoryCircle(radius, CategoryType.TwoPointers, centerX - 6 * radius, marginTop + 4 * radius),
        buildCategoryCircle(radius, CategoryType.Sorting, centerX + 6 * radius, marginTop + 4 * radius),
        buildCategoryCircle(radius, CategoryType.Queue, centerX, marginTop + 4 * radius),
        buildCategoryCircle(radius, CategoryType.Tree, centerX + 1.5 * radius, marginTop + 7 * radius),
        buildCategoryCircle(radius, CategoryType.Stack, centerX - 3 * radius, marginTop + 4 * radius),
        buildCategoryCircle(radius, CategoryType.LinkedList, centerX - 4.5 * radius, marginTop + 7 * radius),
        buildCategoryCircle(radius, CategoryType.BinarySearch, centerX + 3 * radius, marginTop + 4 * radius),
        buildCategoryCircle(radius, CategoryType.Recursion, centerX + 6 * radius, marginTop + 10 * radius),
        buildCategoryCircle(radius, CategoryType.DynamicProgramming, centerX + 4.5 * radius, marginTop + 13 * radius),
        buildCategoryCircle(radius, CategoryType.Heap, centerX - 3 * radius, marginTop + 10 * radius),
        buildCategoryCircle(radius, CategoryType.SegmentTree, centerX + 3 * radius, marginTop + 10 * radius),
        buildCategoryCircle(radius, CategoryType.UnionFind, centerX, marginTop + 10 * radius),
        buildCategoryCircle(radius, CategoryType.Graph, centerX - 6 * radius, marginTop + 10 * radius),
        buildCategoryCircle(radius, CategoryType.TopologicalSort, centerX - 4.5 * radius, marginTop + 13 * radius),
    ];
}

export const getFixedcompactLayout = (canvasWidth: number, canvasHeight: number): CategoryCircle[] => {
    const marginTop = 5;
    const radius: number = (canvasHeight - 2 * marginTop) / 14;
    const centerX = canvasWidth / 2;

    return [
        buildCategoryCircle(radius, CategoryType.HashTable, centerX, marginTop + radius),
        buildCategoryCircle(radius, CategoryType.TwoPointers, centerX - 6 * radius, marginTop + radius + 1.5 * radius),
        buildCategoryCircle(radius, CategoryType.Sorting, centerX + 6 * radius, marginTop + radius + 1.5 * radius),
        buildCategoryCircle(radius, CategoryType.Queue, centerX - 0.5 * radius, marginTop + radius + 3 * radius),
        buildCategoryCircle(radius, CategoryType.Tree, centerX + 1 * radius, marginTop + radius + 5 * radius),
        buildCategoryCircle(radius, CategoryType.Stack, centerX - 3 * radius, marginTop + radius + 2 * radius),
        buildCategoryCircle(radius, CategoryType.LinkedList, centerX - 3.5 * radius, marginTop + radius + 5 * radius),
        buildCategoryCircle(radius, CategoryType.BinarySearch, centerX + 2.5 * radius, marginTop + radius + 2 * radius),
        buildCategoryCircle(radius, CategoryType.Recursion, centerX + 4 * radius, marginTop + radius + 4 * radius),
        buildCategoryCircle(radius, CategoryType.DynamicProgramming, centerX + 6.5 * radius, marginTop + radius + 6 * radius),
        buildCategoryCircle(radius, CategoryType.Heap, centerX - 1.5 * radius, marginTop + radius + 6.5 * radius),
        buildCategoryCircle(radius, CategoryType.SegmentTree, centerX + 4 * radius, marginTop + radius + 7 * radius),
        buildCategoryCircle(radius, CategoryType.UnionFind, centerX + 1.5 * radius, marginTop + radius + 8 * radius),
        buildCategoryCircle(radius, CategoryType.Graph, centerX - 1 * radius, marginTop + radius + 9 * radius),
        buildCategoryCircle(radius, CategoryType.TopologicalSort, centerX - 4 * radius, marginTop + radius + 7.5 * radius),
    ];
}
