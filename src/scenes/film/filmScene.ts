import * as THREE from 'three';
import { createRenderer, createStudioEnvironment, disposeRenderer } from '../studio';
import { CHAPTER_BUILDERS } from './chapters';
import { createKit, type FilmLabel } from './kit';

export interface FilmScene {
  labels: (chapter: number) => readonly FilmLabel[];
  showChapter: (chapter: number) => void;
  resize: (width: number, height: number) => void;
  render: (chapter: number, time: number, duration: number) => void;
  /** Screen position of a label, as percentages of the player. */
  project: (label: FilmLabel) => { left: number; top: number };
  dispose: () => void;
}

/** Returns null when WebGL is unavailable. */
export function createFilmScene(host: HTMLElement): FilmScene | null {
  const renderer = createRenderer(
    { antialias: true, alpha: true, powerPreference: 'high-performance' },
    { maxPixelRatio: 1.75, exposure: 1.08 },
  );
  if (!renderer) return null;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xeef2e6, 9, 30);
  const camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, 100);
  scene.environment = createStudioEnvironment(renderer, {
    ambient: [0.7, 0.72, 0.66],
    warmth: 0.97,
    blur: 0.04,
    lights: [
      { position: [0, 12, 0], scale: [14, 0.2, 10], intensity: 5 },
      { position: [-13, 3, 2], scale: [0.2, 8, 10], intensity: 3.2 },
      { position: [13, -1, 3], scale: [0.2, 6, 6], intensity: 2 },
      { position: [0, 2, 13], scale: [8, 4, 0.2], intensity: 1.8 },
    ],
  });
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.55);
  keyLight.position.set(3, 6, 5);
  scene.add(keyLight);

  const kit = createKit();
  const chapters = CHAPTER_BUILDERS.map((build) => {
    const chapter = build(kit, camera);
    scene.add(chapter.group);
    return chapter;
  });

  let width = 0;
  let height = 0;
  const projected = new THREE.Vector3();

  return {
    labels: (chapter) => chapters[chapter].labels,
    showChapter(current) {
      chapters.forEach(({ group }, i) => (group.visible = i === current));
    },
    resize(nextWidth, nextHeight) {
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
    render(chapter, time, duration) {
      chapters[chapter].update(time, duration);
      renderer.render(scene, camera);
    },
    project(label) {
      projected.copy(label.position);
      if (label.dy) projected.y += label.dy;
      projected.project(camera);
      return { left: ((projected.x + 1) / 2) * 100, top: ((1 - projected.y) / 2) * 100 };
    },
    dispose: () => disposeRenderer(renderer),
  };
}
