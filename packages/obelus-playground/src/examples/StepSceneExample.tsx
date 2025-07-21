import type { StepScene } from 'obelus';
import { renderScene } from '../../../obelus-three-render/dist';
import { StepScenePlayer, type PlayableStep } from '../../../obelus-gsap-player/dist';
import React from 'react';
import { useThreeAnimation } from '../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../hooks/useThreeAutoResize';
import { useThreeContainer } from '../hooks/useThreeContainer';
import { useRunAsyncOnce } from '../hooks/useRunAsyncOnce';
import { dslStepScene as kmvEstimateStepScene } from '../sketches/theta/kmv/order-statistics-to-kmv-dsl';
import { alignX } from '../sketches/theta/interfaces/utils';
import type { UseThreeProps } from '../utils/threeUtils';
import { Button } from '@mui/material';

let stepScene: StepScene = kmvEstimateStepScene;
// stepScene: stepScene = betaDistributionToKthValue;

export function StepSceneExample({ renderer, scene, camera }: UseThreeProps) {

  const [steps, setSteps] = React.useState<PlayableStep[]>([]);
  const [disabled, setDisabled] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const { containerRef } = useThreeContainer(renderer);
  const { startAnimation, stopAnimation } = useThreeAnimation(renderer, scene, camera);
  useThreeAutoResize(containerRef, renderer, scene, camera);

  useRunAsyncOnce(async () => {
    const objectMap = await renderScene(stepScene.objects, scene);
    alignX(objectMap);
    setSteps(
      StepScenePlayer({ objectMap, events: stepScene.steps, onStart: startAnimation, onComplete: stopAnimation })
    );
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
      <Button
        variant='contained'
        onClick={nextClick}
        sx={{ position: 'fixed', bottom: '20px', right: '20px', }}
        disabled={disabled}
      >
        play
      </Button>
      <div ref={containerRef} style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }} />
    </>
  )
}
