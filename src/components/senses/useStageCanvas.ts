import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import { fitCanvas, type CanvasFrame } from '../../lib/canvas';

/** Calls `draw` every animation frame while the stage is on screen. */
export function useStageCanvas(
  stageRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  draw: (frame: CanvasFrame, time: number) => void,
) {
  const drawRef = useRef(draw);
  useLayoutEffect(() => {
    drawRef.current = draw;
  });

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    let onScreen = true;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => (onScreen = entry.isIntersecting)),
      { threshold: 0.02 },
    );
    observer.observe(stage);

    let raf = requestAnimationFrame(function loop(time) {
      if (stage.offsetParent !== null && onScreen) {
        const frame = fitCanvas(canvas);
        if (frame) drawRef.current(frame, time);
      }
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [stageRef, canvasRef]);
}
