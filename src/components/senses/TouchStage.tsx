import { useRef, useState, type PointerEvent } from 'react';
import { useStageCanvas } from './useStageCanvas';

interface Material {
  name: string;
  color: string;
  background: string;
  /** Spring stiffness, reach of the press in px, and push strength. */
  stiffness: number;
  reach: number;
  strength: number;
  grains: boolean;
}

const MATERIALS = {
  silk: {
    name: 'Silk',
    color: '#8C7FC0',
    background: '#F3F0FA',
    stiffness: 0.06,
    reach: 150,
    strength: 0.8,
    grains: false,
  },
  sand: {
    name: 'Sand',
    color: '#A98552',
    background: '#F7F0E4',
    stiffness: 0.02,
    reach: 95,
    strength: 0.55,
    grains: true,
  },
  moss: {
    name: 'Moss',
    color: '#3F6B4F',
    background: '#ECF2EC',
    stiffness: 0.14,
    reach: 120,
    strength: 1.1,
    grains: false,
  },
} satisfies Record<string, Material>;
type MaterialKey = keyof typeof MATERIALS;
const MATERIAL_KEYS = Object.keys(MATERIALS) as MaterialKey[];

interface GridPoint {
  homeX: number;
  homeY: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
  jitter: number;
}

interface Surface {
  points: GridPoint[];
  columns: number;
  width: number;
  height: number;
}

const OFF_SURFACE = -999;

function buildSurface(width: number, height: number): Surface {
  const spacing = width < 500 ? 16 : 20;
  const points: GridPoint[] = [];
  for (let y = -spacing; y <= height + spacing; y += spacing) {
    for (let x = -spacing; x <= width + spacing; x += spacing) {
      points.push({
        homeX: x,
        homeY: y,
        offsetX: 0,
        offsetY: 0,
        velocityX: 0,
        velocityY: 0,
        jitter: (Math.random() - 0.5) * 2,
      });
    }
  }
  return { points, columns: Math.round((width + 2 * spacing) / spacing) + 1, width, height };
}

export function TouchStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<Surface>({ points: [], columns: 0, width: 0, height: 0 });
  const pointer = useRef({ x: OFF_SURFACE, y: OFF_SURFACE, pressed: false });
  const [material, setMaterial] = useState<MaterialKey>('silk');
  const { name, color, background, stiffness, reach, strength, grains }: Material =
    MATERIALS[material];

  const select = (key: MaterialKey) => {
    setMaterial(key);
    surfaceRef.current.points.forEach((point) => {
      point.velocityX += (Math.random() - 0.5) * 4;
      point.velocityY += (Math.random() - 0.5) * 4;
    });
  };

  const track = (event: PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    pointer.current.x = event.clientX - rect.left;
    pointer.current.y = event.clientY - rect.top;
  };

  const press = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as Element).closest('.sctrl')) return;
    pointer.current.pressed = true;
    track(event);
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
      navigator.vibrate?.(12);
    } catch {
      // Capture and haptics are enhancements only.
    }
  };

  const release = () => {
    pointer.current.pressed = false;
  };

  const leave = () => {
    if (pointer.current.pressed) return;
    pointer.current.x = OFF_SURFACE;
    pointer.current.y = OFF_SURFACE;
  };

  useStageCanvas(stageRef, canvasRef, ({ c, w, h }) => {
    if (Math.abs(w - surfaceRef.current.width) > 2 || Math.abs(h - surfaceRef.current.height) > 2) {
      surfaceRef.current = buildSurface(w, h);
    }
    const { points, columns } = surfaceRef.current;
    const { x: px, y: py, pressed } = pointer.current;
    const radius = reach * (pressed ? 1.35 : 1);
    const force = strength * (pressed ? 2.2 : 1);

    for (const p of points) {
      let targetX = 0;
      let targetY = 0;
      const dx = p.homeX - px;
      const dy = p.homeY - py;
      const distance = Math.hypot(dx, dy);
      if (distance < radius && distance > 0) {
        const push = Math.pow(1 - distance / radius, 2) * force * 26;
        targetX = (dx / distance) * push;
        targetY = (dy / distance) * push;
      }
      p.velocityX += (targetX - p.offsetX) * stiffness;
      p.velocityY += (targetY - p.offsetY) * stiffness;
      p.velocityX *= 0.84;
      p.velocityY *= 0.84;
      p.offsetX += p.velocityX;
      p.offsetY += p.velocityY;
    }

    c.clearRect(0, 0, w, h);
    c.strokeStyle = color;
    c.fillStyle = color;
    c.globalAlpha = 0.55;

    if (grains) {
      for (const p of points) {
        const near = Math.hypot(p.homeX + p.offsetX - px, p.homeY + p.offsetY - py);
        const size = 1.3 + (near < radius ? (1 - near / radius) * 1.8 : 0);
        c.beginPath();
        c.arc(
          p.homeX + p.offsetX + p.jitter * 2,
          p.homeY + p.offsetY + p.jitter * 1.5,
          size,
          0,
          6.283,
        );
        c.fill();
      }
    } else {
      const line = (indices: Iterable<number>) => {
        let started = false;
        c.beginPath();
        for (const i of indices) {
          const p = points[i];
          if (started) c.lineTo(p.homeX + p.offsetX, p.homeY + p.offsetY);
          else c.moveTo(p.homeX + p.offsetX, p.homeY + p.offsetY);
          started = true;
        }
        c.stroke();
      };
      c.lineWidth = material === 'moss' ? 1.4 : 1;
      for (let start = 0; start < points.length; start += columns) {
        line(range(start, Math.min(start + columns, points.length), 1));
      }
      // Moss is cross-woven; silk is horizontal threads only.
      if (material === 'moss') {
        for (let start = 0; start < columns; start++) line(range(start, points.length, columns));
      }
    }
    c.globalAlpha = 1;
  });

  return (
    <div
      className="sstage"
      id="touchStage"
      ref={stageRef}
      style={{ touchAction: 'none', background }}
      onPointerDown={press}
      onPointerMove={track}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={leave}
    >
      <canvas
        id="fabric"
        aria-label="Touch surface: press and drag"
        role="img"
        ref={canvasRef}
      ></canvas>
      <div className="sread">
        <b id="matName">{name}</b>
        <span>Press and drag across the surface.</span>
      </div>
      <div className="sctrl glass">
        <div className="chips" id="matBtns">
          {MATERIAL_KEYS.map((key) => (
            <button
              key={key}
              className={material === key ? 'on' : undefined}
              onClick={() => select(key)}
            >
              {MATERIALS[key].name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function* range(start: number, end: number, step: number) {
  for (let i = start; i < end; i += step) yield i;
}
