```json
{
  "name": "obelus",
  "version": "0.1.0",
  "description": "A declarative animation DSL powered by GSAP and Three.js",
  "author": "Your Name <your@email.com>",
  "license": "MIT",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md"],
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build",
    "lint": "eslint src --ext .ts,.tsx",
    "test": "vitest"
  },
  "dependencies": {
    "gsap": "^3.12.2",
    "three": "^0.158.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "eslint": "^8.56.0",
    "vitest": "^1.0.0"
  },
  "keywords": [
    "animation",
    "dsl",
    "timeline",
    "typescript",
    "gsap",
    "threejs"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/obelus"
  },
  "bugs": {
    "url": "https://github.com/your-username/obelus/issues"
  },
  "homepage": "https://github.com/your-username/obelus#readme"
}
```

```bash
npm install
npm run build   # compiles src/ to dist/
npm publish     # make sure you’ve logged in
```

```bash
cd ui/react
npm create vite@latest playground --template react-ts
cd playground
npm install
npm run dev
```

```bash
npm install --save-dev vite
```

🎬 1. TimelineScene DSL Example
```javascript
import { Scene } from '../timeline/scene';
import { circle } from '../core/objects/circle';
import { at } from '../timeline/dsl';

export const bouncingBall: Scene = {
  objects: [
    circle('ball', {
      center: { x: 0, y: 0, z: 0 },
      radius: 20,
      visual: { color: '#f00' }
    })
  ],
  timeline: [
    at(0).animate('ball', { position: { y: -50 } }, { duration: 0.5, ease: 'bounce.out' }),
    at(1).animate('ball', { position: { y: 0 } }, { duration: 0.5, ease: 'bounce.out' }),
    at(2).animate('ball', { position: { x: 100 } }, { duration: 1 })
  ]
};
```

🪜 2. StepScene DSL Example
```typescript
import { StepScene } from '../step/scene';
import { circle } from '../core/objects/circle';
import { animate, wait, sequence } from '../step/dsl';

export const interactiveSteps: StepScene = {
  objects: [
    circle('circle1', {
      center: { x: 0, y: 0, z: 0 },
      radius: 10,
      visual: { color: '#00f' }
    })
  ],
  steps: [
    sequence([
      animate('circle1', { position: { x: 100 } }, { duration: 1 }),
      wait(0.5),
      animate('circle1', { position: { y: 50 } }, { duration: 1 })
    ]),
    animate('circle1', { position: { x: 0, y: 0 } }, { duration: 1 })
  ]
};
```

UI

- exportPanel.ts
- scrubber.ts
- timnelineEditor.ts


```typescript
const camera = new THREE.OrthographicCamera
```


```md
/src
├── /core
│   ├── /types              # Base types: Position, Props, etc.
│   ├── /objects            # Shared objects: circle, line, group
│   ├── /engine             # renderScene(), createSceneContext()
│   ├── /io                 # importScene(), exportScene()

├── /timeline
│   ├── scene.ts            # TimelineScene definition
│   ├── event.ts            # TimelineEvent type
│   ├── dsl.ts              # at(time).animate(...)
│   ├── player.ts           # playTimelineScene()

├── /step
│   ├── scene.ts            # StepScene definition
│   ├── event.ts            # StepEvent types (animate, wait, etc.)
│   ├── dsl.ts              # sequence(), wait(), animate()
│   ├── player.ts           # playStepScene()

README.md                   # DSL usage examples
```

```md
/tests
├── /core
│   ├── renderScene.test.ts
│   ├── importExport.test.ts

├── /timeline
│   ├── timelinePlayer.test.ts
│   ├── timelineDsl.test.ts

├── /step
│   ├── stepPlayer.test.ts
│   ├── stepDsl.test.ts
```
