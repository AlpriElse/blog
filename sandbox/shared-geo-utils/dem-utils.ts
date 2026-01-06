/**
 * DEM (Digital Elevation Model) processing utilities.
 * Handles coordinate projections, GeoTIFF loading, and elevation sampling.
 */

import { fromFile } from 'geotiff';
import proj4 from 'proj4';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

// ============================================================================
// Types
// ============================================================================

export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface UTMBounds {
  minE: number;
  maxE: number;
  minN: number;
  maxN: number;
}

export interface GeoTiffTile {
  path: string;
  tiff: any;
  image: any;
  bounds: Bounds;
  width: number;
  height: number;
  isWGS84: boolean;
  data: Float32Array | null;
}

export interface TerrainData {
  width: number;
  height: number;
  elevations: Float32Array;
  minElevation: number;
  maxElevation: number;
  boundingBox: Bounds;
  utmBounds: UTMBounds;
}

export interface TerrainConfig {
  paddingEW: number;
  paddingNS: number;
  maxDimension: number;
  targetResolution: number;
  medianFilterRadius: number;
  utmZone: number;
}

// ============================================================================
// Projection Utilities
// ============================================================================

/**
 * Initialize proj4 with UTM zone definition
 */
export function initProjection(utmZone: number = 32): void {
  const UTM = `+proj=utm +zone=${utmZone} +datum=WGS84 +units=m +no_defs`;
  proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
  proj4.defs('UTM', UTM);
}

/**
 * Convert WGS84 coordinates to UTM
 */
export function toUTM(lon: number, lat: number): { easting: number; northing: number } {
  const [easting, northing] = proj4('EPSG:4326', 'UTM', [lon, lat]);
  return { easting, northing };
}

/**
 * Convert UTM coordinates to WGS84
 */
export function toLonLat(easting: number, northing: number): { lon: number; lat: number } {
  const [lon, lat] = proj4('UTM', 'EPSG:4326', [easting, northing]);
  return { lon, lat };
}

/**
 * Convert meters to degrees (approximate, at given latitude)
 */
export function metersToDegrees(meters: number, latitude: number): { lat: number; lon: number } {
  const latRad = latitude * Math.PI / 180;
  const metersPerDegreeLat = 111132.92 - 559.82 * Math.cos(2 * latRad) + 1.175 * Math.cos(4 * latRad);
  const metersPerDegreeLon = 111412.84 * Math.cos(latRad) - 93.5 * Math.cos(3 * latRad);
  return {
    lat: meters / metersPerDegreeLat,
    lon: meters / metersPerDegreeLon
  };
}

// ============================================================================
// GeoTIFF Loading
// ============================================================================

/**
 * Find all DEM tiles (GeoTIFF files) in a directory
 */
export function findDEMTiles(tilesDir: string): string[] {
  if (!existsSync(tilesDir)) {
    throw new Error(`DEM tiles directory not found: ${tilesDir}`);
  }

  const entries = readdirSync(tilesDir, { withFileTypes: true });
  const tiles: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Look for .tif files inside subdirectories (TINITALY style)
      const subDir = join(tilesDir, entry.name);
      const files = readdirSync(subDir);
      for (const file of files) {
        if (file.endsWith('.tif')) {
          tiles.push(join(subDir, file));
        }
      }
    } else if (entry.name.endsWith('.tif')) {
      // Direct .tif files in the tiles directory
      tiles.push(join(tilesDir, entry.name));
    }
  }

  return tiles;
}

/**
 * Load GeoTIFF tiles and extract metadata
 */
export async function loadGeoTiffTiles(tilePaths: string[]): Promise<GeoTiffTile[]> {
  console.log(`Loading ${tilePaths.length} DEM tiles...`);
  const tiles: GeoTiffTile[] = [];

  for (const tilePath of tilePaths) {
    console.log(`  Loading ${tilePath}...`);
    const tiff = await fromFile(tilePath);
    const image = await tiff.getImage();
    const [minX, minY, maxX, maxY] = image.getBoundingBox();
    const geoKeys = image.getGeoKeys();

    // Detect coordinate system
    const isWGS84 = geoKeys.GeographicTypeGeoKey === 4326 && !geoKeys.ProjectedCSTypeGeoKey;

    if (isWGS84) {
      console.log(`    Bounds (WGS84): [${minX.toFixed(4)}, ${minY.toFixed(4)}] to [${maxX.toFixed(4)}, ${maxY.toFixed(4)}]`);
    } else {
      console.log(`    Bounds (UTM): E[${minX.toFixed(0)}, ${maxX.toFixed(0)}] N[${minY.toFixed(0)}, ${maxY.toFixed(0)}]`);
    }

    tiles.push({
      path: tilePath,
      tiff,
      image,
      bounds: { minX, minY, maxX, maxY },
      width: image.getWidth(),
      height: image.getHeight(),
      isWGS84,
      data: null
    });
  }

  return tiles;
}

/**
 * Load raster data for all tiles
 */
export async function loadTileRasters(tiles: GeoTiffTile[]): Promise<void> {
  console.log('Loading raster data...');
  for (const tile of tiles) {
    const rasters = await tile.image.readRasters();
    tile.data = rasters[0] as Float32Array;
  }
}

// ============================================================================
// Elevation Sampling
// ============================================================================

/**
 * Sample elevation at WGS84 coordinates from loaded tiles
 */
export function sampleElevationWGS84(tiles: GeoTiffTile[], lon: number, lat: number): number | null {
  for (const tile of tiles) {
    const { bounds, width, height, data } = tile;
    if (!data) continue;

    if (lon >= bounds.minX && lon <= bounds.maxX &&
        lat >= bounds.minY && lat <= bounds.maxY) {
      const px = Math.floor((lon - bounds.minX) / (bounds.maxX - bounds.minX) * width);
      const py = Math.floor((bounds.maxY - lat) / (bounds.maxY - bounds.minY) * height);

      if (px >= 0 && px < width && py >= 0 && py < height) {
        return data[py * width + px];
      }
    }
  }
  return null;
}

/**
 * Sample elevation at UTM coordinates from loaded tiles
 */
export function sampleElevationUTM(tiles: GeoTiffTile[], easting: number, northing: number): number | null {
  for (const tile of tiles) {
    const { bounds, width, height, data } = tile;
    if (!data) continue;

    if (easting >= bounds.minX && easting <= bounds.maxX &&
        northing >= bounds.minY && northing <= bounds.maxY) {
      const px = Math.floor((easting - bounds.minX) / (bounds.maxX - bounds.minX) * width);
      const py = Math.floor((bounds.maxY - northing) / (bounds.maxY - bounds.minY) * height);

      if (px >= 0 && px < width && py >= 0 && py < height) {
        return data[py * width + px];
      }
    }
  }
  return null;
}

/**
 * Bilinear interpolation for smoother elevation sampling
 */
export function sampleElevationBilinear(
  elevations: Float32Array | number[],
  width: number,
  height: number,
  normX: number,
  normY: number
): number {
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
// Filtering
// ============================================================================

/**
 * Median filter - preserves edges while removing banding artifacts
 */
export function medianFilter(
  data: Float32Array,
  width: number,
  height: number,
  radius: number
): Float32Array {
  const result = new Float32Array(width * height);
  const windowSize = (2 * radius + 1) * (2 * radius + 1);
  const values = new Float32Array(windowSize);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let count = 0;

      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const sx = Math.max(0, Math.min(width - 1, x + dx));
          const sy = Math.max(0, Math.min(height - 1, y + dy));
          values[count++] = data[sy * width + sx];
        }
      }

      values.subarray(0, count).sort();
      result[y * width + x] = values[Math.floor(count / 2)];
    }

    if (y % 500 === 0) {
      console.log(`  Median filter row ${y}/${height}...`);
    }
  }

  return result;
}

// ============================================================================
// Terrain Grid Generation
// ============================================================================

/**
 * Generate an elevation grid from tiles, cropped and resampled
 */
export async function generateElevationGrid(
  tiles: GeoTiffTile[],
  cropBounds: Bounds,
  utmBounds: UTMBounds,
  config: TerrainConfig
): Promise<TerrainData> {
  const isWGS84 = tiles[0]?.isWGS84 ?? true;

  // Calculate output resolution
  const widthMeters = utmBounds.maxE - utmBounds.minE;
  const heightMeters = utmBounds.maxN - utmBounds.minN;

  let outputWidth = Math.round(widthMeters / config.targetResolution);
  let outputHeight = Math.round(heightMeters / config.targetResolution);

  const downsampleFactor = Math.max(1, Math.ceil(Math.max(outputWidth, outputHeight) / config.maxDimension));
  outputWidth = Math.floor(outputWidth / downsampleFactor);
  outputHeight = Math.floor(outputHeight / downsampleFactor);

  const effectiveRes = config.targetResolution * downsampleFactor;

  console.log(`\nArea: ${(widthMeters / 1000).toFixed(1)}km x ${(heightMeters / 1000).toFixed(1)}km`);
  console.log(`Output: ${outputWidth} x ${outputHeight} (${(outputWidth * outputHeight).toLocaleString()} vertices)`);
  console.log(`Resolution: ~${effectiveRes.toFixed(1)}m`);

  // Sample elevation grid
  console.log('\nSampling elevation grid...');
  const elevations = new Float32Array(outputWidth * outputHeight);
  let minElev = Infinity, maxElev = -Infinity;
  let validCount = 0;

  for (let y = 0; y < outputHeight; y++) {
    for (let x = 0; x < outputWidth; x++) {
      let elev: number | null;

      if (isWGS84) {
        const lon = cropBounds.minX + (x + 0.5) / outputWidth * (cropBounds.maxX - cropBounds.minX);
        const lat = cropBounds.maxY - (y + 0.5) / outputHeight * (cropBounds.maxY - cropBounds.minY);
        elev = sampleElevationWGS84(tiles, lon, lat);
      } else {
        const easting = utmBounds.minE + (x + 0.5) / outputWidth * (utmBounds.maxE - utmBounds.minE);
        const northing = utmBounds.maxN - (y + 0.5) / outputHeight * (utmBounds.maxN - utmBounds.minN);
        elev = sampleElevationUTM(tiles, easting, northing);
      }

      const idx = y * outputWidth + x;

      if (elev !== null && elev > -1000 && elev < 9000) {
        elevations[idx] = elev;
        minElev = Math.min(minElev, elev);
        maxElev = Math.max(maxElev, elev);
        validCount++;
      } else {
        elevations[idx] = -9999;
      }
    }

    if (y % 500 === 0) console.log(`  Row ${y}/${outputHeight}...`);
  }

  console.log(`\nValid: ${validCount.toLocaleString()}, Elevation: ${minElev.toFixed(1)}m to ${maxElev.toFixed(1)}m`);

  // Fill no-data
  for (let i = 0; i < elevations.length; i++) {
    if (elevations[i] === -9999) elevations[i] = minElev;
  }

  // Apply median filter
  console.log('\nApplying median filter...');
  const smoothed = medianFilter(elevations, outputWidth, outputHeight, config.medianFilterRadius);

  return {
    width: outputWidth,
    height: outputHeight,
    elevations: smoothed,
    minElevation: minElev,
    maxElevation: maxElev,
    boundingBox: cropBounds,
    utmBounds
  };
}

/**
 * Normalize elevations to 0-1 range
 */
export function normalizeElevations(elevations: Float32Array, minElev: number, maxElev: number): Float32Array {
  const normalized = new Float32Array(elevations.length);
  const range = maxElev - minElev;

  for (let i = 0; i < elevations.length; i++) {
    normalized[i] = (elevations[i] - minElev) / range;
  }

  return normalized;
}

