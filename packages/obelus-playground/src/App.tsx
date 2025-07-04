import { useThreeRenderer } from './hooks/useThreeRenderer';
import type { TimelineScene } from '../../obelus';
import { circle, at } from '../../obelus';
import { renderScene } from '../../obelus-three-render';
import { TimelineScenePlayer } from '../../obelus-gsap-player';

const center = { x: 0, y: 0, z: 0 };
const radius = 80;

const timelineScene: TimelineScene = {
  objects: [
    circle('circle1', {
      center,
      radius,
      visual: { color: 'cyan' }
    }),
    circle('circle2', {
      center,
      radius,
      visual: { material: { color: 'green' } }
    }),
    circle('circle3', {
      center,
      radius,
      visual: { material: { color: 'lightblue' } }
    }),
    circle('circle4', {
      center,
      radius,
      visual: { material: { color: 'yellow' } }
    }),
    circle('circle5', {
      center,
      radius,
      visual: { material: { color: 'purple' } }
    }),
    circle('circle6', {
      center,
      radius,
      visual: { material: { color: 'blue' } }
    }),
    circle('circle7', {
      center,
      radius,
      visual: { material: { color: 'red' } }
    }),
    circle('circle8', {
      center,
      radius,
      visual: { material: { color: 'orange' } }
    }),
  ],
  timeline: [
    at(0.2).animate('circle1', { position: { y: 200 } }, { duration: 1 }),
    at(0.2).animate('circle2', { position: { x: 200, y: 200 } }, { duration: 1 }),
    at(0.2).animate('circle3', { position: { x: 200 } }, { duration: 1 }),
    at(0.2).animate('circle4', { position: { x: 200, y: -200 } }, { duration: 1 }),
    at(0.2).animate('circle5', { position: { y: -200 } }, { duration: 1 }),
    at(0.2).animate('circle6', { position: { x: -200, y: -200 } }, { duration: 1 }),
    at(0.2).animate('circle7', { position: { x: -200 } }, { duration: 1 }),
    at(0.2).animate('circle8', { position: { x: -200, y: 200 } }, { duration: 1 }),
  ]
};

function App() {

  const { canvasRef, scene, startAnimation, stopAnimation } = useThreeRenderer();

  const { objectMap, rootObjects, } = renderScene(timelineScene.objects);
  rootObjects.forEach((o) => scene.add(o));

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
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', backgroundColor: 'lightgreen' }} />
    </>
  )
}

export default App
