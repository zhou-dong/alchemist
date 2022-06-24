import { Game } from "./game";

import bubbleSort from "../sorting/bubble-sort/info";
import insertionSort from "../sorting/insertion-sort/info";
import selectionSort from "../sorting/selection-sort/info";
import editDistance from "../dp/edit-distance/info";

export const games: Game[] = [
    bubbleSort,
    selectionSort,
    insertionSort,
    editDistance,
];
