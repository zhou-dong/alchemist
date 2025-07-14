import { createOrthographicCamera, createWebGLRenderer } from './threeUtils';
import type { StepScene } from '../../../obelus/dist';
import { circle, animate, line, group, latex } from '../../../obelus/dist';
import { renderScene } from '../../../obelus-three-render/dist';
import { StepScenePlayer, type PlayableStep } from '../../../obelus-gsap-player/dist';
import React from 'react';
import * as THREE from 'three';
import { useThreeAnimation } from '../hooks/useThreeAnimation';
import { useThreeAutoResize } from '../hooks/useThreeAutoResize';
import { useThreeContainer } from '../hooks/useThreeContainer';
import { useRunAsyncOnce } from '../hooks/useRunAsyncOnce';
import { BETA_DISTRIBUTION_LATEX, EXPECTED_KTH_ORDER_STATISTIC_LATEX_FORMULA, KMV_ESTIMATION_LATEX_FORMULA, THETA_EXPECTATION_DEFINITION, THETA_EXTIMATION_STEPS_LATEX_FORMULA, THETA_ESTIMATION_LATEX_FORMULA, INFER_THETA_STEPS } from '../sketches/theta/math-behind-kmv/constants';
import { betaDistributionToExpectedKthValueFormulas } from '../sketches/theta/math-behind-kmv/beta-distribution';

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

const extra = { material: { color: "#000" } };

const position = { x: 0, y: -500, z: 0 };
const radius = 10;

const latexExpression = '\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}';
// const latexExpression = 'E = mc^2';

const template = `θ = 0.3306
\\quad \\Rightarrow \\quad
\\hat{n} = \\frac{3}{0.3306} ≈ 9.1
\\quad \\Rightarrow \\quad
\\text{Unbiased: } \\left( \\frac{3}{0.3306} \\right) - 1 ≈ 8.1`

const expression2 = `n + 1 = \\frac{k}{ \\mathbb{E}[X_{(k)}] } \\Rightarrow n = \\frac{k}{ \\mathbb{E}[X_{(k)}] } - 1 \\Rightarrow \\frac{k}{ \\theta } - 1`;

const s = 'n \\approx \\frac{k}{ \\theta } - 1';

const d = latex("e", {
  expression: `\\mathbb{E}[X_{(k)}] = \\frac{k}{n + 1} = \\frac{1}{1 + 1} = \\frac{1}{2} = 0.5`,
  position: { x: 0, y: 200, z: 0 },
  extra: {
    style: { color: "#000", fontSize: '28px' },
    height: 50
  }
})

const d2 = latex("e1", {
  expression: expression2,
  position: { x: 0, y: 100, z: 0 },
  extra: {
    style: { color: "#000", fontSize: '28px' },
    height: 50
  }
})

const e3 = `n \\approx ( \\frac{k}{ \\mathbb{E}[X_{(k)}] }  - 1 )`;

INFER_THETA_STEPS.map(step => {

})

const formulas = betaDistributionToExpectedKthValueFormulas.map(({ formula, height, x }, index) => {

  return latex("betaDistributionToExpectedKthValueStep_" + index, {
    expression: formula,
    position: { x, y: -80 * index + 320, z: 0 },
    extra: {
      style: { color: "green", fontSize: '28px' },
      height: height
    }
  })


})

const d3 = latex("e3", {
  expression: KMV_ESTIMATION_LATEX_FORMULA,
  position: { x: 0, y: -100, z: 0 },
  extra: {
    style: { color: "purple", fontSize: '28px' },
    height: 50
  }
})

const d4 = latex("e4", {
  expression: template,
  position: { x: 0, y: -300, z: 0 },
  extra: {
    style: { color: "red", fontSize: '28px' },
    height: 50
  }
})

const d5 = latex("e5", {
  expression: THETA_EXTIMATION_STEPS_LATEX_FORMULA,
  position: { x: 0, y: -200, z: 0 },
  extra: {
    style: { color: "blue", fontSize: '28px' },
    height: 50
  }
})

const d6 = latex("e6", {
  expression: BETA_DISTRIBUTION_LATEX,
  position: { x: 0, y: -400, z: 0 },
  extra: {
    style: { color: "green", fontSize: '28px' },
    height: 50
  }
})

const stepScene: StepScene = {
  objects: [
    // d,
    // d2,
    // d3,
    // d4,
    // d5,
    // d6,
    ...formulas,
    line('line1', {
      start: { x: -400, y: 0, z: 0 },
      end: { x: 400, y: 0, z: 0 },
      extra
    }),
    group('group1', ["circle1", "circle2"]),
    latex("latex1", {
      expression: "0",
      position: { x: -400, y: -20, z: 0 },
      extra: {
        style: { color: "gray", fontSize: '28px' },
        height: 20
      }
    }),
    latex("latex2", {
      expression: "1",
      position: { x: 400, y: -20, z: 0 },
      extra: {
        style: { color: "gray", fontSize: '28px' },
        height: 20
      }
    }),
    circle('circle1', {
      position: { x: 0, y: 0, z: 0 },
      radius: 3,
      extra: { material: { color: "gray" } },
    }),
    latex("latex3", {
      expression: "0.5",
      position: { x: 0, y: -20, z: 0 },
      extra: {
        style: { color: "#000", fontSize: '28px' },
        height: 20
      }
    })
  ],
  steps: [
    animate('circle1', { position: { y: 200 } }, { duration: 1 }),
    animate('circle2', { position: { x: 200, y: 200 } }, { duration: 1 }),
    animate('group1', { position: { y: -400 } }, { duration: 1 }),
    animate('line1', { position: { x: -200, y: 200 } }, { duration: 1 }),
    animate('latex1', { position: { x: 200, y: -200 } }, { duration: 1 }),
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

export function StepSceneExample() {

  const [steps, setSteps] = React.useState<PlayableStep[]>([]);
  const [disabled, setDisabled] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const { containerRef } = useThreeContainer(renderer);
  const { startAnimation, stopAnimation } = useThreeAnimation(renderer, scene, camera);
  useThreeAutoResize(containerRef, renderer, scene, camera);
  useRunAsyncOnce(async () => {
    const objectMap = await renderScene(stepScene.objects, scene);
    const steps = StepScenePlayer({ objectMap, events: stepScene.steps, onStart: startAnimation, onComplete: stopAnimation });
    setSteps(steps);
  });

  const nextClick = async () => {

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
      <div ref={containerRef} style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }} />
    </>
  )
}
