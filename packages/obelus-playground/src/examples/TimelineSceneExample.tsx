import type { TimelineScene } from '../../../obelus/dist';
import { circle, at } from '../../../obelus/dist';
import { renderScene } from '../../../obelus-three-render/dist';
import { TimelineScenePlayer } from '../../../obelus-gsap-player/dist';
import { useThreeAnimation } from '../hooks/useThreeAnimation';
import React from 'react';
import { type UseThreeProps } from '../utils/threeUtils';

const position = { x: 0, y: 0, z: 0 };
const radius = 80;

const timelineScene: TimelineScene = {
  objects: [
    circle('circle1', {
      position,
      radius,
    }),
    circle('circle2', {
      position,
      radius,
    }),
    circle('circle3', {
      position,
      radius,
    }),
    circle('circle4', {
      position,
      radius,
    }),
    circle('circle5', {
      position,
      radius,
    }),
    circle('circle6', {
      position,
      radius,
    }),
    circle('circle7', {
      position,
      radius,
    }),
    circle('circle8', {
      position,
      radius,
    }),
  ],
  timeline: [
    at(0.1).animate('circle1', { position: { y: 200 } }, { duration: 1 }),
    at(0.2).animate('circle2', { position: { x: 200, y: 200 } }, { duration: 1 }),
    at(0.3).animate('circle3', { position: { x: 200 } }, { duration: 1 }),
    at(0.4).animate('circle4', { position: { x: 200, y: -200 } }, { duration: 1 }),
    at(0.5).animate('circle5', { position: { y: -200 } }, { duration: 1 }),
    at(0.6).animate('circle6', { position: { x: -200, y: -200 } }, { duration: 1 }),
    at(0.7).animate('circle7', { position: { x: -200 } }, { duration: 1 }),
    at(0.8).animate('circle8', { position: { x: -200, y: 200 } }, { duration: 1 }),
  ]
};

export function TimelineSceneExample({ renderer, scene, camera }: UseThreeProps) {

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { startAnimation, stopAnimation, renderAnimationOnce } = useThreeAnimation(renderer, scene, camera);

  const objectMap = renderScene(timelineScene.objects, scene);

  renderAnimationOnce()

  const tl = TimelineScenePlayer({ objectMap, events: timelineScene.timeline, onStart: startAnimation, onComplete: stopAnimation })
  tl.play();

  return (
    <>
      <button
        onClick={() => {
          tl.restart()
        }}
      >play
      </button>
      {/* <canvas ref={canvasRef} style={{ width: '100%', height: '100%', backgroundColor: 'lightgreen' }} /> */}
      <div ref={containerRef} />
    </>
  )
}
