import { Game } from "./commons/game";

import bubbleSort from "./sorting/bubble-sort/info";
import insertionSort from "./sorting/insertion-sort/info";
import selectionSort from "./sorting/selection-sort/info";
import editDistance from "./dp/edit-distance/info";
import coinChangeFewestNumber from "./dp/coin-change-fewest-number/info";
import coinChangeHowManyWays from "./dp/coin-change-how-many-ways/info";
import longestCommonSubsequence from "./dp/longest-common-subsequence/info";
import longestCommonSubstring from "./dp/longest-common-substring/info";
import isSubsequence from "./dp/is-subsequence/info";
import isSubstring from "./dp/is-substring/info";
import minimumPathSum from "./dp/minimum-path-sum/info";
import rodCuttingProblem from "./dp/rod-cutting-problem/info";
import wildcardMatching from "./dp/wildcard-matching/info";
import regularExpression from "./dp/regular-expression/info";
import wordBreak from './dp/word-break/info';
import knapsackProblem from "./dp/knapsack-problem/info";
import subsetSumProblem from "./dp/subset-sum-problem/info";
import minimumNumberOfJumpsToReachEnd from "./dp/minimum-number-of-jumps-to-reach-end/info";
import minimumNumberOfJumpsToReachEnd2 from "./dp/minimum-number-of-jumps-to-reach-end-ii/info";
import longestIncreasingSubsequence from "./dp/longest-increasing-subsequence/info";
import maximumSubarrayProblem from "./dp/maximum-subarray-problem/info";
import longestPalindromicSubsequence from "./dp/longest-palindromic-subsequence/info";
import longestPalindromicSubstring from "./dp/longest-palindromic-substring/info";
import palindromePartitioning from "./dp/palindrome-partitioning/info";
import houseRobber from "./dp/house-robber/info";
import eggDroppingProblem from "./dp/egg-dropping-problem/info";
import trappingRainWater from "./dp/trapping-rain-water/info";
import trappingRainWaterII from "./two-pointer/trapping-rain-water-ii/info";
import twoSum from "./hash-table/two-sum/info";
import binaryTreeInorderTraversal from "./tree/binary-tree-inorder-traversal/info";
import binaryTreePostorderTraversal from "./tree/binary-tree-postorder-traversal/info";
import binaryTreePreorderTraversal from "./tree/binary-tree-preorder-traversal/info";
import twoThreeTreeRedBlackTree from "./tree/two-three-tree_vs-red-black-tree/info";
import LRU from "./hash-table/lru-cache/info";
import validParentheses from "./stack/valid-parentheses/info";
import ImplementQueueUsingStacks from "./queue/implement-queue-using-stack/info";
import ImplementStackUsingQueues from "./stack/implement-stack-using-queues/info";
import ImplementStackUsingQueue from "./stack/implement-stack-using-queue/info";
import BasicCalculator from "./stack/basic-calculator/info";
import BasicCalculatorII from "./stack/basic-calculator-ii/info";
import LongestSubstringWithoutRepeatingCharacters from "./sliding-window/longest-substring-without-repeating-characters/info";
import ZigzagConversion from "./flip-direction/zigzag-conversion/info";
import PalindromeNumber from "./math/palindrome-number/info";
import ReverseInteger from "./math/reverse-integer/info";
import StringToIntegerAtoi from "./math/string-to-integer-atoi/info";
import ContainerWithMostWater from "./two-pointer/container-with-most-water/info";
import IntegerToRoman from "./greedy/integer-to-roman/info";
import RomanToInteger from "./math/roman-to-integer/info";
import MaximumDepthOfBinaryTree from "./tree/maximum-depth-of-binary-tree/info";
import MinimumDepthOfBinaryTree from "./tree/minimum-depth-of-binary-tree/info";
import BalancedBinaryTree from "./tree/balanced-binary-tree/info";
import ValidateBinarySearchTree from "./tree/validate-binary-search-tree/info";
import SameTree from "./tree/same-tree/info";
import SymmetricTree from "./tree/symmetric-tree/info";
import ConvertSortedArrayToBinarySearchTree from "./tree/convert-sorted-array-to-binary-search-tree/info";
import ConstructBinaryTreeFromPreorderAndInorderTraversal from "./tree/construct-binary-tree-from-preorder-and-inorder-traversal/info";
import ConstructBinaryTreeFromInorderAndPostorderTraversal from "./tree/construct-binary-tree-from-inorder-and-postorder-traversal/info";
import PopulatingNextRightPointersInEachNode from "./tree/populating-next-right-pointers-in-each-node/info";
import PopulatingNextRightPointersInEachNodeII from "./tree/populating-next-right-pointers-in-each-node-ii/info";
import LowestCommonAncestorOfaBinarySearchTree from "./tree/lowest-common-ancestor-of-a-binary-search-tree/info";
import LowestCommonAncestorOfaBinaryTree from "./tree/lowest-common-ancestor-of-a-binary-tree/info";
import KthSmallestElementInBST from "./tree/kth-smallest-element-in-a-bst/info";

export const games: Game[] = [
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
    trappingRainWaterII,
    twoSum,
    binaryTreeInorderTraversal,
    binaryTreePostorderTraversal,
    binaryTreePreorderTraversal,
    twoThreeTreeRedBlackTree,
    bubbleSort,
    selectionSort,
    insertionSort,
    LRU,
    validParentheses,
    ImplementQueueUsingStacks,
    ImplementStackUsingQueues,
    ImplementStackUsingQueue,
    BasicCalculator,
    BasicCalculatorII,
    LongestSubstringWithoutRepeatingCharacters,
    ZigzagConversion,
    PalindromeNumber,
    ReverseInteger,
    StringToIntegerAtoi,
    ContainerWithMostWater,
    IntegerToRoman,
    RomanToInteger,
    MaximumDepthOfBinaryTree,
    MinimumDepthOfBinaryTree,
    BalancedBinaryTree,
    ValidateBinarySearchTree,
    ConvertSortedArrayToBinarySearchTree,
    SameTree,
    SymmetricTree,
    PopulatingNextRightPointersInEachNode,
    PopulatingNextRightPointersInEachNodeII,
    ConstructBinaryTreeFromPreorderAndInorderTraversal,
    ConstructBinaryTreeFromInorderAndPostorderTraversal,
    LowestCommonAncestorOfaBinarySearchTree,
    LowestCommonAncestorOfaBinaryTree,
    KthSmallestElementInBST
];
