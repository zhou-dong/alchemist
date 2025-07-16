import * as THREE from 'three';
import { Routes, Route } from 'react-router-dom';
import { useThree } from './hooks/useThree';
import OrderStatisticsPage from './sketches/theta/order-statistics';
import WelcomePage from './sketches/theta/welcome/WelcomePage';
import ThemeToggleFab from './ThemeToggleFab';
import KmvPage from './sketches/theta/kmv';

const { renderer, camera } = useThree();

function App() {
  return (
    <>
      <Routes>
        <Route path="/sketches/theta/welcome" element={<WelcomePage />} />
        <Route path="/sketches/theta/order-statistics" element={<OrderStatisticsPage renderer={renderer} scene={new THREE.Scene()} camera={camera} />} />
        <Route path="/sketches/theta/kmv" element={<KmvPage renderer={renderer} scene={new THREE.Scene()} camera={camera} />} />
      </Routes>
      <ThemeToggleFab />
    </>
  )
};

export default App
