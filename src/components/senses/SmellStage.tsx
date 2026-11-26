import { useRef, useState, type PointerEvent } from 'react';
import { hexToRgb } from '../../lib/canvas';
import { prefersReducedMotion } from '../../lib/motion';
import { useStageCanvas } from './useStageCanvas';

const SCENTS = {
  rain: {
    name: 'Rain',
    line: 'Petrichor: the smell of earth after the first rain.',
    palette: ['#8FA9A4', '#C4D3CF', '#6E8781', '#DCE6E2'],
    background: '#EEF2F0',
  },
  pine: {
    name: 'Pine',
    line: 'Resin, needles and cool forest air.',
    palette: ['#3F6B4F', '#8DB394', '#C2D8BF', '#5E8C6A'],
    background: '#ECF2EC',
  },
  citrus: {
    name: 'Citrus',
    line: 'Zest from a just-peeled orange.',
    palette: ['#F5B841', '#FAD97A', '#F28C38', '#FFE9A8'],
    background: '#FFF8E8',
  },
  coffee: {
    name: 'Coffee',
    line: 'Roasted, warm and familiar.',
    palette: ['#6B4A33', '#A47C5B', '#D2B79A', '#4A3326'],
    background: '#F4EDE6',
  },
  lavender: {
    name: 'Lavender',
    line: 'Soft, floral and herbal.',
    palette: ['#9B8DC8', '#CFC5EC', '#7B6CB0', '#E4DEF5'],
    background: '#F3F0FA',
  },
};
type ScentKey = keyof typeof SCENTS;
const SCENT_KEYS = Object.keys(SCENTS) as ScentKey[];

interface Blob {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
  colorIndex: number;
  color: number[];
  pushX: number;
  pushY: number;
}

const createBlobs = (): Blob[] =>
  Array.from({ length: 16 }, (_, i) => ({
    ...randomStart(),
    radius: 0.18 + Math.random() * 0.22,
    phase: Math.random() * 6.28,
    speed: 0.15 + Math.random() * 0.25,
    colorIndex: i % 4,
    color: [220, 228, 224],
    pushX: 0,
    pushY: 0,
  }));

/** Each scent wafts up from a cluster near the bottom of the stage. */
const randomStart = () => ({
  x: 0.5 + (Math.random() - 0.5) * 0.25,
  y: 0.65 + (Math.random() - 0.5) * 0.2,
});

export function SmellStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const [blobs] = useState(createBlobs);
  const [scent, setScent] = useState<ScentKey>('rain');
  const { name, line, palette, background } = SCENTS[scent];

  const select = (key: ScentKey) => {
    setScent(key);
    blobs.forEach((blob) => Object.assign(blob, randomStart()));
  };

  const trackPointer = (event: PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    pointer.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
  };

  useStageCanvas(stageRef, canvasRef, ({ c, w, h }, time) => {
    c.clearRect(0, 0, w, h);
    for (const blob of blobs) {
      const target = hexToRgb(palette[blob.colorIndex]);
      blob.color = blob.color.map((v, j) => v + (target[j] - v) * 0.04);

      if (!prefersReducedMotion) {
        blob.x +=
          Math.sin((time / 4000) * blob.speed + blob.phase) * 0.0009 + (0.5 - blob.x) * 0.0006;
        blob.y +=
          Math.cos((time / 5000) * blob.speed + blob.phase) * 0.0008 -
          0.0004 +
          (0.5 - blob.y) * 0.0007;
      }
      if (pointer.current && pointer.current.x >= 0) {
        const dx = blob.x - pointer.current.x;
        const dy = blob.y - pointer.current.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 0.3) {
          blob.pushX += (dx / distance) * 0.004;
          blob.pushY += (dy / distance) * 0.004;
        }
      }
      blob.pushX *= 0.95;
      blob.pushY *= 0.95;

      const x = (blob.x + blob.pushX) * w;
      const y = (blob.y + blob.pushY) * h;
      const radius = blob.radius * Math.max(w, h) * (1 + Math.sin(time / 1800 + blob.phase) * 0.08);
      const gradient = c.createRadialGradient(x, y, 0, x, y, radius);
      const [r, g, b] = blob.color.map(Math.round);
      gradient.addColorStop(0, `rgba(${r},${g},${b},.5)`);
      gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
      c.fillStyle = gradient;
      c.beginPath();
      c.arc(x, y, radius, 0, 6.283);
      c.fill();
    }
  });

  return (
    <div
      className="sstage"
      id="smellStage"
      ref={stageRef}
      style={{ background }}
      onPointerMove={trackPointer}
      onPointerLeave={() => (pointer.current = null)}
    >
      <canvas id="mist" aria-hidden="true" ref={canvasRef}></canvas>
      <div className="sread">
        <b id="scentName">{name}</b>
        <span id="scentLine">{line}</span>
      </div>
      <div className="sctrl glass">
        <div className="chips" id="scentBtns">
          {SCENT_KEYS.map((key) => (
            <button
              key={key}
              className={scent === key ? 'on' : undefined}
              onClick={() => select(key)}
            >
              {SCENTS[key].name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
