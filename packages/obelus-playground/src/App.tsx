import { Routes, Route } from 'react-router-dom';
import { useDualRenderer } from './hooks/useThree';
import OrderStatisticsPage from './sketches/theta/order-statistics';
import WelcomePage from './sketches/theta/welcome/WelcomePage';
import ThemeToggleFab from './ThemeToggleFab';
import KmvPage from './sketches/theta/kmv';
import { DualScene } from 'obelus-three-render';

const { renderer, camera } = useDualRenderer();

function App() {
  return (
    <>
      <Routes>
        <Route path="/sketches/theta/welcome" element={<WelcomePage />} />
        <Route path="/sketches/theta/order-statistics" element={<OrderStatisticsPage renderer={renderer} scene={new DualScene()} camera={camera} />} />
        <Route path="/sketches/theta/kmv" element={<KmvPage renderer={renderer} scene={new DualScene()} camera={camera} />} />
      </Routes>
      <ThemeToggleFab />
    </>
  )
};

export default App
