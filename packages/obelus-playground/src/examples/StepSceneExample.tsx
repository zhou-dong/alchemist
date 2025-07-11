import { useThreeRenderer } from '../hooks/useThreeRenderer';
import type { StepScene } from '../../../obelus/dist';
import { circle, animate, line } from '../../../obelus/dist';
import { renderScene } from '../../../obelus-three-render/dist';
import { StepScenePlayer } from '../../../obelus-gsap-player/dist';
import React from 'react';

const buttonStyle = {
  bottom: '20px',    // Positions the button 20px from the bottom
  right: '20px',     // Positions the button 20px from the right
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: '1000',    // Ensure the button is on top
};

const center = { x: 0, y: 0, z: 0 };
const radius = 80;

const stepScene: StepScene = {
  objects: [
    circle('circle1', {
      center,
      radius,
      color: 'blue' // cyan
    }),
    circle('circle2', {
      center,
      radius,
      color: 'blue' // green
    }),
    circle('circle3', {
      center,
      radius,
      color: 'blue' // lightblue
    }),
    circle('circle4', {
      center,
      radius,
      color: 'blue' // yellow
    }),
    circle('circle5', {
      center,
      radius,
      color: 'blue' // purple
    }),
    circle('circle6', {
      center,
      radius,
      color: 'blue'
    }),
    circle('circle7', {
      center,
      radius,
      color: 'blue' // red
    }),
    circle('circle8', {
      center,
      radius,
      color: 'blue' // orange
    }),
    circle('circle9', {
      center,
      radius,
      color: 'blue'
    }),
    line('line1', {
      start: { x: 0, y: 0, z: 0 },
      end: { x: 5, y: 5, z: 0 }
    })
  ],
  steps: [
    animate('line1', { start: { x: -200, y: 200 } }, { duration: 1 }),
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

  const steps = React.useMemo(() => {
    return StepScenePlayer({ objectMap, events: stepScene.steps, onStart: startAnimation, onComplete: stopAnimation })
  }, []);

  const nextClick = () => {
    if (index >= steps.length) {
      steps[index].play();
    } else {
      steps[index].play();
    }

    const next = (index + 1) % steps.length;
    setIndex(next);
  }

  return (
    <>
      <button
        onClick={nextClick}
        style={{ ...buttonStyle, position: 'fixed' }}
      >
        play
      </button>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', backgroundColor: 'lightgreen' }} />
    </>
  )
}
