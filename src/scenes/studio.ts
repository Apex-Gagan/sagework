import * as THREE from 'three';

type Triple = [number, number, number];

interface SoftBox {
  position: Triple;
  scale: Triple;
  intensity: number;
}

interface StudioOptions {
  ambient: Triple;
  /** Blue channel multiplier for the soft boxes; below 1 is warmer. */
  warmth: number;
  blur: number;
  lights: SoftBox[];
}

/** Returns null when WebGL is unavailable. */
export function createRenderer(
  parameters: THREE.WebGLRendererParameters,
  { maxPixelRatio, exposure }: { maxPixelRatio: number; exposure: number },
): THREE.WebGLRenderer | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer(parameters);
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  return renderer;
}

/** Photo-studio environment map: a grey room lit by soft boxes. */
export function createStudioEnvironment(
  renderer: THREE.WebGLRenderer,
  { ambient, warmth, blur, lights }: StudioOptions,
): THREE.Texture {
  const room = new THREE.Scene();
  room.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(30, 30, 30),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(...ambient), side: THREE.BackSide }),
    ),
  );
  for (const { position, scale, intensity } of lights) {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(intensity, intensity, intensity * warmth),
      }),
    );
    box.position.set(...position);
    box.scale.set(...scale);
    room.add(box);
  }
  return new THREE.PMREMGenerator(renderer).fromScene(room, blur).texture;
}

/** Releases the WebGL context (and with it every GPU resource) and removes the canvas. */
export function disposeRenderer(renderer: THREE.WebGLRenderer) {
  renderer.dispose();
  renderer.forceContextLoss();
  renderer.domElement.remove();
}
