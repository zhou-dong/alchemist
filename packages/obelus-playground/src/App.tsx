import { Routes, Route } from 'react-router-dom';
import { StepSceneExample } from './examples/StepSceneExample';
import { TimelineSceneExample } from './examples/TimelineSceneExample';
import { useThree } from './hooks/useThree';
import OrderStatisticsPage from './sketches/theta/order-statistics';
import WelcomePage from './sketches/theta/welcome/WelcomePage';
import ThemeToggleFab from './ThemeToggleFab';

const { renderer, camera } = useThree();
const StepScene = () => {
  const { scene } = useThree();
  return (
    <StepSceneExample renderer={renderer} scene={scene} camera={camera} />
  )
}

const TimelineScene = () => {
  const { scene } = useThree();
  return (
    <TimelineSceneExample renderer={renderer} scene={scene} camera={camera} />
  )
}

const displayScene = "timeline";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sketches/theta/welcome" element={<WelcomePage />} />
        <Route path="/sketches/theta/order-statistics" element={<OrderStatisticsPage />} />
      </Routes>
      <ThemeToggleFab />
    </>
  )
};

export default App
