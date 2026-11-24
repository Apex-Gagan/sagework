import * as THREE from 'three';
import { prefersReducedMotion } from '../lib/motion';
import { createRenderer, createStudioEnvironment, disposeRenderer } from './studio';

export interface TriadPrism {
  resize: () => void;
  dispose: () => void;
}

/** Glass triangle: distance from centre to each side before rounding, rounding, half depth. */
const INRADIUS = 0.95;
const ROUNDING = 0.55;
const HALF_DEPTH = 0.92;

/** Centre-to-corner distance of the path the three spheres travel along. */
const PATH_RADIUS = 1.12;
const SPHERE_RADIUS = 0.56;

/** The triangle's centroid sits low, so lift it less than its bounding box would suggest. */
const CENTRE_Y = -0.16;

/** Glass triangle holding the three forces. Leaves the CSS fallback in place without WebGL. */
export function createTriadPrism(host: HTMLElement): TriadPrism | null {
  const renderer = createRenderer(
    { antialias: true, powerPreference: 'high-performance' },
    { maxPixelRatio: 2, exposure: 1.05 },
  );
  if (!renderer) return null;
  host.prepend(renderer.domElement);
  host.classList.add('gl');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeea);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 10.5);
  scene.environment = createStudioEnvironment(renderer, {
    ambient: [0.62, 0.63, 0.6],
    warmth: 0.98,
    blur: 0.03,
    lights: [
      { position: [0, 12, 0], scale: [14, 0.2, 10], intensity: 6 },
      { position: [-13, 3, 2], scale: [0.2, 8, 10], intensity: 4 },
      { position: [13, -1, 3], scale: [0.2, 6, 6], intensity: 2.4 },
      { position: [0, 2, 13], scale: [8, 4, 0.2], intensity: 2 },
      { position: [4, -12, 0], scale: [6, 0.2, 6], intensity: 1.2 },
    ],
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.03,
    transmission: 1,
    ior: 1.42,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    attenuationColor: new THREE.Color(0xdcebb4),
    attenuationDistance: 9,
    specularIntensity: 1,
    envMapIntensity: 1.35,
    // Offsets the light lost to the two reflective layers, so the glass reads clear, not grey.
    emissive: new THREE.Color(0.03, 0.034, 0.02),
  });
  // Missing from the 0.149 parameter typings, though it is a real material property.
  glassMaterial.thickness = 0.75;
  const prism = roundedTriangleGeometry();
  const glass = new THREE.Mesh(prism, glassMaterial);
  // A green rim at grazing angles gives the pale glass its edge against the pale backdrop.
  const rim = new THREE.Mesh(prism, rimMaterial());
  rim.scale.setScalar(1.002);

  const body = new THREE.Group();
  body.add(glass, rim);
  scene.add(body);

  const spheres = [0x59750b, 0xa4c94a, 0xc7d99e].map((color) => {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(SPHERE_RADIUS, 96, 96),
      new THREE.MeshPhysicalMaterial({
        // 0.149 treats hex colours as linear; convert so the brand greens stay true.
        color: new THREE.Color(color).convertSRGBToLinear(),
        roughness: 0.32,
        metalness: 0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        envMapIntensity: 0.75,
      }),
    );
    body.add(sphere);
    return sphere;
  });

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(5.6, 1),
    new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }),
  );
  shadow.position.set(0, -2.15, -1.2);
  scene.add(shadow);

  /** Poses everything for a moment in time. */
  const pose = (t: number) => {
    // Each sphere rests in a corner, then glides along a side to the next.
    const step = t / 4;
    const turn = Math.floor(step) + smoothstep(clamp01((step % 1) * 1.6 - 0.6));
    spheres.forEach((sphere, i) => placeOnPath(sphere.position, i + turn));

    body.rotation.set(
      lean.x + 0.16,
      lean.y - 0.34 + Math.sin(t * 0.5) * 0.3,
      Math.sin(t * 0.37) * 0.04,
    );
    body.position.y = CENTRE_Y + Math.sin(t * 0.8) * 0.06;
  };

  const target = { x: 0, y: 0 };
  const lean = { x: 0, y: 0 };
  pose(0);

  const resize = () => {
    const rect = host.getBoundingClientRect();
    if (!rect.width) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    // Narrow stages are tall: step back, and lift the triangle clear of the caption.
    const narrow = camera.aspect < 0.95;
    camera.position.z = narrow ? 12 : 10.5;
    camera.position.y = narrow ? -0.5 : 0;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  // The triangle leans towards the pointer.
  const onPointerMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.8;
    target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.6;
  };
  const onPointerLeave = () => {
    target.x = 0;
    target.y = 0;
  };
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerleave', onPointerLeave);

  let visible = true;
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  visibilityObserver.observe(host);

  const start = performance.now();
  let raf = 0;
  const frame = (now: number) => {
    if (visible && host.offsetParent !== null) {
      lean.x += (target.y - lean.x) * 0.05;
      lean.y += (target.x - lean.y) * 0.05;
      pose((now - start) / 1000);
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);
  };
  if (!prefersReducedMotion) raf = requestAnimationFrame(frame);

  return {
    resize,
    dispose() {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      host.classList.remove('gl');
      disposeRenderer(renderer);
    },
  };
}

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const smoothstep = (x: number) => x * x * (3 - 2 * x);

/** Angles of the corners, first one pointing up. */
const cornerAngle = (corner: number) => Math.PI / 2 - (corner * 2 * Math.PI) / 3;

/** Position `progress` corners along the triangular path (clockwise). */
function placeOnPath(target: THREE.Vector3, progress: number) {
  const from = cornerAngle(Math.floor(progress));
  const to = cornerAngle(Math.floor(progress) + 1);
  const k = progress % 1;
  target.set(
    PATH_RADIUS * (Math.cos(from) + (Math.cos(to) - Math.cos(from)) * k),
    PATH_RADIUS * (Math.sin(from) + (Math.sin(to) - Math.sin(from)) * k),
    0,
  );
}

/** Signed distance to an equilateral triangle pointing up. */
function triangleDistance(x: number, y: number): number {
  const corners = [0, 1, 2].map((i) => {
    const angle = cornerAngle(i);
    return [Math.cos(angle) * INRADIUS * 2, Math.sin(angle) * INRADIUS * 2];
  });
  let nearest = Infinity;
  let inside = true;
  corners.forEach(([ax, ay], i) => {
    const [bx, by] = corners[(i + 1) % 3];
    const ex = bx - ax;
    const ey = by - ay;
    const k = clamp01(((x - ax) * ex + (y - ay) * ey) / (ex * ex + ey * ey));
    nearest = Math.min(nearest, Math.hypot(x - ax - ex * k, y - ay - ey * k));
    if (ex * (y - ay) - ey * (x - ax) > 0) inside = false; // corners run clockwise
  });
  return inside ? -nearest : nearest;
}

/** Centre-to-edge distance of the rounded triangle in a given direction. */
function outlineRadius(angle: number): number {
  let low = 0;
  let high = INRADIUS * 2 + ROUNDING;
  for (let i = 0; i < 40; i++) {
    const middle = (low + high) / 2;
    const distance = triangleDistance(Math.cos(angle) * middle, Math.sin(angle) * middle);
    if (distance < ROUNDING) low = middle;
    else high = middle;
  }
  return low;
}

/** A pillow with a rounded-triangle outline: one continuous curve, so the glass refracts cleanly. */
function roundedTriangleGeometry(): THREE.BufferGeometry {
  const AROUND = 240;
  const OVER = 120;
  const outline = Array.from({ length: AROUND }, (_, i) => {
    const angle = (i / AROUND) * Math.PI * 2;
    return { cos: Math.cos(angle), sin: Math.sin(angle), radius: outlineRadius(angle) };
  });

  const positions: number[] = [];
  const indices: number[] = [];
  for (let j = 1; j < OVER; j++) {
    const phi = -Math.PI / 2 + (j / OVER) * Math.PI;
    const reach = Math.pow(Math.cos(phi), 0.36);
    const z = HALF_DEPTH * Math.sin(phi);
    for (const { cos, sin, radius } of outline) {
      positions.push(cos * radius * reach, sin * radius * reach, z);
    }
  }
  const ring = (j: number, i: number) => j * AROUND + (i % AROUND);
  for (let j = 0; j < OVER - 2; j++) {
    for (let i = 0; i < AROUND; i++) {
      indices.push(ring(j, i), ring(j, i + 1), ring(j + 1, i + 1));
      indices.push(ring(j, i), ring(j + 1, i + 1), ring(j + 1, i));
    }
  }
  const back = positions.length / 3;
  positions.push(0, 0, -HALF_DEPTH, 0, 0, HALF_DEPTH);
  for (let i = 0; i < AROUND; i++) {
    indices.push(back, ring(0, i + 1), ring(0, i));
    indices.push(back + 1, ring(OVER - 2, i), ring(OVER - 2, i + 1));
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function rimMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 position = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalMatrix * normal;
        vView = -position.xyz;
        gl_Position = projectionMatrix * position;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float facing = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
        float edge = pow(1.0 - facing, 2.6);
        gl_FragColor = vec4(0.349, 0.459, 0.043, edge * 0.42);
      }
    `,
  });
}

function shadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const c = canvas.getContext('2d')!;
  const gradient = c.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(89,117,11,.38)');
  gradient.addColorStop(1, 'rgba(89,117,11,0)');
  c.fillStyle = gradient;
  c.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}
