import { Route, Routes } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Home from './home';

import BubbleSortAnimation from "./games/sorting/bubble-sort/Animation";
import SelectionSortAnimation from "./games/sorting/selection-sort/Animation";
import InsertionSortAnimation from "./games/sorting/insertion-sort/Animation";

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

import RodCuttingProblem from "./games/dp/rod-cutting-problem";
import RodCuttingProblemInfo from "./games/dp/rod-cutting-problem/info";

import WildcardMatching from "./games/dp/wildcard-matching";
import WildcardMatchingInfo from "./games/dp/wildcard-matching/info";
import RegularExpression from "./games/dp/regular-expression";
import RegularExpressionInfo from "./games/dp/regular-expression/info";

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
                <Route path="sorting/bubble-sort" element={<BubbleSortAnimation renderer={renderer} camera={camera} scene={createScene()} values={[6, 5, 4, 3, 2, 1]} />} />
                <Route path="sorting/selection-sort" element={<SelectionSortAnimation renderer={renderer} camera={camera} scene={createScene()} values={[6, 5, 4, 3, 2, 1]} />} />
                <Route path="sorting/insertion-sort" element={<InsertionSortAnimation renderer={renderer} camera={camera} scene={createScene()} values={[6, 5, 4, 3, 2, 1]} />} />
                <Route path="sorting/merge-sort" element={<div>Merge Sort</div>} />
                <Route path="sorting/quick-sort" element={<div>Quick Sort</div>} />
                <Route path="sorting/heap-sort" element={<div>Heap Sort</div>} />
                <Route path="sorting/counting-sort" element={<div>Counting Sort</div>} />
                <Route path="sorting/bucket-sort" element={<div>Bucket Sort</div>} />
                <Route path="sorting/radix-sort" element={<div>Redix Sort</div>} />
            </>

            <>
                <Route path={EditDistanceInfo.path} element={<EditDistance />} />
                <Route path={WordBreakInfo.path} element={<WordBreak />} />
                <Route path={CoinChangeFewestNumberInfo.path} element={<CoinChangeFewestNumber />} />
                <Route path={CoinChangeHowManyWaysInfo.path} element={<CoinChangeHowManyWays />} />
                <Route path={LongestCommonSubsequenceInfo.path} element={<LongestCommonSubsequence />} />
                <Route path={LongestCommonSubstringInfo.path} element={<LongestCommonSubstring />} />
                <Route path={IsSubsequenceInfo.path} element={<IsSubsequence />} />
                <Route path={IsSubstringInfo.path} element={<IsSubstring />} />
                <Route path={MinimumPathSumInfo.path} element={<MinimumPathSum />} />
                <Route path={RodCuttingProblemInfo.path} element={<RodCuttingProblem />} />
                <Route path={WildcardMatchingInfo.path} element={<WildcardMatching />} />
                <Route path={RegularExpressionInfo.path} element={<RegularExpression />} />
            </>
        </Routes>
    </>
);

export default App;
