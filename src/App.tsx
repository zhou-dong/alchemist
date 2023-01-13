import { Route, Routes } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Home from './home';

import BubbleSortAnimation from "./games/sorting/bubble-sort/Animation";
import BubbleSortAnimationInfo from "./games/sorting/bubble-sort/info";
import SelectionSortAnimation from "./games/sorting/selection-sort/Animation";
import SelectionSortAnimationInfo from "./games/sorting/selection-sort/info";
import InsertionSortAnimation from "./games/sorting/insertion-sort/Animation";
import InsertionSortAnimationInfo from "./games/sorting/insertion-sort/info";
import EditDistance from './games/dp/edit-distance';
import EditDistanceInfo from './games/dp/edit-distance/info';
import WordBreak from './games/dp/word-break';
import WordBreakInfo from './games/dp/word-break/info';
import CoinChangeFewestNumber from "./games/dp/coin-change-fewest-number";
import CoinChangeFewestNumberInfo from "./games/dp/coin-change-fewest-number/info";
import CoinChangeHowManyWays from "./games/dp/coin-change-how-many-ways";
import CoinChangeHowManyWaysInfo from "./games/dp/coin-change-how-many-ways/info";
import LongestCommonSubsequence from "./games/dp/longest-common-subsequence";
import LongestCommonSubsequenceInfo from "./games/dp/longest-common-subsequence/info";
import LongestCommonSubstring from "./games/dp/longest-common-substring";
import LongestCommonSubstringInfo from "./games/dp/longest-common-substring/info";
import IsSubsequence from "./games/dp/is-subsequence";
import IsSubsequenceInfo from "./games/dp/is-subsequence/info";
import IsSubstring from "./games/dp/is-substring";
import IsSubstringInfo from "./games/dp/is-substring/info";
import MinimumPathSum from "./games/dp/minimum-path-sum";
import MinimumPathSumInfo from "./games/dp/minimum-path-sum/info";
import KnapsackProblem from "./games/dp/knapsack-problem";
import KnapsackProblemInfo from "./games/dp/knapsack-problem/info";
import RodCuttingProblem from "./games/dp/rod-cutting-problem";
import RodCuttingProblemInfo from "./games/dp/rod-cutting-problem/info";
import WildcardMatching from "./games/dp/wildcard-matching";
import WildcardMatchingInfo from "./games/dp/wildcard-matching/info";
import RegularExpression from "./games/dp/regular-expression";
import RegularExpressionInfo from "./games/dp/regular-expression/info";
import SubsetSumProblem from "./games/dp/subset-sum-problem";
import SubsetSumProblemInfo from "./games/dp/subset-sum-problem/info";
import MinimumNumberOfJumpsToReachEnd from "./games/dp/minimum-number-of-jumps-to-reach-end";
import MinimumNumberOfJumpsToReachEndInfo from "./games/dp/minimum-number-of-jumps-to-reach-end/info";
import MinimumNumberOfJumpsToReachEndII from "./games/dp/minimum-number-of-jumps-to-reach-end-ii";
import MinimumNumberOfJumpsToReachEndIIInfo from "./games/dp/minimum-number-of-jumps-to-reach-end-ii/info";
import LongestIncreasingSubsequence from "./games/dp/longest-increasing-subsequence";
import LongestIncreasingSubsequenceInfo from "./games/dp/longest-increasing-subsequence/info";
import MaximumSubarrayProblem from "./games/dp/maximum-subarray-problem";
import MaximumSubarrayProblemInfo from "./games/dp/maximum-subarray-problem/info";
import LongestPalindromicSubsequence from "./games/dp/longest-palindromic-subsequence";
import LongestPalindromicSubsequenceInfo from "./games/dp/longest-palindromic-subsequence/info";
import LongestPalindromicSubstring from "./games/dp/longest-palindromic-substring";
import LongestPalindromicSubstringInfo from "./games/dp/longest-palindromic-substring/info";
import PalindromePartitioning from "./games/dp/palindrome-partitioning";
import PalindromePartitioningInfo from "./games/dp/palindrome-partitioning/info";
import HouseRobber from "./games/dp/house-robber";
import HouseRobberInfo from "./games/dp/house-robber/info";
import EggDroppingProblem from "./games/dp/egg-dropping-problem";
import EggDroppingProblemInfo from "./games/dp/egg-dropping-problem/info";
import TrappingRainWater from "./games/dp/trapping-rain-water";
import TrappingRainWaterInfo from "./games/dp/trapping-rain-water/info";
import TrappingRainWaterII from "./games/two-pointer/trapping-rain-water-ii";
import TrappingRainWaterIIInfo from "./games/two-pointer/trapping-rain-water-ii/info";
import TwoSum from "./games/hash-table/two-sum";
import TwoSumInfo from "./games/hash-table/two-sum/info";
import BinaryTreeInorderTraversal from "./games/tree/binary-tree-inorder-traversal";
import BinaryTreeInorderTraversalInfo from "./games/tree/binary-tree-inorder-traversal/info";
import BinaryTreePostorderTraversal from "./games/tree/binary-tree-postorder-traversal";
import BinaryTreePostorderTraversalInfo from "./games/tree/binary-tree-postorder-traversal/info";
import BinaryTreePreorderTraversal from "./games/tree/binary-tree-preorder-traversal";
import BinaryTreePreorderTraversalInfo from "./games/tree/binary-tree-preorder-traversal/info";
import TwoThreeTreeRedBlackTree, { buildTreeData } from "./games/tree/two-three-tree_vs-red-black-tree";
import TwoThreeTreeRedBlackTreeInfo from "./games/tree/two-three-tree_vs-red-black-tree/info";
import LRU from "./games/hash-table/lru-cache";
import LRUInfo from "./games/hash-table/lru-cache/info";
import ValidParentheses from "./games/stack/valid-parentheses";
import ValidParenthesesInfo from "./games/stack/valid-parentheses/info";
import ImplementQueueUsingStacks from "./games/queue/implement-queue-using-stack";
import ImplementQueueUsingStacksInfo from "./games/queue/implement-queue-using-stack/info";
import ImplementStackUsingQueues from "./games/stack/implement-stack-using-queues";
import ImplementStackUsingQueuesInfo from "./games/stack/implement-stack-using-queues/info";
import ImplementStackUsingQueue from "./games/stack/implement-stack-using-queue";
import ImplementStackUsingQueueInfo from "./games/stack/implement-stack-using-queue/info";
import BasicCalculator from "./games/stack/basic-calculator";
import BasicCalculatorInfo from "./games/stack/basic-calculator/info";
import BasicCalculatorII from "./games/stack/basic-calculator-ii";
import BasicCalculatorIIInfo from "./games/stack/basic-calculator-ii/info";
import LongestSubstringWithoutRepeatingCharacters from "./games/sliding-window/longest-substring-without-repeating-characters";
import LongestSubstringWithoutRepeatingCharactersInfo from "./games/sliding-window/longest-substring-without-repeating-characters/info";
import ZigzagConversion from "./games/flip-direction/zigzag-conversion";
import ZigzagConversionInfo from "./games/flip-direction/zigzag-conversion/info";
import PalindromeNumber from "./games/math/palindrome-number";
import PalindromeNumberInfo from "./games/math/palindrome-number/info";
import ReverseInteger from "./games/math/reverse-integer";
import ReverseIntegerInfo from "./games/math/reverse-integer/info";
import StringToIntegerAtoi from "./games/math/string-to-integer-atoi";
import StringToIntegerAtoiInfo from "./games/math/string-to-integer-atoi/info";
import ContainerWithMostWater from "./games/two-pointer/container-with-most-water";
import ContainerWithMostWaterInfo from "./games/two-pointer/container-with-most-water/info";
import IntegerToRoman from "./games/greedy/integer-to-roman";
import IntegerToRomanInfo from "./games/greedy/integer-to-roman/info";
import RomanToInteger from "./games/math/roman-to-integer";
import RomanToIntegerInfo from "./games/math/roman-to-integer/info";
import MaximumDepthOfBinaryTree from "./games/tree/maximum-depth-of-binary-tree";
import MaximumDepthOfBinaryTreeInfo from "./games/tree/maximum-depth-of-binary-tree/info";
import MinimumDepthOfBinaryTree from "./games/tree/minimum-depth-of-binary-tree";
import MinimumDepthOfBinaryTreeInfo from "./games/tree/minimum-depth-of-binary-tree/info";
import BalancedBinaryTreeInfo from "./games/tree/balanced-binary-tree/info";
import BalancedBinaryTree from "./games/tree/balanced-binary-tree";
import ConvertSortedArrayToBinarySearchTree from "./games/tree/convert-sorted-array-to-binary-search-tree";
import ConvertSortedArrayToBinarySearchTreeInfo from "./games/tree/convert-sorted-array-to-binary-search-tree/info";
import ConvertSortedListToBinarySearchTree from "./games/tree/convert-sorted-list-to-binary-search-tree";
import ConvertSortedListToBinarySearchTreeInfo from "./games/tree/convert-sorted-list-to-binary-search-tree/info";
import ConstructBinaryTreeFromPreorderAndInorderTraversalInfo from "./games/tree/construct-binary-tree-from-preorder-and-inorder-traversal/info";
import ConstructBinaryTreeFromPreorderAndInorderTraversal from "./games/tree/construct-binary-tree-from-preorder-and-inorder-traversal";
import ConstructBinaryTreeFromInorderAndPostorderTraversalInfo from "./games/tree/construct-binary-tree-from-inorder-and-postorder-traversal/info";
import ConstructBinaryTreeFromInorderAndPostorderTraversal from "./games/tree/construct-binary-tree-from-inorder-and-postorder-traversal";
import ValidateBinarySearchTreeInfo from "./games/tree/validate-binary-search-tree/info";
import ValidateBinarySearchTree from "./games/tree/validate-binary-search-tree";
import SameTree from "./games/tree/same-tree";
import SameTreeInfo from "./games/tree/same-tree/info";
import SymmetricTree from "./games/tree/symmetric-tree";
import SymmetricTreeInfo from "./games/tree/symmetric-tree/info";
import PathSum from "./games/tree/path-sum";
import PathSumInfo from "./games/tree/path-sum/info";
import PathSumII from "./games/tree/path-sum-ii";
import PathSumIIInfo from "./games/tree/path-sum-ii/info";
import BinaryTreeRightSideView from "./games/tree/binary-tree-right-side-view";
import BinaryTreeRightSideViewInfo from "./games/tree/binary-tree-right-side-view/info";
import SumRootToLeafNumbers from "./games/tree/sum-root-to-leaf-numbers";
import SumRootToLeafNumbersInfo from "./games/tree/sum-root-to-leaf-numbers/info";
import PopulatingNextRightPointersInEachNode from "./games/tree/populating-next-right-pointers-in-each-node";
import PopulatingNextRightPointersInEachNodeInfo from "./games/tree/populating-next-right-pointers-in-each-node/info";
import PopulatingNextRightPointersInEachNodeII from "./games/tree/populating-next-right-pointers-in-each-node-ii";
import PopulatingNextRightPointersInEachNodeIIInfo from "./games/tree/populating-next-right-pointers-in-each-node-ii/info";
import LowestCommonAncestorOfaBinarySearchTree from "./games/tree/lowest-common-ancestor-of-a-binary-search-tree";
import LowestCommonAncestorOfaBinarySearchTreeInfo from "./games/tree/lowest-common-ancestor-of-a-binary-search-tree/info";
import LowestCommonAncestorOfaBinaryTree from "./games/tree/lowest-common-ancestor-of-a-binary-tree";
import LowestCommonAncestorOfaBinaryTreeInfo from "./games/tree/lowest-common-ancestor-of-a-binary-tree/info";
import KthSmallestElementInBST from "./games/tree/kth-smallest-element-in-a-bst";
import KthSmallestElementInBSTInfo from "./games/tree/kth-smallest-element-in-a-bst/info";
import SumOfLeftLeaves from "./games/tree/sum-of-left-leaves";
import SumOfLeftLeavesInfo from "./games/tree/sum-of-left-leaves/info";
import CountCompleteTreeNodes from "./games/tree/count-complete-tree-nodes";
import CountCompleteTreeNodesInfo from "./games/tree/count-complete-tree-nodes/info";
import BinaryTreePaths from "./games/tree/binary-tree-paths";
import BinaryTreePathsInfo from "./games/tree/binary-tree-paths/info";

import { createRenderer, createCamera, createScene, onWindowResize } from "./games/sorting/_commons/three";
import Logo from './commons/Logo';

const renderer = createRenderer();
const camera = createCamera();

window.addEventListener('resize', () => onWindowResize(renderer, camera), false);

const LogoContainer = styled("div")({
    position: "fixed",
    top: 0
});

const App = () => (
    <>
        <LogoContainer>
            <Logo />
        </LogoContainer>
        <Routes>
            <Route index element={<Home />} />

            <>
                <Route path={BubbleSortAnimationInfo.path} element={<BubbleSortAnimation renderer={renderer} camera={camera} scene={createScene()} values={[6, 5, 4, 3, 2, 1]} />} />
                <Route path={SelectionSortAnimationInfo.path} element={<SelectionSortAnimation renderer={renderer} camera={camera} scene={createScene()} values={[6, 5, 4, 3, 2, 1]} />} />
                <Route path={InsertionSortAnimationInfo.path} element={<InsertionSortAnimation renderer={renderer} camera={camera} scene={createScene()} values={[6, 5, 4, 3, 2, 1]} />} />
                <Route path="sorting/merge-sort" element={<div>Merge Sort</div>} />
                <Route path="sorting/quick-sort" element={<div>Quick Sort</div>} />
                <Route path="sorting/heap-sort" element={<div>Heap Sort</div>} />
                <Route path="sorting/counting-sort" element={<div>Counting Sort</div>} />
                <Route path="sorting/bucket-sort" element={<div>Bucket Sort</div>} />
                <Route path="sorting/radix-sort" element={<div>Redix Sort</div>} />
                <Route path={EditDistanceInfo.path} element={<EditDistance />} />
                <Route path={WordBreakInfo.path} element={<WordBreak />} />
                <Route path={CoinChangeFewestNumberInfo.path} element={<CoinChangeFewestNumber />} />
                <Route path={CoinChangeHowManyWaysInfo.path} element={<CoinChangeHowManyWays />} />
                <Route path={LongestCommonSubsequenceInfo.path} element={<LongestCommonSubsequence />} />
                <Route path={LongestCommonSubstringInfo.path} element={<LongestCommonSubstring />} />
                <Route path={IsSubsequenceInfo.path} element={<IsSubsequence />} />
                <Route path={IsSubstringInfo.path} element={<IsSubstring />} />
                <Route path={MinimumPathSumInfo.path} element={<MinimumPathSum />} />
                <Route path={KnapsackProblemInfo.path} element={<KnapsackProblem />} />
                <Route path={RodCuttingProblemInfo.path} element={<RodCuttingProblem />} />
                <Route path={WildcardMatchingInfo.path} element={<WildcardMatching />} />
                <Route path={RegularExpressionInfo.path} element={<RegularExpression />} />
                <Route path={SubsetSumProblemInfo.path} element={<SubsetSumProblem />} />
                <Route path={MinimumNumberOfJumpsToReachEndInfo.path} element={<MinimumNumberOfJumpsToReachEnd />} />
                <Route path={MinimumNumberOfJumpsToReachEndIIInfo.path} element={<MinimumNumberOfJumpsToReachEndII />} />
                <Route path={LongestIncreasingSubsequenceInfo.path} element={<LongestIncreasingSubsequence />} />
                <Route path={MaximumSubarrayProblemInfo.path} element={<MaximumSubarrayProblem />} />
                <Route path={LongestPalindromicSubsequenceInfo.path} element={<LongestPalindromicSubsequence />} />
                <Route path={LongestPalindromicSubstringInfo.path} element={<LongestPalindromicSubstring />} />
                <Route path={PalindromePartitioningInfo.path} element={<PalindromePartitioning />} />
                <Route path={HouseRobberInfo.path} element={<HouseRobber />} />
                <Route path={EggDroppingProblemInfo.path} element={<EggDroppingProblem />} />
                <Route path={TrappingRainWaterInfo.path} element={<TrappingRainWater />} />
                <Route path={TrappingRainWaterIIInfo.path} element={<TrappingRainWaterII />} />
                <Route path={TwoSumInfo.path} element={<TwoSum />} />
                <Route path={BinaryTreeInorderTraversalInfo.path} element={<BinaryTreeInorderTraversal />} />
                <Route path={BinaryTreePostorderTraversalInfo.path} element={<BinaryTreePostorderTraversal />} />
                <Route path={BinaryTreePreorderTraversalInfo.path} element={<BinaryTreePreorderTraversal />} />
                <Route path={TwoThreeTreeRedBlackTreeInfo.path} element={<TwoThreeTreeRedBlackTree input={buildTreeData()} />} />
                <Route path={ValidParenthesesInfo.path} element={<ValidParentheses renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={LRUInfo.path} element={<LRU />} />
                <Route path={ImplementQueueUsingStacksInfo.path} element={<ImplementQueueUsingStacks renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={ImplementStackUsingQueuesInfo.path} element={<ImplementStackUsingQueues renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={ImplementStackUsingQueueInfo.path} element={<ImplementStackUsingQueue renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={BasicCalculatorInfo.path} element={<BasicCalculator renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={BasicCalculatorIIInfo.path} element={<BasicCalculatorII renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={LongestSubstringWithoutRepeatingCharactersInfo.path} element={<LongestSubstringWithoutRepeatingCharacters />} />
                <Route path={ZigzagConversionInfo.path} element={<ZigzagConversion />} />
                <Route path={PalindromeNumberInfo.path} element={<PalindromeNumber />} />
                <Route path={ReverseIntegerInfo.path} element={<ReverseInteger />} />
                <Route path={StringToIntegerAtoiInfo.path} element={<StringToIntegerAtoi />} />
                <Route path={ContainerWithMostWaterInfo.path} element={<ContainerWithMostWater />} />
                <Route path={IntegerToRomanInfo.path} element={<IntegerToRoman />} />
                <Route path={RomanToIntegerInfo.path} element={<RomanToInteger />} />
                <Route path={MaximumDepthOfBinaryTreeInfo.path} element={<MaximumDepthOfBinaryTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={MinimumDepthOfBinaryTreeInfo.path} element={<MinimumDepthOfBinaryTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={BalancedBinaryTreeInfo.path} element={<BalancedBinaryTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={ValidateBinarySearchTreeInfo.path} element={<ValidateBinarySearchTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={SameTreeInfo.path} element={<SameTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={SymmetricTreeInfo.path} element={<SymmetricTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={PathSumInfo.path} element={<PathSum renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={PathSumIIInfo.path} element={<PathSumII renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={BinaryTreeRightSideViewInfo.path} element={<BinaryTreeRightSideView renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={SumRootToLeafNumbersInfo.path} element={<SumRootToLeafNumbers renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={PopulatingNextRightPointersInEachNodeInfo.path} element={<PopulatingNextRightPointersInEachNode renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={PopulatingNextRightPointersInEachNodeIIInfo.path} element={<PopulatingNextRightPointersInEachNodeII renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={ConvertSortedArrayToBinarySearchTreeInfo.path} element={<ConvertSortedArrayToBinarySearchTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={ConvertSortedListToBinarySearchTreeInfo.path} element={<ConvertSortedListToBinarySearchTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={ConstructBinaryTreeFromPreorderAndInorderTraversalInfo.path} element={<ConstructBinaryTreeFromPreorderAndInorderTraversal renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={ConstructBinaryTreeFromInorderAndPostorderTraversalInfo.path} element={<ConstructBinaryTreeFromInorderAndPostorderTraversal renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={LowestCommonAncestorOfaBinarySearchTreeInfo.path} element={<LowestCommonAncestorOfaBinarySearchTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={LowestCommonAncestorOfaBinaryTreeInfo.path} element={<LowestCommonAncestorOfaBinaryTree renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={KthSmallestElementInBSTInfo.path} element={<KthSmallestElementInBST renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={SumOfLeftLeavesInfo.path} element={<SumOfLeftLeaves renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={CountCompleteTreeNodesInfo.path} element={<CountCompleteTreeNodes renderer={renderer} camera={camera} scene={createScene()} />} />
                <Route path={BinaryTreePathsInfo.path} element={<BinaryTreePaths renderer={renderer} camera={camera} scene={createScene()} />} />
            </>
        </Routes>
    </>
);

export default App;
