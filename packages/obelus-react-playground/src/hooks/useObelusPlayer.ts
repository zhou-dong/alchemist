import { useState, useEffect, useCallback, useRef } from 'react';
import { type Animatable, type StepScene , type StepEvent} from 'obelus';

type AnimatedMesh = React.ComponentProps<'mesh'>;

export type AnimatableMesh = Animatable<AnimatedMesh>;
export type AnimatableStepEvent = StepEvent<>;



export type FramerMotionObject = {
  id: string
  object: any // Framer Motion component props
}

export type ObelusObject = ThreeMeshObject | FramerMotionObject

export type ObelusAnimation = {
  target: string
  props: any
}

export type ObelusScene = teps: O constructor(public object: WithAnimated['mesh'], public props: SpringProps) {
  this.object = object;
  this.props = props;
} belusAnimation[]
}

export type AnimationControls = {
  [key: string]: {
    animate: any
    transition?: any
    onAnimationStart?: () => void
    onAnimationComplete?: () => void
  }
}

export type AnimationAPI = {
  start: (props: any) => Promise<void>
  stop: () => void
  pause: () => void
  resume: () => void
}

export function useObelusPlayer(scene: ObelusScene) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationControls, setAnimationControls] = useState<AnimationControls>({})
  const apiRegistry = useRef(new Map<string, AnimationAPI>())

  // Register animation API for a mesh
  const registerApi = useCallback((id: string, api: AnimationAPI) => {
    apiRegistry.current.set(id, api)
  }, [])

  // Convert DSL animation to Framer Motion controls
  const convertToFramerMotion = useCallback((animation: ObelusAnimation) => {
    const { target, props } = animation

    // Convert DSL props to Framer Motion format
    const framerProps = {
      animate: {},
      transition: {}
    }

    // Handle different prop types
    if (props && typeof props === 'object') {
      // Duration
      if (props.duration) {
        framerProps.transition.duration = props.duration / 1000
      }

      // Position
      if (props.x !== undefined) {
        framerProps.animate.x = props.x
      }
      if (props.y !== undefined) {
        framerProps.animate.y = props.y
      }

      // Transform
      if (props.scale !== undefined) {
        framerProps.animate.scale = props.scale
      }
      if (props.rotate !== undefined) {
        framerProps.animate.rotate = props.rotate
      }

      // Opacity
      if (props.opacity !== undefined) {
        framerProps.animate.opacity = props.opacity
      }

      // Custom Framer Motion props
      if (props.animate) {
        framerProps.animate = { ...framerProps.animate, ...props.animate }
      }
      if (props.transition) {
        framerProps.transition = { ...framerProps.transition, ...props.transition }
      }
    }

    return framerProps
  }, [])

  // Play the scene
  const play = useCallback(() => {
    setIsPlaying(true)
    setCurrentStepIndex(0)

    // Initialize animation controls
    const controls: AnimationControls = {}

    scene.objects.forEach(obj => {
      controls[obj.id] = {
        animate: {},
        transition: { duration: 0.5 }
      }
    })

    setAnimationControls(controls)
  }, [scene])

  // Stop the scene
  const stop = useCallback(() => {
    setIsPlaying(false)
    setCurrentStepIndex(0)
  }, [])

  // Execute current step using registered APIs
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= scene.steps.length) {
      setIsPlaying(false)
      return
    }

    const currentStep = scene.steps[currentStepIndex]
    const api = apiRegistry.current.get(currentStep.target)

    if (api) {
      // Use the API to start animation
      api.start(currentStep.props).then(() => {
        // Move to next step after animation completes
        setCurrentStepIndex(prev => prev + 1)
      })
    } else {
      // Fallback to Framer Motion controls
      const framerControls = convertToFramerMotion(currentStep)
      setAnimationControls(prev => ({
        ...prev,
        [currentStep.target]: {
          ...prev[currentStep.target],
          ...framerControls,
          onAnimationComplete: () => {
            setCurrentStepIndex(prev => prev + 1)
          }
        }
      }))
    }
  }, [isPlaying, currentStepIndex, scene.steps, convertToFramerMotion])

  return {
    animationControls,
    isPlaying,
    currentStepIndex,
    totalSteps: scene.steps.length,
    play,
    stop,
    registerApi
  }
} 