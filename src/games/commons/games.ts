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
import minimumNumberOfJumpsToReachEnd2 from "../dp/minimum-number-of-jumps-to-reach-end-ii/info";
import longestIncreasingSubsequence from "../dp/longest-increasing-subsequence/info";
import maximumSubarrayProblem from "../dp/maximum-subarray-problem/info";
import longestPalindromicSubsequence from "../dp/longest-palindromic-subsequence/info";
import longestPalindromicSubstring from "../dp/longest-palindromic-substring/info";
import palindromePartitioning from "../dp/palindrome-partitioning/info";
import houseRobber from "../dp/house-robber/info";
import eggDroppingProblem from "../dp/egg-dropping-problem/info";
import trappingRainWater from "../dp/trapping-rain-water/info";
import trappingRainWaterII from "../dp/trapping-rain-water-ii/info";

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
    minimumNumberOfJumpsToReachEnd,
    minimumNumberOfJumpsToReachEnd2,
    longestIncreasingSubsequence,
    maximumSubarrayProblem,
    longestPalindromicSubsequence,
    longestPalindromicSubstring,
    palindromePartitioning,
    houseRobber,
    eggDroppingProblem,
    trappingRainWater,
    trappingRainWaterII
];
