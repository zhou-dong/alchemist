import { createOrthographicCamera, createWebGLRenderer } from './threeUtils';
import type { StepScene } from '../../../obelus/dist';
import { circle, animate, line, group } from '../../../obelus/dist';
import { renderScene } from '../../../obelus-three-render/dist';
import { StepScenePlayer } from '../../../obelus-gsap-player/dist';
import React from 'react';
import * as THREE from 'three';
import { useThreeAnimation } from '../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../hooks/useThreeAutoResize';
import { useThreeContainer } from '../hooks/useThreeContainer';

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

const extra = { material: { color: "#fff" } };

const position = { x: 0, y: 0, z: 0 };
const radius = 10;

const stepScene: StepScene = {
  objects: [
    circle('circle1', {
      position,
      radius,
      extra // cyan
    }),
    circle('circle2', {
      position,
      radius,
      extra // green
    }),
    circle('circle3', {
      position,
      radius,
      extra // lightblue
    }),
    circle('circle4', {
      position,
      radius,
      extra // yellow
    }),
    circle('circle5', {
      position,
      radius,
      extra // purple
    }),
    circle('circle6', {
      position,
      radius,
      extra
    }),
    circle('circle7', {
      position,
      radius,
      extra // red
    }),
    circle('circle8', {
      position,
      radius,
      extra // orange
    }),
    circle('circle9', {
      position,
      radius,
      extra
    }),
    line('line1', {
      start: { x: 0, y: 0, z: 0 },
      end: { x: 1200, y: 0, z: 0 },
      extra
    }),
    group('group1', ["circle1", "circle2"])
    // latex("latex1", {
    //   expression: "\\frac{1}{\\sqrt{2\\pi}} e^{-x^2/2}",
    //   position: { x: 0, y: -100, z: 0 },
    //   extra: { color: "green", fontSize: 100 }
    // })
  ],
  steps: [
    animate('circle1', { position: { y: 200 } }, { duration: 1 }),
    animate('circle2', { position: { x: 200, y: 200 } }, { duration: 1 }),
    animate('group1', { position: { y: -400 } }, { duration: 1 }),
    animate('line1', { position: { x: -200, y: 200 } }, { duration: 1 }),
    // animate('latex1', { position: { x: 200, y: -200 } }, { duration: 1 }),

    animate('circle3', { position: { x: 200 } }, { duration: 1 }),
    animate('circle4', { position: { x: 200, y: -200 } }, { duration: 1 }),
    animate('circle5', { position: { y: -200 } }, { duration: 1 }),
    animate('circle6', { position: { x: -200, y: -200 } }, { duration: 1 }),
    animate('circle7', { position: { x: -200 } }, { duration: 1 }),
    animate('circle8', { position: { x: -200, y: 200 } }, { duration: 1 }),
    animate('circle9', { position: { x: -400, y: 200 } }, { duration: 1 }),
  ]
};

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = createWebGLRenderer(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = createOrthographicCamera(width, height);
const objectMap = renderScene(stepScene.objects, scene);

export function StepSceneExample() {

  const [disabled, setDisabled] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const { containerRef } = useThreeContainer(renderer);
  const { startAnimation, stopAnimation } = useThreeAnimation(renderer, scene, camera);
  useThreeAutoResize(containerRef, renderer, scene, camera);

  const steps = React.useMemo(
    () => StepScenePlayer({ objectMap, events: stepScene.steps, onStart: startAnimation, onComplete: stopAnimation }),
    []
  );

  const nextClick = async () => {

    console.log("click....");

    setDisabled(true);
    await steps[index].play();
    setDisabled(false);

    const next = (index + 1) % steps.length;
    setIndex(next);
  }

  // renderAnimationOnce();
  return (
    <>
      <button
        onClick={nextClick}
        style={{ ...buttonStyle, position: 'fixed' }}
        disabled={disabled}
      >
        play
      </button>
      <div ref={containerRef} style={{ width: '100vw', height: '100vh', backgroundColor: 'lightblue' }} />
    </>
  )
}
