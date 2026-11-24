import * as THREE from 'three';

/** Forest, lime, moss, sand, off-white. */
export const PALETTE = [0x59750b, 0xa4c94a, 0xc7d99e, 0xede6d6, 0xf7f8f2];

export interface FilmLabel {
  text: string;
  position: THREE.Vector3;
  /** Seconds into the chapter at which the label appears. */
  at: number;
  /** Vertical nudge in world units. */
  dy?: number;
}

export interface ChapterScene {
  group: THREE.Group;
  labels: FilmLabel[];
  update: (time: number, duration: number) => void;
}

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export const easeInOut = (x: number) => {
  const k = clamp01(x);
  return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
};

export function physical(
  color: THREE.ColorRepresentation,
  overrides: THREE.MeshPhysicalMaterialParameters = {},
) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.36,
    metalness: 0,
    clearcoat: 0.9,
    clearcoatRoughness: 0.22,
    sheen: 0.7,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color(0xffffff),
    ...overrides,
  });
}

export function glowing(color: THREE.ColorRepresentation, emissiveIntensity: number) {
  return new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity });
}

class Helix extends THREE.Curve<THREE.Vector3> {
  override getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 6;
    return target.set(Math.cos(angle) * 0.12, (t - 0.5) * 1.15, Math.sin(angle) * 0.12);
  }
}

/** Shared geometry plus a seeded random source, so the film looks the same every time. */
export function createKit() {
  let seed = 11;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  const rod = new THREE.CapsuleGeometry(0.16, 0.5, 8, 20);
  const ball = new THREE.SphereGeometry(0.21, 28, 20);
  const tiny = new THREE.SphereGeometry(1, 10, 8);
  const small = new THREE.SphereGeometry(0.13, 20, 14);
  const helix = new THREE.TubeGeometry(new Helix(), 140, 0.05, 10, false);

  /** 0 rod, 1 sphere, 2 chain, 3 spiral. */
  const microbe = (type: number, color: number): THREE.Object3D => {
    const material = physical(color);
    if (type === 0) return new THREE.Mesh(rod, material);
    if (type === 1) return new THREE.Mesh(ball, material);
    if (type === 2) {
      const chain = new THREE.Group();
      for (let k = 0; k < 4; k++) {
        const bead = new THREE.Mesh(small, material);
        bead.position.x = (k - 1.5) * 0.24;
        chain.add(bead);
      }
      return chain;
    }
    return new THREE.Mesh(helix, material);
  };

  /** Weighted palette pick: mostly lime, some forest and moss. */
  const randomColor = () => {
    const r = random();
    return PALETTE[r < 0.38 ? 1 : r < 0.62 ? 0 : r < 0.86 ? 2 : r < 0.95 ? 3 : 4];
  };

  return { random, tiny, small, microbe, randomColor, dummy: new THREE.Object3D() };
}

export type FilmKit = ReturnType<typeof createKit>;
