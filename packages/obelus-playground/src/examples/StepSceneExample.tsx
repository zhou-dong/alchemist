import { createOrthographicCamera, createWebGLRenderer, useThreeContainer } from '../hooks/threeUtils';
import type { StepScene } from '../../../obelus/dist';
import { circle, animate, line } from '../../../obelus/dist';
import { renderScene } from '../../../obelus-three-render/dist';
import { StepScenePlayer } from '../../../obelus-gsap-player/dist';
import React from 'react';
import * as THREE from 'three';
import { useThreeAnimation } from '../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../hooks/useThreeAutoResize';

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

const extra = { material: { color: "blue" } };

const center = { x: 0, y: 0, z: 0 };
const radius = 20;

const stepScene: StepScene = {
  objects: [
    circle('circle1', {
      center: { x: -400, y: 0, z: 0 },
      radius,
      extra // cyan
    }),
    circle('circle2', {
      center: { x: -300, y: 0, z: 0 },
      radius,
      extra // green
    }),
    circle('circle3', {
      center: { x: -200, y: 0, z: 0 },
      radius,
      extra // lightblue
    }),
    circle('circle4', {
      center: { x: -100, y: 0, z: 0 },
      radius,
      extra // yellow
    }),
    circle('circle5', {
      center: { x: 0, y: 0, z: 0 },
      radius,
      extra // purple
    }),
    circle('circle6', {
      center: { x: 100, y: 0, z: 0 },
      radius,
      extra
    }),
    circle('circle7', {
      center: { x: 200, y: 0, z: 0 },
      radius,
      extra // red
    }),
    circle('circle8', {
      center: { x: 300, y: 0, z: 0 },
      radius,
      extra // orange
    }),
    circle('circle9', {
      center: { x: 400, y: 0, z: 0 },
      radius,
      extra
    }),
    line('line1', {
      start: { x: 0, y: 0, z: 0 },
      end: { x: 1200, y: 0, z: 0 },
      extra
    })
  ],
  steps: [
    animate('line1', { position: { x: -1200, y: 200 } }, { duration: 1 }),
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

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = createWebGLRenderer(window.innerWidth, window.innerHeight);

export function StepSceneExample() {

  const [index, setIndex] = React.useState(0);
  const scene = new THREE.Scene();
  const camera = createOrthographicCamera(width, height);
  const { containerRef } = useThreeContainer(renderer);
  const { startAnimation, stopAnimation, renderAnimationOnce } = useThreeAnimation(renderer, scene, camera);
  useThreeAutoResize(containerRef, renderer, scene, camera);

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

  renderAnimationOnce();
  return (
    <>
      <button
        onClick={nextClick}
        style={{ ...buttonStyle, position: 'fixed' }}
      >
        play
      </button>
      <div ref={containerRef} style={{ width: '100vw', height: '100vh', backgroundColor: 'lightblue' }} />
    </>
  )
}
