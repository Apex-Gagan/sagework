import * as THREE from 'three';

export interface TissueOptions {
  color: string;
  /** Colour of folds and recesses. */
  deep: string;
  vessel: string;
  /** 0 none, 1 clearly veined. */
  vessels: number;
  /** Surface relief strength and feature size (higher is finer). */
  bump: number;
  grain: number;
  roughness: number;
  /** Length of the travelling food, as a fraction of this stretch of the tract. */
  waveWidth?: number;
  /** How far the wall swells as food passes, in scene units. */
  swell?: number;
  /** Where the model is cut off at the start of the tract, fade it over this fraction. */
  cutEnd?: number;
}

interface TissueUniforms {
  uLocal: { value: THREE.Matrix4 };
  uInvScale: { value: number };
  uGhost: { value: number };
  uWave: { value: number };
  uWaveOn: { value: number };
  uWaveWidth: { value: number };
  uActivity: { value: number };
  uTime: { value: number };
  uCutEnd: { value: number };
}

export interface Tissue {
  material: THREE.MeshPhysicalMaterial;
  uniforms: TissueUniforms;
}

/** three 0.149 treats hex colours as linear, so convert explicitly. */
export const srgb = (hex: string) => new THREE.Color(hex).convertSRGBToLinear();

/**
 * Tiling random volume shared by every tissue in a scene. Far cheaper to compile than computing
 * noise in the shader.
 */
export function createTissueNoise(): THREE.Data3DTexture {
  const SIZE = 32;
  const data = new Uint8Array(SIZE ** 3);
  let seed = 7;
  for (let i = 0; i < data.length; i++) {
    seed = (seed * 16807) % 2147483647;
    data[i] = (seed >> 8) & 255;
  }
  const texture = new THREE.Data3DTexture(data, SIZE, SIZE, SIZE);
  texture.format = THREE.RedFormat;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = texture.wrapT = texture.wrapR = THREE.RepeatWrapping;
  texture.unpackAlignment = 1;
  texture.needsUpdate = true;
  return texture;
}

const NOISE = /* glsl */ `
  precision highp sampler3D;
  uniform sampler3D uNoise;
  float tNoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    return texture(uNoise, (i + f * f * (3.0 - 2.0 * f) + 0.5) / 32.0).r;
  }
  float tRelief(vec3 p) {
    return tNoise(p) * 0.66 + tNoise(p * 2.9 + 7.1) * 0.34;
  }
  /* A fine, patchy capillary net over a few soft, wider vessels. */
  float tVein(vec3 p) {
    vec3 w = p + 1.1 * vec3(tNoise(p * 1.6), tNoise(p * 1.6 + 9.0), tNoise(p * 1.6 + 17.0));
    float fine = 1.0 - abs(tNoise(w * 5.2 + 5.0) * 2.0 - 1.0);
    float finer = 1.0 - abs(tNoise(w * 10.5 + 2.0) * 2.0 - 1.0);
    float patchy = smoothstep(0.35, 0.75, tNoise(p * 1.3 + 31.0));
    float flush = smoothstep(0.55, 0.9, tNoise(w * 1.4 + 11.0));
    return (0.5 * smoothstep(0.9, 1.0, fine) + 0.35 * smoothstep(0.88, 1.0, finer)) * (0.15 + 0.85 * patchy) + 0.28 * flush;
  }
`;

/** Wet living tissue: baked occlusion, mottling, vessels, relief, plus the travelling-food wave. */
export function createTissue(options: TissueOptions, noise: THREE.Data3DTexture): Tissue {
  const uniforms: TissueUniforms = {
    uLocal: { value: new THREE.Matrix4() },
    uInvScale: { value: 1 },
    uGhost: { value: 0 },
    uWave: { value: 0 },
    uWaveOn: { value: 0 },
    uWaveWidth: { value: options.waveWidth ?? 0.05 },
    uActivity: { value: 0 },
    uTime: { value: 0 },
    uCutEnd: { value: options.cutEnd ? 1 : 0 },
  };

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    // Always, so fading an organ never compiles a second shader mid-scroll.
    transparent: true,
    roughness: options.roughness,
    metalness: 0,
    clearcoat: 0.85,
    clearcoatRoughness: 0.22,
    sheen: 0.3,
    sheenRoughness: 0.5,
    sheenColor: srgb('#d8604e'),
    envMapIntensity: 0.42,
  });

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms, {
      uNoise: { value: noise },
      uColor: { value: srgb(options.color) },
      uDeep: { value: srgb(options.deep) },
      uVessel: { value: srgb(options.vessel) },
      uVessels: { value: options.vessels },
      uBump: { value: options.bump },
      uGrain: { value: options.grain },
      uCutLength: { value: options.cutEnd ?? 1 },
      uSwell: { value: options.swell ?? 0.04 },
    });

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        attribute vec2 _data;
        uniform mat4 uLocal;
        uniform float uInvScale, uWave, uWaveOn, uWaveWidth, uSwell;
        varying vec2 vData;
        varying vec3 vTissue;`,
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `#include <begin_vertex>
        vData = _data;
        vTissue = (uLocal * vec4(position, 1.0)).xyz;
        // The wall swells as food passes and narrows just behind it.
        float behind = (_data.y - uWave) / uWaveWidth;
        float swell = exp(-behind * behind) - 0.45 * exp(-(behind + 1.9) * (behind + 1.9));
        transformed += objectNormal * swell * uWaveOn * uSwell * uInvScale;`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        /* glsl */ `#include <common>
        uniform vec3 uColor, uDeep, uVessel;
        uniform float uCutEnd, uCutLength, uVessels, uBump, uGrain, uGhost, uWave, uWaveOn, uWaveWidth, uActivity, uTime;
        varying vec2 vData;
        varying vec3 vTissue;
        ${NOISE}`,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `#include <color_fragment>
        float open = smoothstep(0.05, 0.85, vData.x);
        float mottle = tNoise(vTissue * 5.0) * 0.6 + tNoise(vTissue * 13.0) * 0.4;
        vec3 flesh = mix(uDeep, uColor, open);
        flesh *= 0.8 + 0.4 * mottle;
        flesh = mix(flesh, uVessel, clamp(tVein(vTissue * 2.2) * uVessels * open, 0.0, 0.75));
        float foodGlow = exp(-pow((vData.y - uWave) / uWaveWidth, 2.0)) * uWaveOn;
        flesh = mix(flesh, vec3(0.78, 0.52, 0.12), foodGlow * 0.4);
        // Cut ends dissolve into the page.
        float cutEnd = uCutEnd * (1.0 - smoothstep(0.0, uCutLength, vData.y));
        diffuseColor.rgb = flesh;`,
      )
      .replace(
        '#include <normal_fragment_maps>',
        /* glsl */ `#include <normal_fragment_maps>
        {
          vec3 q = vTissue * uGrain;
          float e = 0.35;
          float h0 = tRelief(q);
          vec3 g = vec3(tRelief(q + vec3(e, 0, 0)), tRelief(q + vec3(0, e, 0)), tRelief(q + vec3(0, 0, e))) - h0;
          g = normalize(normalMatrixLocal * g + 1e-5) * length(g);
          normal = normalize(normal - uBump * (g - normal * dot(g, normal)));
        }`,
      )
      .replace('void main() {', 'uniform mat3 normalMatrixLocal;\nvoid main() {')
      .replace(
        '#include <emissivemap_fragment>',
        /* glsl */ `#include <emissivemap_fragment>
        float away = (vData.y - uWave) / uWaveWidth;
        float food = exp(-away * away) * uWaveOn;
        float trail = smoothstep(0.0, -1.0, away) * uWaveOn;
        totalEmissiveRadiance += vec3(0.62, 0.5, 0.03) * food * (0.28 + 0.2 * mottle);
        totalEmissiveRadiance += flesh * trail * 0.16;
        if (uActivity > 0.0) {
          float fire = tNoise(vTissue * 3.2 + vec3(0.0, uTime * 0.5, uTime * 0.3));
          fire = smoothstep(0.68, 0.9, fire) * (0.55 + 0.45 * sin(uTime * 3.0 + vTissue.x * 6.0));
          totalEmissiveRadiance += vec3(0.5, 0.62, 0.1) * fire * uActivity * 0.4 * open;
        }`,
      )
      .replace(
        '#include <output_fragment>',
        /* glsl */ `#include <output_fragment>
        {
          float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.0);
          gl_FragColor.a *= 1.0 - cutEnd;
          gl_FragColor.rgb = mix(gl_FragColor.rgb, mix(gl_FragColor.rgb, vec3(0.93, 0.86, 0.83), 0.55), uGhost);
          gl_FragColor.a *= mix(1.0, 0.07 + 0.4 * rim, uGhost);
        }`,
      );

    shader.uniforms.normalMatrixLocal = { value: normalMatrixLocal };
  };

  const normalMatrixLocal = new THREE.Matrix3();
  material.userData.normalMatrixLocal = normalMatrixLocal;
  // Every tissue shares one program; only uniform values differ.
  material.customProgramCacheKey = () => 'tissue';
  return { material, uniforms };
}
