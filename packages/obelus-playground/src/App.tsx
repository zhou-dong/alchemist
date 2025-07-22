import { Routes, Route } from 'react-router-dom';
import OrderStatisticsPage from './sketches/theta/steps/order-statistics';
import WelcomePage from './sketches/theta/components/welcome/WelcomePage';
import ThemeToggleFab from './ThemeToggleFab';
import KmvPage from './sketches/theta/steps/kmv';

function App() {
  return (
    <>
      <Routes>
        <Route path="/sketches/theta/welcome" element={<WelcomePage />} />
        <Route path="/sketches/theta/order-statistics" element={<OrderStatisticsPage />} />
        <Route path="/sketches/theta/kmv" element={<KmvPage />} />
      </Routes>
      <ThemeToggleFab />
    </>
  )
};

export default App
