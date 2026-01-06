/**
 * Three.js terrain visualization utilities.
 * Handles terrain geometry creation, texture generation, and materials.
 */

import * as THREE from 'three';

// ============================================================================
// Types
// ============================================================================

export interface LandcoverData {
  width: number;
  height: number;
  data: number[];
  types?: Record<string, number>;
}

export interface ContourData {
  width: number;
  height: number;
  data: number[];
}

export interface TerrainGeometryOptions {
  /** Width of the plane in Three.js units */
  planeWidth: number;
  /** Height of the plane in Three.js units */
  planeHeight: number;
  /** Vertical scale factor for elevations */
  elevationScale: number;
  /** Grid width (number of vertices) */
  gridWidth: number;
  /** Grid height (number of vertices) */
  gridHeight: number;
  /** Normalized elevations (0-1 range) */
  elevations: Float32Array | number[];
}

export interface TerrainInfo {
  geometry: THREE.PlaneGeometry;
  minY: number;
  maxY: number;
  planeWidth: number;
  planeHeight: number;
  elevationScale: number;
  gridWidth: number;
  gridHeight: number;
  elevations: Float32Array | number[];
}

// ============================================================================
// Color Palettes
// ============================================================================

/** Strava-style natural color palette */
export const LAND_COLORS = {
  default: [0.890, 0.941, 0.855],
  forest: [0.812, 0.902, 0.784],
  grassland: [0.890, 0.941, 0.855],
  bare_rock: [0.949, 0.949, 0.941],
  scree: [0.902, 0.902, 0.890],
  glacier: [0.973, 0.980, 1.0],
  water: [0.678, 0.847, 0.902],
} as const;

/** Land cover type indices (must match preprocessing output) */
export const LAND_TYPES = {
  default: 0,
  forest: 1,
  grassland: 2,
  bare_rock: 3,
  scree: 4,
  glacier: 5,
  water: 6,
} as const;

// ============================================================================
// Texture Creation
// ============================================================================

/**
 * Create a Three.js texture from landcover data
 */
export function createLandcoverTexture(landcoverData: LandcoverData): THREE.DataTexture {
  const { width, height, data } = landcoverData;
  const rgba = new Uint8Array(width * height * 4);

  const colorMap = [
    LAND_COLORS.default,
    LAND_COLORS.forest,
    LAND_COLORS.grassland,
    LAND_COLORS.bare_rock,
    LAND_COLORS.scree,
    LAND_COLORS.glacier,
    LAND_COLORS.water,
  ];

  for (let i = 0; i < data.length; i++) {
    const type = data[i];
    const color = colorMap[type] || colorMap[0];
    rgba[i * 4 + 0] = Math.floor(color[0] * 255);
    rgba[i * 4 + 1] = Math.floor(color[1] * 255);
    rgba[i * 4 + 2] = Math.floor(color[2] * 255);
    rgba[i * 4 + 3] = 255;
  }

  const texture = new THREE.DataTexture(rgba, width, height, THREE.RGBAFormat);
  texture.flipY = true;
  texture.needsUpdate = true;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

/**
 * Create a Three.js texture from contour data
 */
export function createContourTexture(
  contourData: ContourData,
  lineColor: [number, number, number] = [80, 70, 60]
): THREE.DataTexture {
  const { width, height, data } = contourData;
  const rgba = new Uint8Array(width * height * 4);

  for (let i = 0; i < data.length; i++) {
    const alpha = data[i];
    rgba[i * 4 + 0] = lineColor[0];
    rgba[i * 4 + 1] = lineColor[1];
    rgba[i * 4 + 2] = lineColor[2];
    rgba[i * 4 + 3] = alpha;
  }

  const texture = new THREE.DataTexture(rgba, width, height, THREE.RGBAFormat);
  texture.flipY = true;
  texture.needsUpdate = true;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;

  return texture;
}

/**
 * Create a default terrain texture when no landcover is available
 */
export function createDefaultTerrainTexture(
  width: number,
  height: number,
  color: [number, number, number] = LAND_COLORS.default as [number, number, number]
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = `rgb(${Math.round(color[0] * 255)}, ${Math.round(color[1] * 255)}, ${Math.round(color[2] * 255)})`;
  ctx.fillRect(0, 0, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return texture;
}

/**
 * Create a subtle grid texture for the ground
 */
export function createGroundTexture(
  size: number = 512,
  baseColor: string = '#151a25',
  gridColor: string = '#202530',
  gridSize: number = 16,
  repeat: number = 20
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Dark base
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  // Subtle grid lines
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;

  for (let i = 0; i <= size; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(size, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat, repeat);

  return texture;
}

// ============================================================================
// Terrain Geometry
// ============================================================================

/**
 * Create a terrain geometry from elevation data
 */
export function createTerrainGeometry(options: TerrainGeometryOptions): TerrainInfo {
  const { planeWidth, planeHeight, elevationScale, gridWidth, gridHeight, elevations } = options;

  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, gridWidth - 1, gridHeight - 1);
  geometry.rotateX(-Math.PI / 2);

  const positions = geometry.attributes.position.array as Float32Array;
  let minY = Infinity, maxY = -Infinity;

  for (let i = 0; i < elevations.length; i++) {
    const positionIndex = i * 3 + 1;
    const elevation = elevations[i] * elevationScale;
    positions[positionIndex] = elevation;
    minY = Math.min(minY, elevation);
    maxY = Math.max(maxY, elevation);
  }

  geometry.computeVertexNormals();
  geometry.attributes.position.needsUpdate = true;

  return {
    geometry,
    minY,
    maxY,
    planeWidth,
    planeHeight,
    elevationScale,
    gridWidth,
    gridHeight,
    elevations
  };
}

/**
 * Create a terrain material with optional contour overlay
 */
export function createTerrainMaterial(
  baseTexture: THREE.Texture | null,
  contourTexture: THREE.DataTexture | null = null,
  terrainWidth: number = 512,
  terrainHeight: number = 512
): THREE.MeshStandardMaterial {
  // If no base texture, create a default one
  const texture = baseTexture || createDefaultTerrainTexture(terrainWidth, terrainHeight);

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.85,
    metalness: 0.0,
  });

  if (!contourTexture) {
    return material;
  }

  // Add contour texture as a second map via onBeforeCompile
  material.userData.contourMap = contourTexture;

  material.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.contourMap = { value: contourTexture };

    // Add uniform declaration
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
      uniform sampler2D contourMap;`
    );

    // Blend contour lines over the diffuse color
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `#include <map_fragment>
      
      // Overlay contour lines
      vec4 contourColor = texture2D(contourMap, vMapUv);
      diffuseColor.rgb = mix(diffuseColor.rgb, contourColor.rgb, contourColor.a * 0.7);`
    );
  };

  return material;
}

// ============================================================================
// Terrain Sides (for floating terrain block effect)
// ============================================================================

export interface TerrainSidesOptions {
  terrainGeometry: THREE.PlaneGeometry;
  terrainPositionY: number;
  baseHeight: number;
  gridWidth: number;
  gridHeight: number;
  planeWidth: number;
  planeHeight: number;
}

/**
 * Create flush vertical sides for a terrain block
 */
export function createTerrainSides(options: TerrainSidesOptions): THREE.BufferGeometry {
  const { terrainGeometry, terrainPositionY, baseHeight, gridWidth, gridHeight } = options;

  const terrainPositions = terrainGeometry.attributes.position.array as Float32Array;
  
  // Calculate the base Y position (bottom of sides)
  let minTerrainY = Infinity;
  for (let i = 1; i < terrainPositions.length; i += 3) {
    minTerrainY = Math.min(minTerrainY, terrainPositions[i]);
  }
  const baseY = terrainPositionY + minTerrainY - baseHeight;

  const getWorldY = (idx: number) => terrainPositions[idx * 3 + 1] + terrainPositionY;
  const getWorldX = (idx: number) => terrainPositions[idx * 3];
  const getWorldZ = (idx: number) => terrainPositions[idx * 3 + 2];

  const sideVertices: number[] = [];
  const sideIndices: number[] = [];
  let vertexCount = 0;

  function addFlushSide(getIdx: (i: number) => number, count: number, flip: boolean) {
    const start = vertexCount;

    for (let i = 0; i < count; i++) {
      const idx = getIdx(i);
      const x = getWorldX(idx);
      const y = getWorldY(idx);
      const z = getWorldZ(idx);

      // Top vertex (at terrain edge)
      sideVertices.push(x, y, z);
      // Bottom vertex (straight down)
      sideVertices.push(x, baseY, z);
    }

    // Create quads
    for (let i = 0; i < count - 1; i++) {
      const v = start + i * 2;
      if (flip) {
        sideIndices.push(v, v + 1, v + 2);
        sideIndices.push(v + 1, v + 3, v + 2);
      } else {
        sideIndices.push(v, v + 2, v + 1);
        sideIndices.push(v + 1, v + 2, v + 3);
      }
    }

    vertexCount += count * 2;
  }

  // South edge (z = +planeHeight/2)
  addFlushSide((i) => (gridHeight - 1) * gridWidth + i, gridWidth, false);

  // North edge (z = -planeHeight/2)
  addFlushSide((i) => i, gridWidth, true);

  // West edge (x = -planeWidth/2)
  addFlushSide((i) => i * gridWidth, gridHeight, true);

  // East edge (x = +planeWidth/2)
  addFlushSide((i) => i * gridWidth + (gridWidth - 1), gridHeight, false);

  const sideGeometry = new THREE.BufferGeometry();
  sideGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sideVertices, 3));
  sideGeometry.setIndex(sideIndices);
  sideGeometry.computeVertexNormals();

  return sideGeometry;
}

// ============================================================================
// Elevation Sampling (for placing objects on terrain)
// ============================================================================

/**
 * Sample terrain height at normalized coordinates
 */
export function sampleTerrainHeight(
  elevations: Float32Array | number[],
  gridWidth: number,
  gridHeight: number,
  normX: number,
  normY: number
): number {
  const gx = normX * (gridWidth - 1);
  const gy = (1 - normY) * (gridHeight - 1);

  const x0 = Math.floor(gx);
  const x1 = Math.min(x0 + 1, gridWidth - 1);
  const y0 = Math.floor(gy);
  const y1 = Math.min(y0 + 1, gridHeight - 1);

  const fx = gx - x0;
  const fy = gy - y0;

  const h00 = elevations[y0 * gridWidth + x0] || 0;
  const h10 = elevations[y0 * gridWidth + x1] || 0;
  const h01 = elevations[y1 * gridWidth + x0] || 0;
  const h11 = elevations[y1 * gridWidth + x1] || 0;

  const h0 = h00 * (1 - fx) + h10 * fx;
  const h1 = h01 * (1 - fx) + h11 * fx;

  return h0 * (1 - fy) + h1 * fy;
}

// ============================================================================
// Lighting
// ============================================================================

export interface SpotlightConfig {
  color?: string | number;
  intensity?: number;
  position?: [number, number, number];
  angle?: number;  // degrees
  penumbra?: number;
  decay?: number;
  distance?: number;
}

/**
 * Apply lighting configuration to a spotlight
 */
export function applySpotlightConfig(spotlight: THREE.SpotLight, config: SpotlightConfig): void {
  if (config.color !== undefined) {
    spotlight.color.setHex(typeof config.color === 'string' ? parseInt(config.color) : config.color);
  }
  if (config.intensity !== undefined) spotlight.intensity = config.intensity;
  if (config.position) spotlight.position.set(...config.position);
  if (config.angle !== undefined) spotlight.angle = (config.angle * Math.PI) / 180;
  if (config.penumbra !== undefined) spotlight.penumbra = config.penumbra;
  if (config.decay !== undefined) spotlight.decay = config.decay;
  if (config.distance !== undefined) spotlight.distance = config.distance;
}

/**
 * Create a default dramatic spotlight for terrain visualization
 */
export function createTerrainSpotlight(): THREE.SpotLight {
  const spotlight = new THREE.SpotLight(0xffddaa, 4);
  spotlight.position.set(0, 2.5, 0);
  spotlight.angle = (36 * Math.PI) / 180;
  spotlight.penumbra = 0.4;
  spotlight.decay = 1;
  spotlight.distance = 5;
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 2048;
  spotlight.shadow.mapSize.height = 2048;
  spotlight.shadow.camera.near = 1;
  spotlight.shadow.camera.far = 30;
  spotlight.shadow.bias = -0.001;

  return spotlight;
}

