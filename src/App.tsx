import { Route, Routes } from 'react-router-dom';
import EditDistance from './games/dp/edit-distance';
import Home from './home';

import BubbleSortAnimation from "./games/sorting/bubble-sort/Animation";
import SelectionSortAnimation from "./games/sorting/selection-sort/Animation";
import InsertionSortAnimation from "./games/sorting/insertion-sort/Animation";

import { createRenderer, createCamera, createScene, onWindowResize } from "./games/sorting/_commons/three";
import Logo from './commons/Logo';

const renderer = createRenderer();
const camera = createCamera();

window.addEventListener('resize', () => onWindowResize(renderer, camera), false);

const App = () => (
    <>
        <Logo />
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
                <Route path="dp/edit-distance" element={<EditDistance />} />
            </>
        </Routes>
    </>
);

export default App;
