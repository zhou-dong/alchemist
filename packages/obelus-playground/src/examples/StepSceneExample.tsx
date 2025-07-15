import { initThree } from './threeUtils';
import type { StepScene } from '../../../obelus/dist';
import { renderScene } from '../../../obelus-three-render/dist';
import { StepScenePlayer, type PlayableStep } from '../../../obelus-gsap-player/dist';
import React from 'react';
import { useThreeAnimation } from '../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../hooks/useThreeAutoResize';
import { useThreeContainer } from '../hooks/useThreeContainer';
import { useRunAsyncOnce } from '../hooks/useRunAsyncOnce';
import { stepScene as kmvEstimateStepScene } from '../sketches/theta/kmv/kmv-estimate-steps-scene';
import { alignX } from '../sketches/theta/interfaces/utils';

const buttonStyle = {
  bottom: '20px',    // Positions the button 20px from the bottom
  right: '20px',     // Positions the button 20px from the right
  backgroundColor: '#007bff',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: '1000',    // Ensure the button is on top
};

let stepScene: StepScene = kmvEstimateStepScene;
// stepScene: stepScene = betaDistributionToKthValue;

const { renderer, scene, camera } = initThree()

export function StepSceneExample() {

  const [steps, setSteps] = React.useState<PlayableStep[]>([]);
  const [disabled, setDisabled] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const { containerRef } = useThreeContainer(renderer);
  const { startAnimation, stopAnimation } = useThreeAnimation(renderer, scene, camera);
  useThreeAutoResize(containerRef, renderer, scene, camera);
  useRunAsyncOnce(async () => {
    const objectMap = await renderScene(stepScene.objects, scene);
    alignX(objectMap);
    const steps = StepScenePlayer({ objectMap, events: stepScene.steps, onStart: startAnimation, onComplete: stopAnimation });
    setSteps(steps);
  });

  const nextClick = async () => {
    setDisabled(true);
    await steps[index].play();

    if (index === steps.length - 1) return;

    setIndex(index + 1);
    setDisabled(false);
  }

  return (
    <>
      <button
        onClick={nextClick}
        style={{ ...buttonStyle, position: 'fixed' }}
        disabled={disabled}
      >
        play
      </button>
      <div ref={containerRef} style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }} />
    </>
  )
}
