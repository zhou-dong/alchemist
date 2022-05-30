import { Route, Routes } from 'react-router-dom';
import EditDistance from './games/dp/edit-distance';
import Home from './home';

import BubbleSortAnimation from "./games/sorting/bubble-sort/Animation";

const App = () => (
    <Routes>
        <Route index element={<Home />} />

        <>
            <Route path="sorting/bubble-sort" element={<BubbleSortAnimation />} />
            <Route path="sorting/selection-sort" element={<div>Selection Sort</div>} />
            <Route path="sorting/merge-sort" element={<div>Merge Sort</div>} />
            <Route path="sorting/insertion-sort" element={<div>Insertion Sort</div>} />
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
);

export default App;
