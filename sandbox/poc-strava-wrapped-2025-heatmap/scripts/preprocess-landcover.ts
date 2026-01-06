/**
 * Extract landcover polygons from MBTiles vector tiles
 * Outputs polygon geometry for direct rendering in Three.js
 * 
 * Usage: deno run -A scripts/preprocess-landcover.ts [config.json]
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import initSqlJs from 'sql.js';
import Pbf from 'pbf';
import { VectorTile } from '@mapbox/vector-tile';
import { createCanvas } from 'canvas';

// ============================================================================
// Types
// ============================================================================

interface Config {
  name: string;
  input: {
    mbtiles: string;
  };
  output: {
    directory: string;
    terrainFile: string;
    landcoverFile: string;
  };
}

interface TerrainData {
  width: number;
  height: number;
  boundingBox: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

interface Polygon {
  type: number;
  rings: [number, number][][]; // Array of rings, each ring is array of [x, y] normalized coords
}

// ============================================================================
// Configuration
// ============================================================================

const TEXTURE_RESOLUTION = 4096; // Output texture size (square)

// ============================================================================
// Land cover types and colors
// ============================================================================

const LAND_TYPES: Record<string, number> = {
  default: 0,
  forest: 1,
  grassland: 2,
  residential: 3,
  commercial: 4,
  park: 5,
  water: 6,
};

// Colors for rendering (CSS format)
const LAND_COLORS: Record<number, string> = {
  0: '#d9e0d1',   // default - light gray/green
  1: '#5a8c5a',   // forest - green
  2: '#bfd1a6',   // grassland - light green  
  3: '#d1ccc8',   // residential - light gray
  4: '#c7c2bc',   // commercial - darker gray
  5: '#8cb880',   // park - medium green
  6: '#739ebf',   // water - blue
};

// Map MBTiles classes to our types
function classifyFeature(layer: string, className: string | undefined): number | null {
  if (layer === 'water') return LAND_TYPES.water;
  if (layer === 'park') return LAND_TYPES.park;
  
  if (layer === 'landcover') {
    if (className === 'wood' || className === 'forest') return LAND_TYPES.forest;
    if (className === 'grass' || className === 'farmland') return LAND_TYPES.grassland;
    if (className === 'wetland') return LAND_TYPES.water;
    return null;
  }
  
  if (layer === 'landuse') {
    if (className === 'residential' || className === 'neighbourhood') return LAND_TYPES.residential;
    if (className === 'commercial' || className === 'retail' || className === 'industrial') return LAND_TYPES.commercial;
    if (className === 'park' || className === 'cemetery' || className === 'recreation_ground') return LAND_TYPES.park;
    if (className === 'forest') return LAND_TYPES.forest;
    if (className === 'grass' || className === 'farmland' || className === 'meadow') return LAND_TYPES.grassland;
    return null;
  }
  
  return null;
}

// ============================================================================
// Tile math
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
// Main
// ============================================================================

async function main() {
  const configPath = Deno.args[0] || 'configs/seattle-running-2025.json';
  
  if (!existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`);
    Deno.exit(1);
  }

  const config: Config = JSON.parse(readFileSync(configPath, 'utf-8'));
  console.log(`\n🌲 Processing landcover: ${config.name}\n`);

  // Load terrain data to get bounds
  const terrainPath = join(config.output.directory, config.output.terrainFile);
  if (!existsSync(terrainPath)) {
    console.error(`Terrain data not found: ${terrainPath}`);
    console.error('Run preprocess-dem.ts first!');
    Deno.exit(1);
  }

  const terrainData: TerrainData = JSON.parse(readFileSync(terrainPath, 'utf-8'));
  const { boundingBox } = terrainData;
  const { minX, minY, maxX, maxY } = boundingBox;

  console.log(`Bounds: [${minX.toFixed(4)}, ${minY.toFixed(4)}] to [${maxX.toFixed(4)}, ${maxY.toFixed(4)}]`);

  // Open MBTiles database
  const mbtilesPath = config.input.mbtiles;
  if (!existsSync(mbtilesPath)) {
    console.error(`MBTiles not found: ${mbtilesPath}`);
    Deno.exit(1);
  }

  console.log(`Opening: ${mbtilesPath}`);
  const SQL = await initSqlJs();
  const mbtilesData = readFileSync(mbtilesPath);
  const db = new SQL.Database(mbtilesData);

  // Use zoom 14 for detail
  const zoom = 14;
  
  // Calculate tile range
  const tileMinX = lon2tile(minX, zoom);
  const tileMaxX = lon2tile(maxX, zoom);
  const tileMinY = lat2tile(maxY, zoom);
  const tileMaxY = lat2tile(minY, zoom);

  const tileCount = (tileMaxX - tileMinX + 1) * (tileMaxY - tileMinY + 1);
  console.log(`Zoom ${zoom}: ${tileCount} tiles`);

  // Collect polygons by type
  const polygonsByType: Map<number, Polygon[]> = new Map();
  for (const type of Object.values(LAND_TYPES)) {
    polygonsByType.set(type, []);
  }

  const stmt = db.prepare('SELECT tile_data FROM tiles WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?');

  let tilesProcessed = 0;
  let featuresExtracted = 0;

  for (let tx = tileMinX; tx <= tileMaxX; tx++) {
    for (let ty = tileMinY; ty <= tileMaxY; ty++) {
      const tmsY = Math.pow(2, zoom) - 1 - ty;
      
      stmt.bind([zoom, tx, tmsY]);
      if (!stmt.step()) {
        stmt.reset();
        continue;
      }
      const row = stmt.get() as [Uint8Array];
      stmt.reset();
      if (!row || !row[0]) continue;
      
      const tileData = row[0];

      // Decompress
      let tileBuffer: Uint8Array;
      try {
        const { gunzipSync } = await import('node:zlib');
        tileBuffer = gunzipSync(tileData);
      } catch {
        tileBuffer = tileData;
      }

      // Parse vector tile
      const pbf = new Pbf(tileBuffer);
      const tile = new VectorTile(pbf);

      // Tile bounds
      const tileLonMin = tile2lon(tx, zoom);
      const tileLonMax = tile2lon(tx + 1, zoom);
      const tileLatMax = tile2lat(ty, zoom);
      const tileLatMin = tile2lat(ty + 1, zoom);

      // Process layers
      for (const layerName of ['water', 'park', 'landcover', 'landuse']) {
        const layer = tile.layers[layerName];
        if (!layer) continue;

        for (let i = 0; i < layer.length; i++) {
          const feature = layer.feature(i);
          const props = feature.properties;
          
          const landType = classifyFeature(layerName, props.class as string | undefined);
          if (landType === null) continue;

          // Get geometry
          const geometry = feature.loadGeometry();
          
          // Convert to normalized coordinates
          const rings: [number, number][][] = [];
          
          for (const ring of geometry) {
            const normalizedRing: [number, number][] = [];
            
            for (const p of ring) {
              // Convert tile coords to lon/lat
              const lon = tileLonMin + (p.x / 4096) * (tileLonMax - tileLonMin);
              const lat = tileLatMax - (p.y / 4096) * (tileLatMax - tileLatMin);
              
              // Convert to normalized [0,1] coords within our bounds
              const normX = (lon - minX) / (maxX - minX);
              const normY = (lat - minY) / (maxY - minY);
              
              // Skip points outside bounds
              if (normX < -0.1 || normX > 1.1 || normY < -0.1 || normY > 1.1) continue;
              
              normalizedRing.push([normX, normY]);
            }
            
            if (normalizedRing.length >= 3) {
              rings.push(normalizedRing);
            }
          }
          
          if (rings.length > 0) {
            // Include all landcover types
            polygonsByType.get(landType)!.push({ type: landType, rings });
            featuresExtracted++;
          }
        }
      }

      tilesProcessed++;
      if (tilesProcessed % 100 === 0) {
        console.log(`  Processed ${tilesProcessed}/${tileCount} tiles...`);
      }
    }
  }

  console.log(`Extracted ${featuresExtracted} polygons`);

  db.close();

  // Render polygons to high-resolution texture
  console.log(`\nRendering to ${TEXTURE_RESOLUTION}x${TEXTURE_RESOLUTION} texture...`);
  
  const canvas = createCanvas(TEXTURE_RESOLUTION, TEXTURE_RESOLUTION);
  const ctx = canvas.getContext('2d');
  
  // Fill with default color
  ctx.fillStyle = LAND_COLORS[0];
  ctx.fillRect(0, 0, TEXTURE_RESOLUTION, TEXTURE_RESOLUTION);
  
  // Render order: water first (background), then others on top
  const renderOrder = [6, 1, 2, 3, 4, 5]; // water, forest, grassland, residential, commercial, park
  
  let renderedCount = 0;
  for (const typeId of renderOrder) {
    const polys = polygonsByType.get(typeId) || [];
    ctx.fillStyle = LAND_COLORS[typeId];
    
    for (const poly of polys) {
      ctx.beginPath();
      
      // Draw outer ring
      const outerRing = poly.rings[0];
      if (outerRing && outerRing.length >= 3) {
        const startX = outerRing[0][0] * TEXTURE_RESOLUTION;
        const startY = (1 - outerRing[0][1]) * TEXTURE_RESOLUTION; // Flip Y
        ctx.moveTo(startX, startY);
        
        for (let i = 1; i < outerRing.length; i++) {
          const x = outerRing[i][0] * TEXTURE_RESOLUTION;
          const y = (1 - outerRing[i][1]) * TEXTURE_RESOLUTION;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        renderedCount++;
      }
    }
  }
  
  console.log(`Rendered ${renderedCount} polygons to texture`);
  
  // Extract pixel data
  const imageData = ctx.getImageData(0, 0, TEXTURE_RESOLUTION, TEXTURE_RESOLUTION);
  const rgba = Array.from(imageData.data);
  
  // Output texture data
  const output = {
    width: TEXTURE_RESOLUTION,
    height: TEXTURE_RESOLUTION,
    data: rgba
  };

  const outputPath = join(config.output.directory, config.output.landcoverFile);
  writeFileSync(outputPath, JSON.stringify(output));
  console.log(`\nWrote ${outputPath}`);

  // Stats
  console.log('\nPolygons by type:');
  for (const [name, value] of Object.entries(LAND_TYPES)) {
    const count = polygonsByType.get(value)?.length || 0;
    if (count > 0) {
      console.log(`  ${name}: ${count}`);
    }
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);
