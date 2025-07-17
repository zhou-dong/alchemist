import { forwardRef, useImperativeHandle, useRef } from 'react';
import { animated, useSpring, SpringValue } from '@react-spring/three';

// Define the API interface
export interface EnhancedMeshAPI {
  start: (props: any) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  set: (props: any) => void;
}

// Props for the enhanced component
interface EnhancedAnimatedMeshProps {
  initialPosition?: [number, number, number];
  initialScale?: number | [number, number, number];
  initialRotation?: [number, number, number];
  onApiReady?: (api: EnhancedMeshAPI) => void;
  children?: React.ReactNode;
}

const EnhancedAnimatedMesh = forwardRef<EnhancedMeshAPI, EnhancedAnimatedMeshProps>(
  ({ 
    initialPosition = [0, 0, 0], 
    initialScale = 1, 
    initialRotation = [0, 0, 0],
    onApiReady,
    children,
    ...meshProps 
  }, ref) => {
    
    const [springs, api] = useSpring(() => ({
      position: initialPosition as [number, number, number],
      scale: initialScale,
    }));

    // Expose the enhanced API
    useImperativeHandle(ref, () => ({
      start: (animationProps: any) => {
        api.start(animationProps);
      },
      stop: () => {
        api.stop();
      },
      pause: () => {
        api.pause();
      },
      resume: () => {
        api.resume();
      },
      set: (props: any) => {
        api.set(props);
      }
    }), [api]);

    return (
      <animated.mesh {...springs} {...meshProps}>
        {children}
      </animated.mesh>
    );
  }
);

EnhancedAnimatedMesh.displayName = 'EnhancedAnimatedMesh';

export default EnhancedAnimatedMesh; 