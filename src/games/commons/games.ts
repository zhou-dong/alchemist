import { Game } from "./game";
import Category from "./segments/category";

import bubbleSort from "../sorting/bubble-sort/info";
import insertionSort from "../sorting/insertion-sort/info";
import selectionSort from "../sorting/selection-sort/info";
import editDistance from "../dp/edit-distance/info";
import Difficulty from "./segments/difficulty";

export const games: Game[] = [
    bubbleSort,
    selectionSort,
    insertionSort,
    {
        name: "Merge Sort",
        path: "/sorting/merge-sort",

        categories: [Category.Sorting],
        companies: [],
        difficulty: Difficulty.Easy,
        img: "img/edit_distance"
    },
    {
        name: "Quick Sort",
        path: "/sorting/quick-sort",

        categories: [Category.Sorting],
        companies: [],
        difficulty: Difficulty.Easy,
        img: "img/edit_distance"
    },
    {
        name: "Heap Sort",
        path: "/sorting/heap-sort",

        categories: [Category.Sorting],
        companies: [],
        difficulty: Difficulty.Easy,
        img: "img/edit_distance"
    },
    {
        name: "Counting Sort",
        path: "/sorting/counting-sort",
        categories: [Category.Sorting],
        companies: [],
        difficulty: Difficulty.Easy,
        img: "img/edit_distance"
    },
    {
        name: "Bucket Sort",
        path: "/sorting/bucket-sort",
        categories: [Category.Sorting],
        companies: [],
        difficulty: Difficulty.Easy,
        img: "img/edit_distance"
    },
    {
        name: "Radix Sort",
        path: "/sorting/radix-sort",
        categories: [Category.Sorting],
        companies: [],
        difficulty: Difficulty.Easy,
        img: "img/edit_distance"
    },
    editDistance,
];
