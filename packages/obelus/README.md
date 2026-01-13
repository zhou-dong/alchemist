# Obelus

A modular, type-safe animation domain-specific language (DSL) written in TypeScript. This library defines a declarative format for building, composing, and executing animations using a shared object model.

## ✨ Key Features

- 💡 Builder-style DSL (`at(0).animate(...)`, `sequence([...])`)
- 🕒 Timeline-based and step-based animation modes
- 🎯 Lifecycle callbacks (`onStart`, `onComplete`)
- 📞 Call events for arbitrary code execution
- 📦 Pure TypeScript — framework-agnostic

---

## 📦 Installation

```bash
npm install obelus
```

---

## 🔧 Timeline DSL

Schedule animations at absolute times:

```ts
import { animatable, at, TimelineScene } from 'obelus';

const scene: TimelineScene = {
  objects: [
    animatable('box', { x: 0, y: 0 }),
    animatable('circle', { x: 0, y: 0 }),
  ],
  timeline: [
    at(0).animate('box', { x: 100 }, { duration: 1 }),
    at(0.5).call(() => playSound('whoosh')),
    at(1).animate('circle', { y: 50 }, { duration: 0.5 }, {
      onComplete: () => console.log('Circle done!')
    }),
  ]
};
```

---

## 🪜 Step DSL

Compose animations sequentially and in parallel:

```ts
import { animatable, animate, wait, call, sequence, parallel, StepScene } from 'obelus';

const scene: StepScene = {
  objects: [
    animatable('box', { x: 0 }),
    animatable('circle', { y: 0 }),
  ],
  steps: [
    // Step 1: Animate box with callbacks
    animate('box', { x: 100 }, { duration: 1 }, {
      onStart: () => console.log('Started!'),
      onComplete: () => playSound('ding')
    }),
    
    // Step 2: Wait then call a function
    wait(0.5),
    call(() => updateScore(10)),
    
    // Step 3: Run two sequences in parallel
    parallel([
      sequence([
        animate('box', { x: 200 }, { duration: 0.5 }),
        wait(0.2),
        animate('box', { x: 300 }, { duration: 0.5 }),
      ]),
      sequence([
        animate('circle', { y: 100 }, { duration: 0.5 }),
        wait(0.2),
        animate('circle', { y: 200 }, { duration: 0.5 }),
      ])
    ])
  ]
};
```

---

## 📚 API Reference

### Step Events

| Function | Description |
|----------|-------------|
| `animate(targetId, targetProps, animateProps, callbacks?)` | Animate a target's properties |
| `wait(duration)` | Pause the timeline |
| `call(fn)` | Execute arbitrary code |
| `sequence(steps)` | Run steps one after another |
| `parallel(steps)` | Run steps simultaneously |

### Timeline Events

| Function | Description |
|----------|-------------|
| `at(time).animate(targetId, targetProps, animateProps, callbacks?)` | Animate at absolute time |
| `at(time).call(fn)` | Execute code at absolute time |

### Callbacks

```ts
{
  onStart?: () => void;    // Called when animation begins
  onComplete?: () => void; // Called when animation ends
}
```

---

## 🎯 What is Obelus?

Obelus is a framework-agnostic animation DSL that lets you:

- Define animations declaratively
- Use any rendering framework (Three.js, Canvas, React, etc.)
- Use any animation library (GSAP, Framer Motion, etc.)
- Compose complex animations from simple primitives
- Add lifecycle hooks for sounds, state updates, and more