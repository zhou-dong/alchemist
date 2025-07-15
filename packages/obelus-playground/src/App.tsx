import { StepSceneExample } from './examples/StepSceneExample';
import { TimelineSceneExample } from './examples/TimelineSceneExample';
import { useThree } from './hooks/useThree';

const StepScene = () => {
  const { renderer, scene, camera } = useThree();
  return (
    <StepSceneExample renderer={renderer} scene={scene} camera={camera} />
  )
}

function App() {

  return (
    <>
      {/* <TimelineSceneExample /> */}
      <StepScene />
    </>
  )
}

export default App
