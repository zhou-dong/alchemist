import { Game } from "./game";

import bubbleSort from "../sorting/bubble-sort/info";
import insertionSort from "../sorting/insertion-sort/info";
import selectionSort from "../sorting/selection-sort/info";
import editDistance from "../dp/edit-distance/info";
import coinChangeFewestNumber from "../dp/coin-change-fewest-number/info";
import coinChangeHowManyWays from "../dp/coin-change-how-many-ways/info";
import longestCommonSubsequence from "../dp/longest-common-subsequence/info";
import longestCommonSubstring from "../dp/longest-common-substring/info";
import isSubsequence from "../dp/is-subsequence/info";
import isSubstring from "../dp/is-substring/info";
import minimumPathSum from "../dp/minimum-path-sum/info";
import rodCuttingProblem from "../dp/rod-cutting-problem/info";
import wildcardMatching from "../dp/wildcard-matching/info";
import regularExpression from "../dp/regular-expression/info";
import wordBreak from '../dp/word-break/info';
import knapsackProblem from "../dp/knapsack-problem/info";
import subsetSumProblem from "../dp/subset-sum-problem/info";
import minimumNumberOfJumpsToReachEnd from "../dp/minimum-number-of-jumps-to-reach-end/info";

export const games: Game[] = [
    bubbleSort,
    selectionSort,
    insertionSort,
    editDistance,
    coinChangeFewestNumber,
    coinChangeHowManyWays,
    longestCommonSubsequence,
    longestCommonSubstring,
    isSubsequence,
    isSubstring,
    minimumPathSum,
    rodCuttingProblem,
    wildcardMatching,
    regularExpression,
    wordBreak,
    knapsackProblem,
    subsetSumProblem,
    minimumNumberOfJumpsToReachEnd
];
