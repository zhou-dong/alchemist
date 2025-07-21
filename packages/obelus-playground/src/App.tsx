import { Routes, Route } from 'react-router-dom';
import { useDualRenderer } from './hooks/useThree';
import OrderStatisticsPage from './sketches/theta/order-statistics';
import WelcomePage from './sketches/theta/welcome/WelcomePage';
import ThemeToggleFab from './ThemeToggleFab';
import KmvPage from './sketches/theta/kmv';

const { renderer, camera } = useDualRenderer();

function App() {
  return (
    <>
      <Routes>
        <Route path="/sketches/theta/welcome" element={<WelcomePage />} />
        <Route path="/sketches/theta/order-statistics" element={<OrderStatisticsPage renderer={renderer} camera={camera} />} />
        <Route path="/sketches/theta/kmv" element={<KmvPage renderer={renderer} camera={camera} />} />
      </Routes>
      <ThemeToggleFab />
    </>
  )
};

export default App
