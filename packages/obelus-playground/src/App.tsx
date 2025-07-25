import { Routes, Route } from 'react-router-dom';
import ThemeToggleFab from './ThemeToggleFab';
import WelcomePage from './sketches/theta/components/welcome/WelcomePage';
import OrderStatisticsPage from './sketches/theta/steps/order-statistics';
import KsePage from './sketches/theta/steps/kse';
import KmvPage from './sketches/theta/steps/kmv';
import ThetaSketchPage from './sketches/theta/steps/theta-sketch';
import SetOperationsPage from './sketches/theta/steps/set-operations';

function App() {
  return (
    <>
      <Routes>
        <Route path="/sketches/theta/welcome" element={<WelcomePage />} />
        <Route path="/sketches/theta/order-statistics" element={<OrderStatisticsPage />} />
        <Route path="/sketches/theta/kse" element={<KsePage />} />
        <Route path="/sketches/theta/kmv" element={<KmvPage />} />
        <Route path="/sketches/theta/set-operations" element={<SetOperationsPage />} />
        <Route path="/sketches/theta/theta-sketch" element={<ThetaSketchPage />} />
      </Routes>
      <ThemeToggleFab />
    </>
  )
};

export default App
