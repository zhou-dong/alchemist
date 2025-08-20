import { useRef, useEffect } from 'react';

export function useRunAsyncOnce(fn: () => Promise<void>) {
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    fn();
  }, []);
}
