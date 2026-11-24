import * as THREE from 'three';
import { FILM_CHAPTERS } from '../../data/film';
import {
  clamp01,
  easeInOut,
  glowing,
  PALETTE,
  physical,
  type ChapterScene,
  type FilmKit,
} from './kit';

type ChapterBuilder = (kit: FilmKit, camera: THREE.PerspectiveCamera) => ChapterScene;

/** Start times of a chapter's captions, which the visuals are cued to. */
const cues = (chapter: number) => FILM_CHAPTERS[chapter].captions.map(([start]) => start);

type Point = [number, number, number];

/** [ax, ay, az, bx, by, bz, radius] capsules: head, torso, legs, arms. */
const BODY_CAPSULES = [
  [0, 1.95, 0, 0, 1.95, 0, 0.5],
  [0, 0.2, 0, 0, 1.15, 0, 0.72],
  [-0.3, -1.6, 0, -0.25, -0.1, 0, 0.26],
  [0.3, -1.6, 0, 0.25, -0.1, 0, 0.26],
  [-0.95, 1.05, 0, -1.25, -0.35, 0.1, 0.2],
  [0.95, 1.05, 0, 1.25, -0.35, 0.1, 0.2],
];

/** Signed distance from a point to the body. */
function bodyDistance(x: number, y: number, z: number): number {
  let distance = 1e9;
  for (const [ax, ay, az, bx, by, bz, radius] of BODY_CAPSULES) {
    const px = x - ax;
    const py = y - ay;
    const pz = z - az;
    const ex = bx - ax;
    const ey = by - ay;
    const ez = bz - az;
    const length2 = ex * ex + ey * ey + ez * ez;
    const h = length2 ? Math.max(0, Math.min(1, (px * ex + py * ey + pz * ez) / length2)) : 0;
    distance = Math.min(distance, Math.hypot(px - ex * h, py - ey * h, pz - ez * h) - radius);
  }
  return distance;
}

/** 1 · A human form assembling itself out of microbes. */
const superorganism: ChapterBuilder = ({ random, tiny, randomColor, dummy }, camera) => {
  const group = new THREE.Group();
  const COUNT = 4200;

  const shell: Point[] = [];
  while (shell.length < COUNT) {
    const x = (random() - 0.5) * 3;
    const y = -1.9 + random() * 4.5;
    const z = (random() - 0.5) * 1.6;
    const d = bodyDistance(x, y, z);
    if (d < 0 && d > -0.14) shell.push([x, y, z]);
  }

  const swarm = new THREE.InstancedMesh(tiny, physical(0xffffff, { roughness: 0.45 }), COUNT);
  swarm.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(swarm);

  const color = new THREE.Color();
  const particles = shell.map((target, i) => {
    const a = random() * 6.283;
    const b = Math.acos(2 * random() - 1);
    const r = 6 + random() * 6;
    color.setHex(randomColor());
    swarm.setColorAt(i, color);
    return {
      target,
      start: [
        Math.sin(b) * Math.cos(a) * r,
        Math.cos(b) * r * 0.7,
        Math.sin(b) * Math.sin(a) * r,
      ] as Point,
      scale: 0.022 + random() * 0.03,
      delay: random() * 0.6,
      phase: random() * 6.28,
    };
  });
  swarm.instanceColor!.needsUpdate = true;

  return {
    group,
    labels: [],
    update(t, duration) {
      const progress = t / (duration * 0.42);
      particles.forEach(({ target, start, scale, delay, phase }, i) => {
        const k = easeInOut((progress - delay * 0.6) / 0.55);
        const wobble = Math.sin(t * 1.3 + phase) * 0.02;
        dummy.position.set(
          start[0] + (target[0] - start[0]) * k + wobble,
          start[1] + (target[1] - start[1]) * k + wobble,
          start[2] + (target[2] - start[2]) * k,
        );
        dummy.scale.setScalar(scale * (0.4 + 0.6 * k));
        dummy.updateMatrix();
        swarm.setMatrixAt(i, dummy.matrix);
      });
      swarm.instanceMatrix.needsUpdate = true;
      group.rotation.y = -0.5 + t * 0.09;
      camera.position.set(
        Math.sin(t * 0.05) * 1.2,
        0.55 + (1 - t / duration) * 0.6,
        5 + easeInOut(t / duration) * 5.5,
      );
      camera.lookAt(0, 0.35, 0);
    },
  };
};

/** 2 · Drifting past rods, spheres, chains and spirals. */
const microbiome: ChapterBuilder = ({ random, microbe }, camera) => {
  const group = new THREE.Group();
  const colors = [1, 2, 0, 1, 3, 2];
  const microbes = Array.from({ length: 64 }, (_, i) => {
    const object = microbe(i % 4, PALETTE[colors[i % 6]]);
    const z = -12 + random() * 14;
    object.position.set((random() - 0.5) * (10 + -z * 0.8), (random() - 0.5) * (5 + -z * 0.4), z);
    object.rotation.set(random() * 6, random() * 6, random() * 6);
    const spin = [(random() - 0.5) * 0.4, (random() - 0.5) * 0.5, (random() - 0.5) * 0.3];
    const phase = random() * 6.28;
    object.scale.setScalar(0.9 + random() * 0.7);
    group.add(object);
    return { object, spin, phase, y: object.position.y };
  });

  return {
    group,
    labels: [],
    update(t, duration) {
      for (const { object, spin, phase, y } of microbes) {
        object.rotation.x += spin[0] * 0.016;
        object.rotation.y += spin[1] * 0.016;
        object.rotation.z += spin[2] * 0.016;
        object.position.y = y + Math.sin(t * 0.5 + phase) * 0.18;
      }
      camera.position.set(
        -1.6 + easeInOut(t / duration) * 3.2,
        0.2,
        6.2 - easeInOut(t / duration) * 1.4,
      );
      camera.lookAt(0, 0, -3);
    },
  };
};

/** 3 · A microbial colony linked to digestion, immunity and vitamins. */
const whatTheyDo: ChapterBuilder = ({ random, tiny, small, randomColor, dummy }, camera) => {
  const group = new THREE.Group();
  const COUNT = 520;
  const colony = new THREE.InstancedMesh(tiny, physical(0xffffff), COUNT);
  group.add(colony);

  const color = new THREE.Color();
  const cells = Array.from({ length: COUNT }, (_, i) => {
    const a = random() * 6.283;
    const b = Math.acos(2 * random() - 1);
    const r = 0.55 + Math.pow(random(), 0.5) * 0.6;
    const cell = [
      Math.sin(b) * Math.cos(a) * r,
      Math.cos(b) * r,
      Math.sin(b) * Math.sin(a) * r,
      0.035 + random() * 0.04,
    ];
    color.setHex(randomColor());
    colony.setColorAt(i, color);
    return cell;
  });
  colony.instanceColor!.needsUpdate = true;

  const [, digestion, immunity, vitamins] = cues(2);
  const roles: [name: string, angle: number, appearsAt: number][] = [
    ['Digestion', -Math.PI / 2 + Math.PI, digestion],
    ['Immunity', Math.PI / 6, immunity],
    ['Vitamins', (Math.PI * 5) / 6 + Math.PI / 3, vitamins],
  ];
  const nodes = roles.map(([name, angle, appearsAt], i) => {
    const position = new THREE.Vector3(Math.cos(angle) * 3.1, Math.sin(angle) * 2.1, (i - 1) * 0.4);
    const node = new THREE.Group();
    node.position.copy(position);
    node.add(
      new THREE.Mesh(new THREE.SphereGeometry(0.36, 40, 30), physical(0xf7f8f2, { clearcoat: 1 })),
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.56, 0.018, 12, 80),
      glowing(0xa4c94a, 0.5),
    );
    node.add(ring);
    const link = new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.LineCurve3(new THREE.Vector3(), position),
        20,
        0.012,
        8,
        false,
      ),
      new THREE.MeshStandardMaterial({ color: 0xc7d99e }),
    );
    const pulses = [0, 1, 2].map(() => {
      const pulse = new THREE.Mesh(small, glowing(0xa4c94a, 0.8));
      pulse.scale.setScalar(0.45);
      group.add(pulse);
      return pulse;
    });
    group.add(link);
    group.add(node);
    return { name, position, node, ring, link, pulses, appearsAt };
  });

  return {
    group,
    labels: nodes.map(({ name, position, appearsAt }) => ({
      text: name,
      position,
      at: appearsAt,
      dy: -0.75,
    })),
    update(t, duration) {
      cells.forEach(([x, y, z, scale], i) => {
        dummy.position.set(x, y, z);
        dummy.scale.setScalar(scale * (1 + Math.sin(t * 2 + i) * 0.1));
        dummy.updateMatrix();
        colony.setMatrixAt(i, dummy.matrix);
      });
      colony.instanceMatrix.needsUpdate = true;
      colony.rotation.y = t * 0.25;
      colony.rotation.x = t * 0.1;

      nodes.forEach(({ position, node, ring, link, pulses, appearsAt }, i) => {
        const k = easeInOut((t - appearsAt) / 0.9);
        node.scale.setScalar(Math.max(0.0001, k));
        link.visible = k > 0;
        ring.rotation.x = t * 0.8 + i;
        ring.rotation.y = t * 0.6;
        pulses.forEach((pulse, q) => {
          const f = (t * 0.5 + q / 3) % 1;
          pulse.visible = k > 0.5;
          pulse.position.copy(position).multiplyScalar(f);
        });
      });
      camera.position.set(
        Math.sin(t * 0.12) * 1.4,
        0.3 + Math.cos(t * 0.1) * 0.4,
        9.2 - easeInOut(t / duration) * 0.8,
      );
      camera.lookAt(0, 0, 0);
    },
  };
};

/** 4 · Microbes fermenting fibre above the colon lining. */
const feedTheCommunity: ChapterBuilder = ({ random, tiny, microbe, dummy }, camera) => {
  const group = new THREE.Group();

  const lining = new THREE.PlaneGeometry(34, 16, 170, 80);
  lining.rotateX(-Math.PI / 2);
  const vertices = lining.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < vertices.count; i++) {
    const x = vertices.getX(i);
    const z = vertices.getZ(i);
    vertices.setY(
      i,
      Math.sin(x * 1.6) * 0.18 * Math.cos(z * 1.3) + Math.sin(z * 0.7 + x * 0.3) * 0.25,
    );
  }
  lining.computeVertexNormals();
  const floor = new THREE.Mesh(lining, physical(0xc7d99e, { roughness: 0.55, clearcoat: 0.4 }));
  floor.position.y = -2.3;
  group.add(floor);

  const fibres = new THREE.Group();
  group.add(fibres);
  for (let k = 0; k < 7; k++) {
    const points: THREE.Vector3[] = [];
    for (let x = -14; x <= 14; x += 2) {
      points.push(
        new THREE.Vector3(
          x,
          -0.1 + k * 0.26 + Math.sin(x * 0.4 + k) * 0.3,
          -2.5 + k * 0.7 + Math.cos(x * 0.3 + k) * 0.5,
        ),
      );
    }
    fibres.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 200, 0.055, 10, false),
        physical(0xede6d6, { roughness: 0.5 }),
      ),
    );
  }

  const crowd = Array.from({ length: 34 }, (_, i) => {
    const object = microbe(i % 3 === 2 ? 1 : i % 3, PALETTE[[1, 0, 2][i % 3]]);
    object.position.set(
      (random() - 0.5) * 3.6,
      0.2 + (random() - 0.5) * 1.4,
      (random() - 0.5) * 2.4,
    );
    object.rotation.set(random() * 6, random() * 6, random() * 6);
    group.add(object);
    return { object, y: object.position.y, phase: random() * 6.28 };
  });

  const COUNT = 260;
  const acids = new THREE.InstancedMesh(
    tiny,
    new THREE.MeshStandardMaterial({
      color: 0xa4c94a,
      emissive: 0xa4c94a,
      emissiveIntensity: 0.55,
      roughness: 0.3,
    }),
    COUNT,
  );
  group.add(acids);
  const droplets = Array.from({ length: COUNT }, () => ({
    origin: [(random() - 0.5) * 3.4, 0.1 + (random() - 0.5) * 1.2, (random() - 0.5) * 2.4] as Point,
    speed: 0.5 + random() * 0.8,
    delay: random(),
    drift: (random() - 0.5) * 3,
  }));

  const [fibreAt, acidsAt, liningAt] = cues(3);

  return {
    group,
    labels: [
      { text: 'Fibre', position: new THREE.Vector3(-3.2, 1.7, -1), at: fibreAt },
      {
        text: 'Short-chain fatty acids',
        position: new THREE.Vector3(3.2, -0.6, 0),
        at: acidsAt + 0.6,
      },
      { text: 'Colon lining', position: new THREE.Vector3(-3.4, -2.1, 1.5), at: liningAt },
    ],
    update(t, duration) {
      fibres.position.x = -6 + easeInOut((t - fibreAt) / 4) * 6 + Math.sin(t * 0.3) * 0.3;
      for (const { object, y, phase } of crowd) {
        object.position.y = y + Math.sin(t * 1.4 + phase) * 0.1;
        object.rotation.y += 0.01;
      }
      droplets.forEach(({ origin, speed, delay, drift }, i) => {
        const f = t < acidsAt ? -1 : ((t - acidsAt) * speed * 0.32 + delay) % 1;
        if (f < 0) {
          dummy.scale.setScalar(0.0001);
        } else {
          dummy.position.set(origin[0] + drift * f, origin[1] - f * 2.3, origin[2]);
          dummy.scale.setScalar(0.05 * (1 - f * 0.5));
        }
        dummy.updateMatrix();
        acids.setMatrixAt(i, dummy.matrix);
      });
      acids.instanceMatrix.needsUpdate = true;
      camera.position.set(Math.sin(t * 0.08) * 1.5, 2.8, 10.5 - easeInOut(t / duration) * 1.5);
      camera.lookAt(0, -0.6, 0);
    },
  };
};

function brainGeometry(): THREE.SphereGeometry {
  const geometry = new THREE.SphereGeometry(1.25, 160, 120);
  const vertices = geometry.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < vertices.count; i++) {
    v.fromBufferAttribute(vertices, i);
    const n = v.clone().normalize();
    const folds =
      0.055 *
      (Math.sin(9 * n.x + 3 * n.y) + Math.sin(8 * n.y + 4 * n.z) + Math.sin(10 * n.z + 2 * n.x));
    const fissure = Math.abs(n.x) < 0.06 ? 0.12 : 0;
    v.copy(n).multiplyScalar(1.25 + (folds - fissure));
    v.x *= 1.18;
    v.y *= 0.92;
    vertices.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** 5 · Signals travelling both ways between gut and brain. */
const gutBrainAxis: ChapterBuilder = ({ small }, camera) => {
  const group = new THREE.Group();

  const brain = new THREE.Mesh(
    brainGeometry(),
    physical(0xf3eee2, { roughness: 0.42, clearcoat: 0.7 }),
  );
  brain.position.set(1.9, 1.05, 0);
  brain.scale.setScalar(0.85);
  group.add(brain);

  const coil: THREE.Vector3[] = [];
  for (let i = 0; i <= 40; i++) {
    const a = i / 40;
    coil.push(
      new THREE.Vector3(
        Math.sin(a * Math.PI * 5) * 0.9 * (1 - a * 0.3),
        -a * 1.8 + 0.9,
        Math.cos(a * Math.PI * 5) * 0.4,
      ),
    );
  }
  const gut = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(coil), 300, 0.2, 16, false),
    physical(0xa4c94a, { roughness: 0.4 }),
  );
  gut.position.set(-2, -0.85, 0);
  gut.scale.setScalar(0.85);
  group.add(gut);

  const axis = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2, -0.05, 0),
    new THREE.Vector3(-2.3, 1.1, 0.6),
    new THREE.Vector3(-0.5, 1.7, 0.4),
    new THREE.Vector3(0.95, 0.95, 0.2),
  ]);
  const link = new THREE.Mesh(
    new THREE.TubeGeometry(axis, 200, 0.022, 8, false),
    new THREE.MeshStandardMaterial({ color: 0x59750b }),
  );
  group.add(link);

  const pulses = Array.from({ length: 8 }, (_, i) => {
    const pulse = new THREE.Mesh(
      small,
      new THREE.MeshStandardMaterial({
        color: i % 2 ? 0xf7f8f2 : 0xa4c94a,
        emissive: i % 2 ? 0xffffff : 0xa4c94a,
        emissiveIntensity: i % 2 ? 0.4 : 0.8,
      }),
    );
    pulse.scale.setScalar(0.55);
    group.add(pulse);
    return pulse;
  });

  const axisAt = cues(4)[1];

  return {
    group,
    labels: [
      { text: 'Gut', position: new THREE.Vector3(-3.4, -1, 0), at: 0.3 },
      { text: 'Brain', position: new THREE.Vector3(3.6, 1.1, 0), at: 0.3 },
      {
        text: 'Vagus nerve, hormones, immune signals',
        position: new THREE.Vector3(-1.6, 1.9, 0.5),
        at: axisAt,
      },
    ],
    update(t, duration) {
      brain.rotation.y = Math.sin(t * 0.3) * 0.35;
      gut.rotation.y = t * 0.25;
      const k = clamp01((t - axisAt + 1.2) / 1.2);
      link.visible = k > 0;
      pulses.forEach((pulse, i) => {
        const f = (t * 0.28 + i / 8) % 1;
        pulse.visible = k >= 1;
        // Even pulses travel gut to brain, odd ones back.
        pulse.position.copy(axis.getPointAt(i % 2 === 0 ? f : 1 - f));
      });
      camera.position.set(Math.sin(t * 0.1) * 1.6, 0.3, 11 - easeInOut(t / duration) * 1.2);
      camera.lookAt(0, 0.25, 0);
    },
  };
};

/** Order matters: the builders share one seeded random sequence. */
export const CHAPTER_BUILDERS: ChapterBuilder[] = [
  superorganism,
  microbiome,
  whatTheyDo,
  feedTheCommunity,
  gutBrainAxis,
];
