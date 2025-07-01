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

```javascript
scene(
  objects: [
    circle('circle1', { center: { x: 0, y: 0, z: 0 }, radius: 10, color: '#f00' }),
    line('line1', { start: { x: 0, y: 0, z: 0 }, end: { x: 50, y: 50, z: 0 } }),
    group('group1', ['circle1', 'line1'])
  ],
  timeline: [
    at(0).animate('circle1', { position: { x: 100 } }, { duration: 1 }),
    at(1).animate('group1', { position: { y: 50 } }, { duration: 1 })
  ]
)
```
