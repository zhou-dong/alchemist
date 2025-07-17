# Animation DSL Core

A modular, type-safe animation domain-specific language (DSL) written in TypeScript. This library defines a declarative format for building, composing, and executing animations using a shared object model.

## ✨ Key Features

- 💡 Builder-style DSL (`at(0).animate(...)`, `sequence([...])`)
- 🕒 Timeline-based and step-based animation modes
- 📦 Pure TypeScript — framework-agnostic

---

## 📦 Installation

```bash
npm install obelus
```

---

## 🔧 Example — Timeline DSL

```ts
const scene: TimelineScene<T, S> = {
  objects: [
    animatable('id1', {} as T),
    animatable('id2', {} as T),
  ],
  timeline: [
    at(0).animate('id1', {...targetProps}, {...animateProps}),
    at(1).animate('id2', {...targetProps}, {...animateProps}),
  ]
};
```

---

## 🪜 Example — Step DSL

```ts
const scene: StepScene<T, S> = {
  objects: [
    animatable('id1', {} as T),
    animatable('id2', {} as T),
  ],
  steps: [
    sequence([
      animate('id1', {...targetProps}, {...animateProps}),
      wait(0.5),
      animate('id2', {...targetProps}, {...animateProps}),
    ])
  ]
};
```

##  What is Obelus?

Obelus is a framework-agnostic animation DSL that lets you:
- Define animations declaratively
- Use any rendering framework (Three.js, Canvas, React, etc.)
- Use any animation library (GSAP, Framer Motion, etc.)
- Compose complex animations from simple primitives
