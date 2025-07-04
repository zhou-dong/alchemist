# Animation DSL Core

A modular, type-safe animation domain-specific language (DSL) written in TypeScript. This library defines a declarative format for building, composing, and executing animations using a shared object model.

## ✨ Key Features

- 💡 Builder-style DSL (`at(0).animate(...)`, `sequence([...])`)
- 🧱 Scene object model (circle, line, group)
- 🕒 Timeline-based and step-based animation modes
- 📦 Pure TypeScript — framework-agnostic
- 🧪 Built for testability, exportability, and future rendering engines

---

## 📦 Installation

```bash
npm install obelus
```

---

## 🔧 Example — Timeline DSL

```ts
import { circle } from './objects/dsl/circle';
import { at } from './timeline/dsl';
import { TimelineScene } from './timeline/scene';

const scene: TimelineScene = {
  objects: [
    circle('ball', {
      center: { x: 0, y: 0, z: 0 },
      radius: 20,
      color: '#f00'
    })
  ],
  timeline: [
    at(0).animate('ball', { position: { y: -50 } }, { duration: 0.5 }),
    at(1).animate('ball', { position: { y: 0 } }, { duration: 0.5 })
  ]
};
```

---

## 🪜 Example — Step DSL

```ts
import { circle } from './objects/dsl/circle';
import { animate, wait, sequence } from './step/dsl';
import { StepScene } from './step/scene';

const scene: StepScene = {
  objects: [
    circle('circle1', {
      center: { x: 0, y: 0, z: 0 },
      radius: 10,
      color: '#00f'
    })
  ],
  steps: [
    sequence([
      animate('circle1', { position: { x: 100 } }, { duration: 1 }),
      wait(0.5),
      animate('circle1', { position: { y: 50 } }, { duration: 1 })
    ])
  ]
};
```

---

## 📤 Import/Export

```ts
import { importScene, exportScene } from './io';

const json = exportScene(scene);
const restored = importScene<Scene>(json);
```

---

## 🧪 Testing

Project uses [Vitest](https://vitest.dev) for testing.

```bash
npm run test
```

---

## 📚 Roadmap
- [x] Timeline DSL + runner
- [x] Step-based DSL + runner
- [x] Scene object model (shared)
- [x] Scene import/export
- [ ] Render + play engine packages (external)
- [ ] GUI timeline editor (future)

---

## License
[MIT](./LICENSE)
