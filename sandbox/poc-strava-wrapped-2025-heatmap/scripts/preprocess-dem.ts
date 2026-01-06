/**
 * DEM preprocessing script for Strava heatmap.
 * Uses shared-geo-utils to process terrain data from King County DEM.
 * 
 * Usage: deno run -A scripts/preprocess-dem.ts [config.json]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createCanvas } from 'canvas';
import initSqlJs from 'sql.js';
import Pbf from 'pbf';
import { VectorTile } from '@mapbox/vector-tile';
import {
  initProjection,
  findDEMTiles,
  loadGeoTiffTiles,
  loadTileRasters,
  generateElevationGrid,
  normalizeElevations,
  metersToDegrees,
  toUTM,
  toLonLat,
  type Bounds,
  type UTMBounds,
} from '../shared-geo-utils/dem-utils.ts';
import {
  renderContoursNode,
  type ContourConfig,
} from '../shared-geo-utils/contour-utils.ts';
import {
  decodePolyline,
  calculatePolylineBounds,
} from '../shared-geo-utils/gpx-utils.ts';

// ============================================================================
// Tile math for MBTiles
// ============================================================================

function lon2tile(lon: number, zoom: number): number {
  return Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
}

function lat2tile(lat: number, zoom: number): number {
  return Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
}

function tile2lon(x: number, zoom: number): number {
  return x / Math.pow(2, zoom) * 360 - 180;
}

function tile2lat(y: number, zoom: number): number {
  const n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

// ============================================================================
// Types
// ============================================================================

interface Activity {
  id: string;
  name: string;
  date: string;
  distance: number;
  movingTime: number;
  elevationGain: number;
  route: [number, number][];
}

interface ActivitiesFile {
  runs: Activity[];
}

interface Config {
  name: string;
  runsPreprocess?: {
    bounds?: {
      minLat?: number;
      maxLat?: number;
      minLng?: number;
      maxLng?: number;
    };
  };
  input: {
    activitiesJson: string;
    demTiles: string;
    mbtiles?: string;
  };
  output: {
    directory: string;
    terrainFile: string;
    contourFile: string;
    routesFile: string;
    footprintFile?: string;
  };
  terrain: {
    paddingPercent: number;
    maxDimension: number;
    targetResolution: number;
    medianFilterRadius: number;
    utmZone: number;
    flattenWater?: boolean;
    /** Use bounds from runsPreprocess instead of calculating from routes */
    useConfigBounds?: boolean;
  };
  contours: ContourConfig;
  viewer?: object;
}

// ============================================================================
// DEM Footprint extraction
// ============================================================================

interface FootprintData {
  /** Full DEM coverage polygon in WGS84 [lon, lat] */
  demBounds: [number, number][];
  /** Cropped terrain bounds polygon in WGS84 [lon, lat] */
  terrainBounds: [number, number][];
  /** Normalized coordinates for rendering (0-1 range relative to terrain) */
  demBoundsNormalized: { x: number; y: number }[];
}

function createFootprintData(
  demBounds: Bounds,
  terrainBounds: Bounds
): FootprintData {
  // DEM polygon in WGS84 (closed ring, counter-clockwise)
  const demPolygon: [number, number][] = [
    [demBounds.minX, demBounds.minY], // SW
    [demBounds.maxX, demBounds.minY], // SE
    [demBounds.maxX, demBounds.maxY], // NE
    [demBounds.minX, demBounds.maxY], // NW
    [demBounds.minX, demBounds.minY], // close ring
  ];

  // Terrain polygon in WGS84
  const terrainPolygon: [number, number][] = [
    [terrainBounds.minX, terrainBounds.minY],
    [terrainBounds.maxX, terrainBounds.minY],
    [terrainBounds.maxX, terrainBounds.maxY],
    [terrainBounds.minX, terrainBounds.maxY],
    [terrainBounds.minX, terrainBounds.minY],
  ];

  // Normalize DEM bounds to terrain coordinate system (0-1)
  const demNormalized = demPolygon.map(([lon, lat]) => ({
    x: (lon - terrainBounds.minX) / (terrainBounds.maxX - terrainBounds.minX),
    y: (lat - terrainBounds.minY) / (terrainBounds.maxY - terrainBounds.minY),
  }));

  return {
    demBounds: demPolygon,
    terrainBounds: terrainPolygon,
    demBoundsNormalized: demNormalized,
  };
}

// ============================================================================
// Water extraction from MBTiles
// ============================================================================

async function extractWaterPolygons(
  mbtilesPath: string,
  minLon: number,
  minLat: number,
  maxLon: number,
  maxLat: number
): Promise<[number, number][][]> {
  console.log('\n💧 Extracting water polygons...');
  
  const { gunzipSync } = await import('node:zlib');
  
  const SQL = await initSqlJs();
  const dbBuffer = readFileSync(mbtilesPath);
  const db = new SQL.Database(dbBuffer);
  
  const zoom = 14;
  const minTileX = lon2tile(minLon, zoom);
  const maxTileX = lon2tile(maxLon, zoom);
  const minTileY = lat2tile(maxLat, zoom); // Note: Y is inverted
  const maxTileY = lat2tile(minLat, zoom);
  
  const waterPolygons: [number, number][][] = [];
  
  const stmt = db.prepare('SELECT tile_data FROM tiles WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?');
  
  let tilesProcessed = 0;
  for (let tileX = minTileX; tileX <= maxTileX; tileX++) {
    for (let tileY = minTileY; tileY <= maxTileY; tileY++) {
      // MBTiles uses TMS (flipped Y)
      const tmsY = Math.pow(2, zoom) - 1 - tileY;
      
      stmt.bind([zoom, tileX, tmsY]);
      if (!stmt.step()) {
        stmt.reset();
        continue;
      }
      const row = stmt.get() as [Uint8Array];
      stmt.reset();
      if (!row || !row[0]) continue;
      
      const tileData = row[0];
      
      // Decompress gzip tile data
      let tileBuffer: Uint8Array;
      try {
        tileBuffer = gunzipSync(tileData);
      } catch {
        tileBuffer = tileData;
      }
      
      const pbf = new Pbf(tileBuffer);
      const tile = new VectorTile(pbf);
      
      // Get tile bounds in WGS84
      const tileLonMin = tile2lon(tileX, zoom);
      const tileLonMax = tile2lon(tileX + 1, zoom);
      const tileLatMax = tile2lat(tileY, zoom);
      const tileLatMin = tile2lat(tileY + 1, zoom);
      
      // Process water layer
      const layer = tile.layers['water'];
      if (!layer) {
        tilesProcessed++;
        continue;
      }
      
      for (let i = 0; i < layer.length; i++) {
        const feature = layer.feature(i);
        if (feature.type !== 3) continue; // Only polygons
        
        const geometry = feature.loadGeometry();
        
        for (const ring of geometry) {
          const coords: [number, number][] = [];
          
          for (const point of ring) {
            // Convert tile coords to WGS84
            const lon = tileLonMin + (point.x / 4096) * (tileLonMax - tileLonMin);
            const lat = tileLatMax - (point.y / 4096) * (tileLatMax - tileLatMin);
            coords.push([lon, lat]);
          }
          
          if (coords.length >= 3) {
            waterPolygons.push(coords);
          }
        }
      }
      
      tilesProcessed++;
    }
  }
  
  stmt.free();
  console.log(`  Processed ${tilesProcessed} tiles, found ${waterPolygons.length} water polygons`);
  db.close();
  
  return waterPolygons;
}

function createWaterMask(
  waterPolygons: [number, number][][],
  width: number,
  height: number,
  minLon: number,
  minLat: number,
  maxLon: number,
  maxLat: number
): Uint8Array {
  console.log('  Rasterizing water mask...');
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill with black (no water)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  
  // Draw water polygons in white
  ctx.fillStyle = '#ffffff';
  
  for (const polygon of waterPolygons) {
    ctx.beginPath();
    
    for (let i = 0; i < polygon.length; i++) {
      const [lon, lat] = polygon[i];
      const x = ((lon - minLon) / (maxLon - minLon)) * width;
      const y = (1 - (lat - minLat) / (maxLat - minLat)) * height; // Flip Y
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.fill();
  }
  
  // Extract mask as grayscale
  const imageData = ctx.getImageData(0, 0, width, height);
  const mask = new Uint8Array(width * height);
  
  for (let i = 0; i < mask.length; i++) {
    mask[i] = imageData.data[i * 4]; // Red channel (white = 255, black = 0)
  }
  
  return mask;
}

function flattenWaterElevations(
  elevations: Float32Array,
  waterMask: Uint8Array,
  minElevation: number
): void {
  let flattened = 0;
  
  for (let i = 0; i < elevations.length; i++) {
    if (waterMask[i] > 128) { // Water pixel
      elevations[i] = minElevation;
      flattened++;
    }
  }
  
  console.log(`  Flattened ${flattened.toLocaleString()} water pixels to min elevation`);
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const configPath = Deno.args[0] || 'configs/seattle-running-2025.json';
  
  if (!existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`);
    console.error('Usage: deno run -A scripts/preprocess-dem.ts <config.json>');
    Deno.exit(1);
  }

  const config: Config = JSON.parse(readFileSync(configPath, 'utf-8'));
  console.log(`\n🏃 Processing: ${config.name}\n`);

  // Initialize projection
  initProjection(config.terrain.utmZone);

  // Ensure output directory exists
  if (!existsSync(config.output.directory)) {
    mkdirSync(config.output.directory, { recursive: true });
  }

  // Load activities
  console.log('Loading activities...');
  const activitiesFile: ActivitiesFile = JSON.parse(
    readFileSync(config.input.activitiesJson, 'utf-8')
  );
  const activities = activitiesFile.runs;
  console.log(`Loaded ${activities.length} activities`);

  // Extract routes (already decoded in JSON)
  const allRoutes: [number, number][][] = [];
  const allStartPoints: { lat: number; lng: number }[] = [];

  for (const activity of activities) {
    if (activity.route && activity.route.length > 1) {
      allRoutes.push(activity.route);
      allStartPoints.push({ lat: activity.route[0][0], lng: activity.route[0][1] });
    }
  }

  console.log(`Found ${allRoutes.length} routes`);

  // Find the main cluster of routes (for filtering out travel runs)
  const bins: Record<string, number> = {};
  const binSize = 0.5;
  for (const sp of allStartPoints) {
    const key = `${Math.floor(sp.lat / binSize)},${Math.floor(sp.lng / binSize)}`;
    bins[key] = (bins[key] || 0) + 1;
  }

  let maxBinKey = '';
  let maxCount = 0;
  for (const [key, count] of Object.entries(bins)) {
    if (count > maxCount) {
      maxCount = count;
      maxBinKey = key;
    }
  }

  const [binLat, binLng] = maxBinKey.split(',').map(Number);
  const centerLat = (binLat + 0.5) * binSize;
  const centerLng = (binLng + 0.5) * binSize;
  console.log(`Main area: ${maxCount} runs near lat ${centerLat.toFixed(2)}, lng ${centerLng.toFixed(2)}`);

  // Filter routes and calculate bounds
  const maxDist = 0.5;
  const filteredRoutes: [number, number][][] = [];
  const filteredActivityIndices: number[] = [];
  let minLat = Infinity, maxLat = -Infinity;
  let minLng = Infinity, maxLng = -Infinity;

  for (let i = 0; i < allRoutes.length; i++) {
    const sp = allStartPoints[i];
    const dist = Math.sqrt(Math.pow(sp.lat - centerLat, 2) + Math.pow(sp.lng - centerLng, 2));
    if (dist < maxDist) {
      filteredRoutes.push(allRoutes[i]);
      filteredActivityIndices.push(i);
      for (const [lat, lng] of allRoutes[i]) {
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
      }
    }
  }

  console.log(`Filtered to ${filteredRoutes.length} routes in main area`);

  // Check if we should use config bounds directly
  const configBounds = config.runsPreprocess?.bounds;
  const useConfigBounds = config.terrain.useConfigBounds && configBounds;

  if (useConfigBounds && configBounds.minLat != null && configBounds.maxLat != null && 
      configBounds.minLng != null && configBounds.maxLng != null) {
    // Use config bounds directly (no padding - config bounds are final)
    minLat = configBounds.minLat;
    maxLat = configBounds.maxLat;
    minLng = configBounds.minLng;
    maxLng = configBounds.maxLng;
    console.log(`Using config bounds directly (no padding)`);
  } else {
    // Add padding to route-calculated bounds
    const latRange = maxLat - minLat;
    const lngRange = maxLng - minLng;
    const pad = config.terrain.paddingPercent;
    minLat -= latRange * pad;
    maxLat += latRange * pad;
    minLng -= lngRange * pad;
    maxLng += lngRange * pad;
  }

  const bounds: Bounds = {
    minX: minLng,
    maxX: maxLng,
    minY: minLat,
    maxY: maxLat
  };

  console.log(`Bounds: [${minLng.toFixed(4)}, ${minLat.toFixed(4)}] to [${maxLng.toFixed(4)}, ${maxLat.toFixed(4)}]`);

  // Convert to UTM bounds
  const sw = toUTM(minLng, minLat);
  const ne = toUTM(maxLng, maxLat);
  const utmBounds: UTMBounds = {
    minE: sw.easting,
    maxE: ne.easting,
    minN: sw.northing,
    maxN: ne.northing
  };

  // Find and load DEM tiles
  const tilePaths = findDEMTiles(config.input.demTiles);
  if (tilePaths.length === 0) {
    console.error('No DEM tiles found!');
    Deno.exit(1);
  }

  const tiles = await loadGeoTiffTiles(tilePaths);
  await loadTileRasters(tiles);

  // Calculate combined DEM bounds from all tiles
  const demBounds: Bounds = {
    minX: Math.min(...tiles.map(t => t.bounds.minX)),
    maxX: Math.max(...tiles.map(t => t.bounds.maxX)),
    minY: Math.min(...tiles.map(t => t.bounds.minY)),
    maxY: Math.max(...tiles.map(t => t.bounds.maxY)),
  };
  console.log(`DEM coverage: [${demBounds.minX.toFixed(4)}, ${demBounds.minY.toFixed(4)}] to [${demBounds.maxX.toFixed(4)}, ${demBounds.maxY.toFixed(4)}]`);

  // Intersect configured bounds with DEM coverage (clip to actual data)
  const clippedBounds: Bounds = {
    minX: Math.max(bounds.minX, demBounds.minX),
    maxX: Math.min(bounds.maxX, demBounds.maxX),
    minY: Math.max(bounds.minY, demBounds.minY),
    maxY: Math.min(bounds.maxY, demBounds.maxY),
  };
  
  // Check if there's valid intersection
  if (clippedBounds.minX >= clippedBounds.maxX || clippedBounds.minY >= clippedBounds.maxY) {
    console.error('ERROR: Configured bounds do not overlap with DEM coverage!');
    console.error(`  Configured: [${bounds.minX.toFixed(4)}, ${bounds.minY.toFixed(4)}] to [${bounds.maxX.toFixed(4)}, ${bounds.maxY.toFixed(4)}]`);
    console.error(`  DEM: [${demBounds.minX.toFixed(4)}, ${demBounds.minY.toFixed(4)}] to [${demBounds.maxX.toFixed(4)}, ${demBounds.maxY.toFixed(4)}]`);
    Deno.exit(1);
  }
  
  console.log(`Clipped bounds: [${clippedBounds.minX.toFixed(4)}, ${clippedBounds.minY.toFixed(4)}] to [${clippedBounds.maxX.toFixed(4)}, ${clippedBounds.maxY.toFixed(4)}]`);

  // Update UTM bounds for clipped area
  const clippedSW = toUTM(clippedBounds.minX, clippedBounds.minY);
  const clippedNE = toUTM(clippedBounds.maxX, clippedBounds.maxY);
  const clippedUtmBounds: UTMBounds = {
    minE: clippedSW.easting,
    maxE: clippedNE.easting,
    minN: clippedSW.northing,
    maxN: clippedNE.northing
  };

  // Generate elevation grid using clipped bounds
  const terrainData = generateElevationGrid(tiles, clippedBounds, clippedUtmBounds, {
    paddingEW: 0,
    paddingNS: 0,
    maxDimension: config.terrain.maxDimension,
    targetResolution: config.terrain.targetResolution,
    medianFilterRadius: config.terrain.medianFilterRadius,
    utmZone: config.terrain.utmZone
  });

  // Flatten water areas if MBTiles provided (use clipped bounds)
  if (config.input.mbtiles && existsSync(config.input.mbtiles)) {
    const waterPolygons = await extractWaterPolygons(
      config.input.mbtiles,
      clippedBounds.minX, clippedBounds.minY, clippedBounds.maxX, clippedBounds.maxY
    );
    
    if (waterPolygons.length > 0) {
      const waterMask = createWaterMask(
        waterPolygons,
        terrainData.width,
        terrainData.height,
        clippedBounds.minX, clippedBounds.minY, clippedBounds.maxX, clippedBounds.maxY
      );
      
      flattenWaterElevations(
        terrainData.elevations,
        waterMask,
        terrainData.minElevation
      );
    }
  }

  // Normalize elevations
  const normalizedElevations = normalizeElevations(
    terrainData.elevations,
    terrainData.minElevation,
    terrainData.maxElevation
  );

  // Save terrain data
  const terrainOutput = {
    width: terrainData.width,
    height: terrainData.height,
    minElevation: terrainData.minElevation,
    maxElevation: terrainData.maxElevation,
    boundingBox: terrainData.boundingBox,
    utmBounds: terrainData.utmBounds,
    elevations: Array.from(normalizedElevations),
    viewer: config.viewer || null
  };

  const terrainPath = join(config.output.directory, config.output.terrainFile);
  writeFileSync(terrainPath, JSON.stringify(terrainOutput));
  console.log(`\nWrote ${terrainPath}`);

  // Generate contours
  console.log('\n📐 Generating contours...');
  const contourAlpha = renderContoursNode(
    createCanvas,
    normalizedElevations,
    terrainData.width,
    terrainData.height,
    terrainData.minElevation,
    terrainData.maxElevation,
    config.contours
  );

  const contourPath = join(config.output.directory, config.output.contourFile);
  writeFileSync(contourPath, JSON.stringify({
    width: terrainData.width,
    height: terrainData.height,
    data: Array.from(contourAlpha)
  }));
  console.log(`Wrote ${contourPath}`);

  // Save routes data (normalized to clipped terrain bounds)
  // Only count distance/time for activities that are actually displayed
  const filteredActivities = filteredActivityIndices.map(i => activities[i]);
  const routesData = {
    count: filteredRoutes.length,
    totalDistance: filteredActivities.reduce((sum, a) => sum + a.distance, 0) / 1000,
    totalTime: filteredActivities.reduce((sum, a) => sum + a.movingTime, 0),
    bounds: { 
      minLat: clippedBounds.minY, 
      maxLat: clippedBounds.maxY, 
      minLng: clippedBounds.minX, 
      maxLng: clippedBounds.maxX 
    },
    routes: filteredRoutes.map(route => 
      route.map(([lat, lng]) => ({
        x: (lng - clippedBounds.minX) / (clippedBounds.maxX - clippedBounds.minX),
        y: (lat - clippedBounds.minY) / (clippedBounds.maxY - clippedBounds.minY)
      }))
    )
  };

  const routesPath = join(config.output.directory, config.output.routesFile);
  writeFileSync(routesPath, JSON.stringify(routesData));
  console.log(`Wrote ${routesPath}`);

  // Save footprint data (now redundant since terrain is clipped to DEM bounds)
  // Keeping for backwards compatibility - the DEM and terrain bounds are now the same
  if (config.output.footprintFile) {
    console.log('\n🗺️  Generating footprint data...');
    const footprintData = createFootprintData(clippedBounds, clippedBounds);
    const footprintPath = join(config.output.directory, config.output.footprintFile);
    writeFileSync(footprintPath, JSON.stringify(footprintData, null, 2));
    console.log(`Wrote ${footprintPath}`);
    console.log('  Note: Terrain is now clipped to DEM bounds, so footprint matches terrain edges');
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);

