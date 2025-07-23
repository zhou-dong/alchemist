import { Routes, Route } from 'react-router-dom';
import ThemeToggleFab from './ThemeToggleFab';
import WelcomePage from './sketches/theta/components/welcome/WelcomePage';
import OrderStatisticsPage from './sketches/theta/steps/order-statistics';
import KthSmallestEstimationPage from './sketches/theta/steps/kth-smallest-estimation';
import ThetaSketchPage from './sketches/theta/steps/theta-sketch';

function App() {
  return (
    <>
      <Routes>
        <Route path="/sketches/theta/welcome" element={<WelcomePage />} />
        <Route path="/sketches/theta/order-statistics" element={<OrderStatisticsPage />} />
        <Route path="/sketches/theta/kth-smallest-estimation" element={<KthSmallestEstimationPage />} />
        <Route path="/sketches/theta/theta-sketch" element={<ThetaSketchPage />} />
      </Routes>
      <ThemeToggleFab />
    </>
  )
};

export default App
