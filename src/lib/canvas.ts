export interface CanvasFrame {
  c: CanvasRenderingContext2D;
  w: number;
  h: number;
}

/** Matches the backing store to the element's size. Null while the canvas has no layout. */
export function fitCanvas(canvas: HTMLCanvasElement): CanvasFrame | null {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.round(rect.width * ratio);
  const height = Math.round(rect.height * ratio);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const c = canvas.getContext('2d');
  if (!c) return null;
  c.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { c, w: rect.width, h: rect.height };
}

export type Rgb = [number, number, number];

export const hexToRgb = (hex: string): Rgb =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
