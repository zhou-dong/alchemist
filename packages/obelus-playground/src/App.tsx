import { Routes, Route } from 'react-router-dom';
import { StepSceneExample } from './examples/StepSceneExample';
import { TimelineSceneExample } from './examples/TimelineSceneExample';
import { useThree } from './hooks/useThree';
import OrderStatisticsPage from './sketches/theta/order-statistics';
import WelcomePage from './sketches/theta/WelcomePage';
import ThemeToggleFab from './ThemeToggleFab';
import { useState } from 'react';
import ProgressStepperWrapper from './sketches/theta/ProgressStepperWrapper';
import StepperToggleFab from './sketches/theta/ProgressStepperToggleFab';

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

  const [showStepper, setShowStepper] = useState(true);

  return (
    <>
      {showStepper && <ProgressStepperWrapper />}
      <Routes>
        <Route path="/sketches/theta" element={<WelcomePage />} />
        <Route path="/sketches/theta/order-statistics" element={<OrderStatisticsPage />} />
      </Routes>
      <ThemeToggleFab />
      <StepperToggleFab
        visible={showStepper}
        onToggle={() => setShowStepper((prev) => !prev)}
      />
    </>
  )
};

export default App
