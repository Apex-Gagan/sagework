import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import organsUrl from '../../assets/anatomy/organs.glb?url';
import { prefersReducedMotion } from '../../lib/motion';
import { createRenderer, createStudioEnvironment, disposeRenderer } from '../studio';
import { createTissue, createTissueNoise, srgb, type Tissue, type TissueOptions } from './tissue';

type OrganName =
  'esophagus' | 'stomach' | 'small' | 'colon' | 'taenia' | 'cortex' | 'cerebellum' | 'stem';

export type AnatomyLabel = 'stomach' | 'small' | 'colon' | 'axis' | 'brain';

export interface GutAnatomy {
  /** Scroll position through the journey, 0 to 4 (one unit per step). */
  setPosition: (position: number) => void;
  resize: () => void;
  dispose: () => void;
}

interface GutAnatomyOptions {
  onReady: () => void;
  /** Screen position of a label, as percentages of the host. */
  onLabel: (label: AnatomyLabel, left: number, top: number) => void;
}

const TISSUES: Record<OrganName, TissueOptions> = {
  esophagus: {
    color: '#bd6a5c',
    deep: '#54191a',
    vessel: '#7d1c20',
    vessels: 0.5,
    cutEnd: 0.07,
    bump: 0.5,
    grain: 9,
    roughness: 0.46,
    waveWidth: 0.07,
  },
  stomach: {
    color: '#c96f62',
    deep: '#5c1c1c',
    vessel: '#84161d',
    vessels: 0.45,
    bump: 0.55,
    grain: 7,
    roughness: 0.42,
    waveWidth: 0.075,
  },
  small: {
    color: '#d98d7c',
    deep: '#6e2422',
    vessel: '#932a2e',
    vessels: 0.5,
    swell: 0.01,
    cutEnd: 0.012,
    bump: 0.5,
    grain: 11,
    roughness: 0.42,
    waveWidth: 0.03,
  },
  colon: {
    color: '#bf7f6a',
    deep: '#5c2620',
    vessel: '#86282c',
    vessels: 0.5,
    bump: 0.6,
    grain: 8,
    roughness: 0.46,
    waveWidth: 0.05,
  },
  taenia: {
    color: '#e2bda3',
    deep: '#8a5645',
    vessel: '#96403e',
    vessels: 0.2,
    bump: 0.4,
    grain: 10,
    roughness: 0.5,
    waveWidth: 0.05,
  },
  cortex: {
    color: '#d0917f',
    deep: '#641f24',
    vessel: '#7c121c',
    vessels: 0.55,
    bump: 0.4,
    grain: 8,
    roughness: 0.4,
  },
  cerebellum: {
    color: '#be7f73',
    deep: '#501a1e',
    vessel: '#761a22',
    vessels: 0.6,
    bump: 0.4,
    grain: 12,
    roughness: 0.44,
  },
  stem: {
    color: '#dbb396',
    deep: '#774a3d',
    vessel: '#8e3c3a',
    vessels: 0.4,
    bump: 0.4,
    grain: 9,
    roughness: 0.48,
  },
};

const ORGANS = Object.keys(TISSUES) as OrganName[];
const BRAIN: OrganName[] = ['cortex', 'cerebellum', 'stem'];

/** Body millimetres (y up, z to the front) to scene units. */
const at = (x: number, y: number, z: number) =>
  new THREE.Vector3(x * 0.01, (y - 1190) * 0.01, (z - 90) * 0.01);

const LABEL_ANCHORS: Record<AnatomyLabel, THREE.Vector3> = {
  stomach: at(84, 1146, 120),
  small: at(58, 1000, 160),
  colon: at(-110, 1000, 120),
  axis: at(14, 1300, 84),
  brain: at(0, 1642, 80),
};

/** Vagus nerve: brainstem, neck, then along the oesophagus to stomach and bowel. */
const VAGUS = [
  [
    at(9, 1482, 66),
    at(15, 1462, 74),
    at(19, 1425, 80),
    at(18, 1380, 84),
    at(16, 1320, 84),
    at(13, 1265, 80),
    at(13, 1210, 88),
    at(15, 1160, 108),
    at(20, 1122, 136),
    at(16, 1098, 152),
    at(-4, 1072, 162),
    at(-8, 1030, 160),
    at(2, 985, 162),
  ],
  [
    at(-9, 1482, 66),
    at(-15, 1462, 74),
    at(-19, 1425, 80),
    at(-18, 1380, 80),
    at(-15, 1320, 76),
    at(-12, 1265, 70),
    at(-8, 1210, 66),
    at(-2, 1160, 82),
    at(6, 1122, 100),
    at(-10, 1090, 128),
    at(-34, 1050, 144),
    at(-62, 1010, 150),
    at(-84, 960, 152),
  ],
];

interface Shot {
  at: number;
  target: THREE.Vector3;
  halfHeight: number;
  halfWidth: number;
  yaw: number;
}

const shot = (
  position: number,
  target: THREE.Vector3,
  halfHeight: number,
  halfWidth: number,
  yaw: number,
): Shot => ({ at: position, target, halfHeight, halfWidth, yaw });

/** Camera moves, keyed to scroll position. */
const SHOTS: Shot[] = [
  shot(0, at(10, 1255, 90), 1.55, 0.9, -0.5),
  shot(0.55, at(28, 1140, 110), 1.15, 1.0, -0.3),
  shot(0.9, at(34, 1098, 120), 0.86, 0.95, -0.2),
  shot(1.2, at(4, 985, 120), 1.32, 1.28, 0.12),
  shot(1.85, at(0, 965, 120), 1.22, 1.22, 0.3),
  shot(2.2, at(-4, 925, 100), 1.8, 1.42, 0.05),
  shot(2.85, at(-4, 925, 100), 1.8, 1.42, -0.3),
  shot(3.3, at(0, 1195, 90), 4.75, 1.6, -0.12),
  shot(3.6, at(0, 1225, 90), 4.45, 1.5, 0.12),
  shot(4, at(0, 1535, 80), 1.22, 1.05, 0.78),
];

const smooth = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const ramp = (x: number, from: number, to: number) => smooth(clamp01((x - from) / (to - from)));
/** 1 inside [from, to], easing over `edge` either side. */
const within = (x: number, from: number, to: number, edge = 0.12) =>
  ramp(x, from - edge, from + edge) * (1 - ramp(x, to - edge, to + edge));

/** Returns null when WebGL is unavailable. */
export function createGutAnatomy(
  host: HTMLElement,
  { onReady, onLabel }: GutAnatomyOptions,
): GutAnatomy | null {
  const renderer = createRenderer(
    { antialias: true, alpha: true, powerPreference: 'high-performance' },
    { maxPixelRatio: 1.75, exposure: 1.05 },
  );
  if (!renderer) return null;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.environment = createStudioEnvironment(renderer, {
    ambient: [0.5, 0.49, 0.47],
    warmth: 0.95,
    blur: 0.04,
    lights: [
      { position: [0, 12, 2], scale: [12, 0.2, 8], intensity: 5 },
      { position: [-13, 4, 4], scale: [0.2, 9, 8], intensity: 4 },
      { position: [13, 0, 2], scale: [0.2, 7, 6], intensity: 1.6 },
      { position: [0, 2, 13], scale: [7, 4, 0.2], intensity: 1.4 },
    ],
  });
  const key = new THREE.DirectionalLight(0xfff1e4, 1.15);
  key.position.set(-4, 6, 7);
  const rimLight = new THREE.DirectionalLight(0xdfe8ff, 0.55);
  rimLight.position.set(5, 3, -6);
  scene.add(key, rimLight, new THREE.HemisphereLight(0xfff4ee, 0x8a3626, 0.2));

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 120);
  const body = new THREE.Group();
  scene.add(body);

  const organs = new Map<OrganName, { mesh: THREE.Mesh; depth: THREE.Mesh; tissue: Tissue }>();
  const noise = createTissueNoise();
  let disposed = false;
  let ready = false;

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(organsUrl, (gltf) => {
    if (disposed) return;
    for (const name of ORGANS) {
      const source = gltf.scene.getObjectByName(name) as THREE.Mesh | undefined;
      if (!source) continue;
      const tissue = createTissue(TISSUES[name], noise);
      source.updateMatrix();
      tissue.uniforms.uLocal.value.copy(source.matrix);
      tissue.uniforms.uInvScale.value = 1 / source.scale.x;
      const mesh = new THREE.Mesh(source.geometry, tissue.material);
      mesh.matrixAutoUpdate = false;
      mesh.matrix.copy(source.matrix);
      // Ghosted organs lay down depth first, so only their nearest surface shows.
      const depth = new THREE.Mesh(
        source.geometry,
        // `transparent` only to queue it after every focused organ.
        new THREE.MeshBasicMaterial({ colorWrite: false, transparent: true }),
      );
      depth.matrixAutoUpdate = false;
      depth.matrix.copy(source.matrix);
      depth.renderOrder = 1;
      depth.visible = false;
      body.add(mesh, depth);
      organs.set(name, { mesh, depth, tissue });
    }
    // Compile each kind of material now, one per turn, rather than when it first scrolls into view.
    const tissues = [...organs.values()];
    const groups: THREE.Object3D[][] = [
      tissues.map(({ mesh }) => mesh),
      tissues.map(({ depth }) => depth),
      nerves.map(({ mesh }) => mesh),
      pulses.map(({ mesh }) => mesh),
    ];
    const warmUp = (index: number) => {
      if (disposed) return;
      if (index === groups.length) {
        ready = true;
        draw(performance.now());
        onReady();
        return;
      }
      groups.forEach((group, i) => group.forEach((object) => (object.visible = i === index)));
      renderer.render(scene, camera);
      window.setTimeout(() => warmUp(index + 1), 30);
    };
    warmUp(0);
  });

  // ---------- vagus nerve and its signals
  const nerveMaterial = new THREE.MeshPhysicalMaterial({
    color: srgb('#f0dc8c'),
    roughness: 0.4,
    clearcoat: 0.5,
    emissive: srgb('#c9a93a'),
    emissiveIntensity: 0.25,
  });
  const nerves = VAGUS.map((points) => {
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
    const geometry = new THREE.TubeGeometry(curve, 260, 0.017, 10, false);
    const mesh = new THREE.Mesh(geometry, nerveMaterial);
    body.add(mesh);
    return { curve, geometry, mesh, total: geometry.index!.count };
  });
  const pulseGeometry = new THREE.SphereGeometry(0.036, 16, 12);
  const pulses = nerves.flatMap(({ curve }, nerve) =>
    Array.from({ length: 6 }, (_, i) => {
      const up = i % 2 === 0;
      const mesh = new THREE.Mesh(
        pulseGeometry,
        new THREE.MeshBasicMaterial({ color: srgb(up ? '#a4c94a' : '#ffffff') }),
      );
      body.add(mesh);
      return { mesh, curve, up, offset: i / 6 + nerve * 0.09 };
    }),
  );

  // ---------- camera
  let position = 0;
  let shown = 0;
  let width = 0;
  let height = 0;

  const aim = { target: new THREE.Vector3(), halfHeight: 1, halfWidth: 1, yaw: 0 };
  const frameShot = (p: number) => {
    let i = 0;
    while (i < SHOTS.length - 2 && p > SHOTS[i + 1].at) i++;
    const a = SHOTS[i];
    const b = SHOTS[i + 1];
    const k = smooth(clamp01((p - a.at) / (b.at - a.at)));
    aim.target.lerpVectors(a.target, b.target, k);
    // Zoom geometrically so pulling back feels even.
    aim.halfHeight = a.halfHeight * Math.pow(b.halfHeight / a.halfHeight, k);
    aim.halfWidth = a.halfWidth * Math.pow(b.halfWidth / a.halfWidth, k);
    aim.yaw = a.yaw + (b.yaw - a.yaw) * k;
  };

  const lean = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const onPointerMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    lean.targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7;
    lean.targetX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
  };
  const onPointerLeave = () => {
    lean.targetX = 0;
    lean.targetY = 0;
  };
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerleave', onPointerLeave);

  const projected = new THREE.Vector3();
  const matrix = new THREE.Matrix4();

  const draw = (now: number) => {
    if (!ready || !width) return;
    const time = prefersReducedMotion ? 0 : now / 1000;
    const p = prefersReducedMotion ? 3.45 : shown;

    frameShot(p);
    lean.x += (lean.targetX - lean.x) * 0.06;
    lean.y += (lean.targetY - lean.y) * 0.06;
    const sway = prefersReducedMotion ? 0 : Math.sin(time * 0.45) * 0.09;
    // Turn about the point of interest, so it stays centred.
    body.position
      .copy(aim.target)
      .negate()
      .applyEuler(new THREE.Euler(lean.x, aim.yaw + sway + lean.y, 0));
    body.rotation.set(lean.x, aim.yaw + sway + lean.y, 0);

    const tan = Math.tan((camera.fov * Math.PI) / 360);
    const distance = Math.max(aim.halfHeight, aim.halfWidth / camera.aspect) / tan;
    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    body.updateMatrixWorld(true);

    // ---------- which organ is in focus, and where the food is
    const whole = ramp(p, 2.95, 3.25);
    const focus: Record<OrganName, number> = {
      esophagus: Math.max(1 - ramp(p, 1.0, 1.12), whole),
      stomach: Math.max(1 - ramp(p, 1.0, 1.12), whole),
      small: Math.max(within(p, 1.04, 2.02, 0.05), whole),
      colon: Math.max(within(p, 2.1, 3.4, 0.05), whole),
      taenia: Math.max(within(p, 2.1, 3.4, 0.05), whole),
      cortex: 1,
      cerebellum: 1,
      stem: 1,
    };
    const legs: Partial<Record<OrganName, [wave: number, on: number]>> = {
      esophagus: [p * 1.12, within(p, 0.05, 0.94, 0.04)],
      stomach: [p * 1.12, within(p, 0.05, 0.94, 0.04)],
      small: [(p - 1.1) / 0.82, within(p, 1.14, 1.92, 0.04)],
      colon: [(p - 2.18) / 0.74, within(p, 2.21, 2.92, 0.04)],
      taenia: [(p - 2.18) / 0.74, within(p, 2.21, 2.92, 0.04)],
    };

    for (const [name, { mesh, depth, tissue }] of organs) {
      const ghost = 1 - focus[name];
      const { material, uniforms } = tissue;
      uniforms.uGhost.value = ghost;
      uniforms.uTime.value = time;
      // With the stomach back in view, the bowel joins it again.
      if (name === 'small') uniforms.uCutEnd.value = 1 - whole;
      const leg = legs[name];
      if (leg) {
        uniforms.uWave.value = leg[0];
        // The depth pass has no wave, so a ghosted organ must not swell.
        uniforms.uWaveOn.value = ghost > 0.01 ? 0 : leg[1];
      }
      uniforms.uActivity.value = BRAIN.includes(name) ? ramp(p, 3.3, 3.7) : 0;
      mesh.visible = true;
      mesh.renderOrder = ghost > 0.01 ? 2 : 0;
      depth.visible = ghost > 0.01;
      matrix.multiplyMatrices(camera.matrixWorldInverse, body.matrixWorld);
      (material.userData.normalMatrixLocal as THREE.Matrix3).setFromMatrix4(matrix);
    }

    // ---------- the nerve grows up from the gut, then signals run both ways
    const growth = ramp(p, 3.0, 3.35);
    for (const { mesh, geometry, total } of nerves) {
      mesh.visible = growth > 0.001;
      const count = Math.floor((total * growth) / 60) * 60;
      geometry.setDrawRange(total - count, count);
    }
    const signalling = ramp(p, 3.3, 3.42);
    for (const { mesh, curve, up, offset } of pulses) {
      mesh.visible = signalling > 0.01;
      if (!mesh.visible) continue;
      const f = (time * 0.16 + offset) % 1;
      mesh.position.copy(curve.getPointAt(up ? 1 - f : f));
      mesh.scale.setScalar(signalling * (0.75 + 0.25 * Math.sin(time * 5 + offset * 20)));
    }

    renderer.render(scene, camera);

    for (const [label, anchor] of Object.entries(LABEL_ANCHORS) as [
      AnatomyLabel,
      THREE.Vector3,
    ][]) {
      projected.copy(anchor).applyMatrix4(body.matrixWorld).project(camera);
      onLabel(label, ((projected.x + 1) / 2) * 100, ((1 - projected.y) / 2) * 100);
    }
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    width = rect.width;
    height = rect.height;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    draw(performance.now());
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  let visible = false;
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  visibilityObserver.observe(host);

  let raf = 0;
  const frame = (now: number) => {
    if (visible && host.offsetParent !== null) {
      // Follow the scroll with a little weight.
      shown += (position - shown) * 0.12;
      draw(now);
    }
    raf = requestAnimationFrame(frame);
  };
  if (!prefersReducedMotion) raf = requestAnimationFrame(frame);

  return {
    setPosition(next) {
      position = next;
      // Arriving far from the current pose (page load, back button) jumps straight there.
      if (Math.abs(next - shown) > 1.5) shown = next;
    },
    resize,
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      disposeRenderer(renderer);
    },
  };
}
