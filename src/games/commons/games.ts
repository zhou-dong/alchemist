import { Game } from "./game";
import Category from "./segments/category";
import Company from "./segments/company";
import Difficulty from "./segments/difficulty";

export const games: Game[] = [
    {
        name: "Bobble Sort",
        path: "/sorting/bubble-sort",
        categories: [Category.Sorting],
        companies: [],
        difficulties: [Difficulty.Easy],
    },
    {
        name: "Selection Sort",
        path: "/sorting/selection-sort",
        categories: [Category.Sorting],
        companies: [],
        difficulties: [],
    },
    {
        name: "Merge Sort",
        path: "/sorting/merge-sort",

        categories: [Category.Sorting],
        companies: [],
        difficulties: [],
    },
    {
        name: "Insertion Sort",
        path: "/sorting/insertion-sort",
        categories: [Category.Sorting],
        companies: [],
        difficulties: [],
    },
    {
        name: "Quick Sort",
        path: "/sorting/quick-sort",

        categories: [Category.Sorting],
        companies: [],
        difficulties: [],
    },
    {
        name: "Heap Sort",
        path: "/sorting/heap-sort",

        categories: [Category.Sorting],
        companies: [],
        difficulties: [],
    },
    {
        name: "Counting Sort",
        path: "/sorting/counting-sort",
        categories: [Category.Sorting],
        companies: [],
        difficulties: [],
    },
    {
        name: "Bucket Sort",
        path: "/sorting/bucket-sort",
        categories: [Category.Sorting],
        companies: [],
        difficulties: [],
    },
    {
        name: "Radix Sort",
        path: "/sorting/radix-sort",
        categories: [Category.Sorting],
        companies: [],
        difficulties: [],
    },
    {
        name: "Edit Distance",
        path: "/dp/edit-distance",
        categories: [Category.DynamicProgramming],
        companies: [Company.Google],
        difficulties: [Difficulty.Hard],
    },
];
