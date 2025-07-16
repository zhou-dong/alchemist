import { StepSceneExample } from './examples/StepSceneExample';
import { TimelineSceneExample } from './examples/TimelineSceneExample';
import { useThree } from './hooks/useThree';
import WelcomePage from './sketches/theta/WelcomePage';
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
      <WelcomePage />
      <ThemeToggleFab />
    </>
  )
}

export default App
