import { Game } from "./game";

import bubbleSort from "../sorting/bubble-sort/info";
import insertionSort from "../sorting/insertion-sort/info";
import selectionSort from "../sorting/selection-sort/info";
import editDistance from "../dp/edit-distance/info";
import coinChangeFewestNumber from "../dp/coin-change-fewest-number/info";
import coinChangeHowManyWays from "../dp/coin-change-how-many-ways/info";
import longestCommonSubsequence from "../dp/longest-common-subsequence/info";
import longestCommonSubstring from "../dp/longest-common-substring/info";

export const games: Game[] = [
    bubbleSort,
    selectionSort,
    insertionSort,
    editDistance,
    coinChangeFewestNumber,
    coinChangeHowManyWays,
    longestCommonSubsequence,
    longestCommonSubstring,
];
