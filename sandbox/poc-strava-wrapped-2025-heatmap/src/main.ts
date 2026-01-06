/**
 * Strava Running Heatmap 3D Viewer
 * Loads preprocessed terrain and route data
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

// ============================================================================
// Types
// ============================================================================

interface TerrainData {
  width: number;
  height: number;
  minElevation: number;
  maxElevation: number;
  boundingBox: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  elevations: number[];
  viewer?: {
    elevationScale?: number;
  };
}

interface RoutesData {
  count: number;
  totalDistance: number;
  totalTime: number;
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
  routes: { x: number; y: number }[][];
}

interface LandcoverTextureData {
  width: number;
  height: number;
  data: number[];
}


// ============================================================================
// Configuration
// ============================================================================

const ELEVATION_SCALE = 0.6;
const ROUTE_HEIGHT_OFFSET = 0.002;

// ============================================================================
// Scene Setup
// ============================================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Camera position will be set after terrain loads

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2.1;
controls.minDistance = 2;
controls.maxDistance = 30;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Route line material
let routeLineMaterial: LineMaterial | null = null;

// ============================================================================
// Texture Creation
// ============================================================================

function createLandcoverTexture(landcoverData: LandcoverTextureData): THREE.DataTexture {
  const { width, height, data } = landcoverData;
  const rgba = new Uint8Array(data);
  
  const texture = new THREE.DataTexture(rgba, width, height, THREE.RGBAFormat);
  texture.flipY = true;
  texture.needsUpdate = true;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  
  return texture;
}

// ============================================================================
// Ground Plane
// ============================================================================

function createGroundTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  
  // Dark base matching scene background
  ctx.fillStyle = '#12141a';
  ctx.fillRect(0, 0, size, size);
  
  // Subtle grid lines
  ctx.strokeStyle = '#1a1d24';
  ctx.lineWidth = 1;
  
  const gridSize = 32;
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
  texture.repeat.set(15, 15);
  return texture;
}

function createGroundPlane(y: number): THREE.Mesh {
  const groundTexture = createGroundTexture();
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundTexture,
    roughness: 0.95,
    metalness: 0.05,
  });
  
  const groundGeometry = new THREE.PlaneGeometry(30, 30);
  groundGeometry.rotateX(-Math.PI / 2);
  
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.y = y;
  ground.receiveShadow = true;
  
  return ground;
}

// ============================================================================
// Terrain Building
// ============================================================================

function createSlabSides(
  terrainGeometry: THREE.PlaneGeometry,
  terrainOffsetY: number,
  gridWidth: number,
  gridHeight: number,
  planeWidth: number,
  planeHeight: number,
  baseY: number
): THREE.Group {
  const group = new THREE.Group();

  // Material for sides - similar to hiking map style
  const sideMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.7,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  const terrainPositions = terrainGeometry.attributes.position.array as Float32Array;
  
  // Helper to get world position from vertex index
  const getWorldY = (idx: number) => terrainPositions[idx * 3 + 1] + terrainOffsetY;
  const getWorldX = (idx: number) => terrainPositions[idx * 3];
  const getWorldZ = (idx: number) => terrainPositions[idx * 3 + 2];

  // Build side walls by iterating along terrain edges
  const sideVertices: number[] = [];
  const sideIndices: number[] = [];
  let vertexCount = 0;

  // Helper to add a flush vertical side along an edge
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

  // Add all four edges
  // South edge (row = gridHeight-1, z = +planeHeight/2)
  addFlushSide((i) => (gridHeight - 1) * gridWidth + i, gridWidth, false);
  
  // North edge (row = 0, z = -planeHeight/2)
  addFlushSide((i) => i, gridWidth, true);
  
  // West edge (col = 0, x = -planeWidth/2)
  addFlushSide((i) => i * gridWidth, gridHeight, true);
  
  // East edge (col = gridWidth-1, x = +planeWidth/2)
  addFlushSide((i) => i * gridWidth + (gridWidth - 1), gridHeight, false);

  const sideGeometry = new THREE.BufferGeometry();
  sideGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sideVertices, 3));
  sideGeometry.setIndex(sideIndices);
  sideGeometry.computeVertexNormals();

  const sides = new THREE.Mesh(sideGeometry, sideMaterial);
  sides.receiveShadow = true;
  sides.castShadow = true;
  group.add(sides);

  // Bottom plate
  const bottomGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  bottomGeometry.rotateX(Math.PI / 2);
  const bottom = new THREE.Mesh(bottomGeometry, sideMaterial);
  bottom.position.y = baseY;
  bottom.receiveShadow = true;
  group.add(bottom);

  return group;
}

function sampleElevation(
  elevations: number[],
  width: number,
  height: number,
  normX: number,
  normY: number
): number {
  normX = Math.max(0, Math.min(1, normX));
  normY = Math.max(0, Math.min(1, normY));
  
  const gx = normX * (width - 1);
  const gy = (1 - normY) * (height - 1);

  const x0 = Math.floor(gx);
  const x1 = Math.min(x0 + 1, width - 1);
  const y0 = Math.floor(gy);
  const y1 = Math.min(y0 + 1, height - 1);

  const fx = gx - x0;
  const fy = gy - y0;

  const h00 = elevations[y0 * width + x0] || 0;
  const h10 = elevations[y0 * width + x1] || 0;
  const h01 = elevations[y1 * width + x0] || 0;
  const h11 = elevations[y1 * width + x1] || 0;

  const h0 = h00 * (1 - fx) + h10 * fx;
  const h1 = h01 * (1 - fx) + h11 * fx;

  return h0 * (1 - fy) + h1 * fy;
}

// ============================================================================
// Main
// ============================================================================

async function init() {
  const loadingEl = document.getElementById('loading');

  try {
    // Load terrain data
    if (loadingEl) loadingEl.textContent = 'LOADING TERRAIN...';
    const terrainResponse = await fetch('terrain-data.json');
    const terrain: TerrainData = await terrainResponse.json();
    console.log(`Terrain: ${terrain.width}x${terrain.height}, elevation ${terrain.minElevation.toFixed(0)}m - ${terrain.maxElevation.toFixed(0)}m`);

    // Load routes data
    if (loadingEl) loadingEl.textContent = 'LOADING ROUTES...';
    const routesResponse = await fetch('routes-data.json');
    const routesData: RoutesData = await routesResponse.json();
    console.log(`Routes: ${routesData.count} runs`);

    // Load landcover texture
    if (loadingEl) loadingEl.textContent = 'LOADING LANDCOVER...';
    let landcoverTexture: THREE.DataTexture | null = null;
    try {
      const landcoverResponse = await fetch('landcover-data.json');
      if (landcoverResponse.ok) {
        const landcoverData: LandcoverTextureData = await landcoverResponse.json();
        landcoverTexture = createLandcoverTexture(landcoverData);
        console.log(`Landcover texture: ${landcoverData.width}x${landcoverData.height}`);
      }
    } catch (e) {
      console.log('No landcover data available');
    }

    // Calculate plane dimensions based on terrain aspect ratio
    const aspectRatio = terrain.width / terrain.height;
    const planeHeight = 6;
    const planeWidth = planeHeight * aspectRatio;

    // Calculate true-to-scale elevation factor
    // At ~47° latitude: 1° lat ≈ 111km, 1° lng ≈ 75km
    const latRange = terrain.boundingBox.maxY - terrain.boundingBox.minY;
    const centerLat = (terrain.boundingBox.maxY + terrain.boundingBox.minY) / 2;
    const metersPerDegreeLat = 111000; // meters per degree of latitude
    const realWorldHeightMeters = latRange * metersPerDegreeLat;
    const metersPerUnit = realWorldHeightMeters / planeHeight;
    
    // Elevation range in meters, convert to Three.js units
    const elevationRangeMeters = terrain.maxElevation - terrain.minElevation;
    const trueToScaleElevation = elevationRangeMeters / metersPerUnit;
    
    // Use config value if provided, otherwise use true-to-scale
    const configElevationScale = terrain.viewer?.elevationScale;
    const elevationScale = configElevationScale ?? trueToScaleElevation;
    
    console.log(`Geographic height: ${(realWorldHeightMeters / 1000).toFixed(1)}km`);
    console.log(`Elevation range: ${elevationRangeMeters.toFixed(0)}m`);
    console.log(`True-to-scale factor: ${trueToScaleElevation.toFixed(4)}`);
    console.log(`Using elevation scale: ${elevationScale.toFixed(4)}${configElevationScale ? ' (from config)' : ' (true-to-scale)'}`)

    // Create terrain geometry
    if (loadingEl) loadingEl.textContent = 'BUILDING TERRAIN...';
    
    const geometry = new THREE.PlaneGeometry(
      planeWidth,
      planeHeight,
      terrain.width - 1,
      terrain.height - 1
    );
    geometry.rotateX(-Math.PI / 2);

    // Apply elevation to vertices
    const positions = geometry.attributes.position.array as Float32Array;
    let minY = Infinity, maxY = -Infinity;

    for (let i = 0; i < terrain.elevations.length; i++) {
      const positionIndex = i * 3 + 1;
      const elevation = terrain.elevations[i] * elevationScale;
      positions[positionIndex] = elevation;
      minY = Math.min(minY, elevation);
      maxY = Math.max(maxY, elevation);
    }

    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;

    // Center terrain vertically
    const terrainOffsetY = -minY - (maxY - minY) / 2;

    // Create terrain material with landcover texture
    const terrainMaterial = landcoverTexture 
      ? new THREE.MeshStandardMaterial({
          map: landcoverTexture,
          roughness: 0.85,
          metalness: 0.1,
        })
      : new THREE.MeshStandardMaterial({
          color: 0xd9e0d1,
          roughness: 0.85,
          metalness: 0.1,
        });

    const terrainMesh = new THREE.Mesh(geometry, terrainMaterial);
    terrainMesh.position.y = terrainOffsetY;
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // Helper to sample terrain height at normalized position (exact surface)
    function getTerrainSurfaceHeight(normX: number, normY: number): number {
      const elevation = sampleElevation(
        terrain.elevations,
        terrain.width,
        terrain.height,
        normX,
        normY
      );
      return elevation * elevationScale + terrainOffsetY;
    }

    // Helper with slight offset for routes/lines (prevents z-fighting)
    function getTerrainHeight(normX: number, normY: number): number {
      return getTerrainSurfaceHeight(normX, normY) + ROUTE_HEIGHT_OFFSET;
    }

    // Create slab sides extending downward from terrain edges (like hiking map style)
    const slabDepth = 0.35; // How far the sides extend below the terrain
    const slabBaseY = minY + terrainOffsetY - slabDepth;
    const slabSides = createSlabSides(
      geometry,
      terrainOffsetY,
      terrain.width,
      terrain.height,
      planeWidth,
      planeHeight,
      slabBaseY
    );
    scene.add(slabSides);
    console.log(`Slab sides created (depth: ${slabDepth.toFixed(2)} units)`);

    // Create ground plane with subtle grid texture
    const groundPlane = createGroundPlane(slabBaseY - 0.01);
    scene.add(groundPlane);

    // Set up camera to look NE, centered on South Lake Union
    // South Lake Union approx: lat 47.627, lng -122.337
    const sluLat = 47.627;
    const sluLng = -122.337;
    const normX = (sluLng - terrain.boundingBox.minX) / (terrain.boundingBox.maxX - terrain.boundingBox.minX);
    const normY = (sluLat - terrain.boundingBox.minY) / (terrain.boundingBox.maxY - terrain.boundingBox.minY);
    
    const targetX = (normX - 0.5) * planeWidth;
    const targetZ = (0.5 - normY) * planeHeight;
    const targetY = getTerrainSurfaceHeight(normX, normY);
    
    controls.target.set(targetX, targetY, targetZ);
    
    // Position camera SW of target to look NE, at 45-degree polar angle
    const cameraDistance = 8;
    const polarAngle = Math.PI / 4; // 45 degrees from vertical
    const azimuthAngle = Math.PI * 1.25; // 225 degrees = SW direction (to look NE)
    
    const camX = targetX + cameraDistance * Math.sin(polarAngle) * Math.sin(azimuthAngle);
    const camY = targetY + cameraDistance * Math.cos(polarAngle);
    const camZ = targetZ + cameraDistance * Math.sin(polarAngle) * Math.cos(azimuthAngle);
    
    camera.position.set(camX, camY, camZ);
    controls.update();

    // Draw routes
    if (loadingEl) loadingEl.textContent = 'DRAWING ROUTES...';

    routeLineMaterial = new LineMaterial({
      color: 0xff5a32,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)
    });

    for (const route of routesData.routes) {
      if (route.length < 2) continue;

      const linePositions: number[] = [];

      for (const pt of route) {
        const x = (pt.x - 0.5) * planeWidth;
        const z = (0.5 - pt.y) * planeHeight;
        const y = getTerrainHeight(pt.x, pt.y);

        linePositions.push(x, y, z);
      }

      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions(linePositions);

      const line = new Line2(lineGeometry, routeLineMaterial);
      line.computeLineDistances();
      scene.add(line);
    }

    // Update UI
    if (loadingEl) loadingEl.style.display = 'none';
    const panelEl = document.getElementById('panel');
    if (panelEl) panelEl.style.display = 'block';

    const countEl = document.getElementById('run-count');
    const distanceEl = document.getElementById('total-distance');
    const timeEl = document.getElementById('total-time');

    if (countEl) countEl.textContent = routesData.count.toString();
    if (distanceEl) distanceEl.textContent = `${(routesData.totalDistance * 0.621371).toFixed(0)} mi`;
    if (timeEl) {
      const hours = Math.floor(routesData.totalTime / 3600);
      const mins = Math.floor((routesData.totalTime % 3600) / 60);
      timeEl.textContent = `${hours}h ${mins}m`;
    }

    console.log('Scene ready');
    animate();

  } catch (error) {
    console.error('Failed to initialize:', error);
    if (loadingEl) {
      loadingEl.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
    animate();
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (routeLineMaterial) {
    routeLineMaterial.resolution.set(window.innerWidth, window.innerHeight);
  }
});

init();
