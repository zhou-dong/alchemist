import { useThreeRenderer } from '../hooks/useThreeRenderer';
import type { StepScene } from '../../../obelus/dist';
import { circle, at, animate } from '../../../obelus/dist';
import { renderScene } from '../../../obelus-three-render/dist';
import { StepScenePlayer, TimelineScenePlayer } from '../../../obelus-gsap-player/dist';
import React from 'react';

const center = { x: 0, y: 0, z: 0 };
const radius = 80;

const stepScene: StepScene = {
  objects: [
    circle('circle1', {
      center,
      radius,
      color: 'cyan'
    }),
    circle('circle2', {
      center,
      radius,
      color: 'green'
    }),
    circle('circle3', {
      center,
      radius,
      color: 'lightblue'
    }),
    circle('circle4', {
      center,
      radius,
      color: 'yellow'
    }),
    circle('circle5', {
      center,
      radius,
      color: 'purple'
    }),
    circle('circle6', {
      center,
      radius,
      color: 'blue'
    }),
    circle('circle7', {
      center,
      radius,
      color: 'red'
    }),
    circle('circle8', {
      center,
      radius,
      color: 'orange'
    }),
  ],
  steps: [
    animate('circle1', { position: { y: 200 } }, { duration: 1 }),
    animate('circle2', { position: { x: 200, y: 200 } }, { duration: 1 }),
    animate('circle3', { position: { x: 200 } }, { duration: 1 }),
    animate('circle4', { position: { x: 200, y: -200 } }, { duration: 1 }),
    animate('circle5', { position: { y: -200 } }, { duration: 1 }),
    animate('circle6', { position: { x: -200, y: -200 } }, { duration: 1 }),
    animate('circle7', { position: { x: -200 } }, { duration: 1 }),
    animate('circle8', { position: { x: -200, y: 200 } }, { duration: 1 }),
  ]
};

export function StepSceneExample() {

  const [index, setIndex] = React.useState(0);

  const { canvasRef, scene, startAnimation, stopAnimation } = useThreeRenderer();

  const objectMap = renderScene(stepScene.objects, scene);

  const steps = StepScenePlayer({ objectMap, events: stepScene.steps, onStart: startAnimation, onComplete: stopAnimation })


  return (
    <>
      <button
        onClick={() => {
          steps[index].play()
        }}
      >play
      </button>
      <button
        onClick={() => {
          setIndex(i => i + 1);
        }}
      >
        next
      </button>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', backgroundColor: 'lightgreen' }} />
    </>
  )
}
