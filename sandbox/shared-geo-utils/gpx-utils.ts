/**
 * GPX file parsing utilities.
 * Handles parsing GPX files and extracting track data.
 */

import { readFileSync } from 'fs';

// ============================================================================
// Types
// ============================================================================

export interface TrackPoint {
  lat: number;
  lon: number;
  ele: number;
}

export interface TrackSegment {
  points: TrackPoint[];
}

export interface GPXData {
  segments: TrackSegment[];
  allPoints: TrackPoint[];
  bounds: {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  };
}

export interface NormalizedTrackPoint {
  /** Normalized X coordinate (0-1) */
  x: number;
  /** Normalized Y coordinate (0-1) */
  y: number;
  /** Normalized elevation (0-1) */
  z: number;
}

// ============================================================================
// GPX Parsing
// ============================================================================

/**
 * Parse a GPX file and extract track segments
 */
export function parseGPX(gpxPath: string): GPXData {
  console.log(`Parsing GPX: ${gpxPath}`);
  const content = readFileSync(gpxPath, 'utf-8');
  return parseGPXContent(content);
}

/**
 * Parse GPX content string and extract track segments
 */
export function parseGPXContent(content: string): GPXData {
  const segments: TrackSegment[] = [];
  const trksegRegex = /<trkseg>([\s\S]*?)<\/trkseg>/g;
  const trkptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)"[^>]*>[\s\S]*?<ele>([^<]+)<\/ele>[\s\S]*?<\/trkpt>/g;

  let segMatch;
  while ((segMatch = trksegRegex.exec(content)) !== null) {
    const segmentContent = segMatch[1];
    const points: TrackPoint[] = [];
    let ptMatch;

    // Reset regex for each segment
    trkptRegex.lastIndex = 0;
    while ((ptMatch = trkptRegex.exec(segmentContent)) !== null) {
      points.push({
        lat: parseFloat(ptMatch[1]),
        lon: parseFloat(ptMatch[2]),
        ele: parseFloat(ptMatch[3])
      });
    }

    if (points.length > 0) {
      segments.push({ points });
    }
  }

  const allPoints = segments.flatMap(seg => seg.points);
  const bounds = calculateBounds(allPoints);

  const totalPoints = segments.reduce((sum, seg) => sum + seg.points.length, 0);
  console.log(`Found ${segments.length} segments with ${totalPoints} total track points`);

  return { segments, allPoints, bounds };
}

/**
 * Calculate bounds from track points
 */
export function calculateBounds(points: TrackPoint[]): GPXData['bounds'] {
  let minLat = Infinity, maxLat = -Infinity;
  let minLon = Infinity, maxLon = -Infinity;

  for (const pt of points) {
    minLat = Math.min(minLat, pt.lat);
    maxLat = Math.max(maxLat, pt.lat);
    minLon = Math.min(minLon, pt.lon);
    maxLon = Math.max(maxLon, pt.lon);
  }

  return { minLat, maxLat, minLon, maxLon };
}

/**
 * Get track bounds in WGS84 with padding
 */
export function getTrackBoundsWithPadding(
  points: TrackPoint[],
  paddingEW: number,
  paddingNS: number,
  metersToDegrees: (meters: number, latitude: number) => { lat: number; lon: number }
): GPXData['bounds'] {
  const baseBounds = calculateBounds(points);
  const centerLat = (baseBounds.minLat + baseBounds.maxLat) / 2;
  
  const paddingDegEW = metersToDegrees(paddingEW, centerLat);
  const paddingDegNS = metersToDegrees(paddingNS, centerLat);

  return {
    minLon: baseBounds.minLon - paddingDegEW.lon,
    maxLon: baseBounds.maxLon + paddingDegEW.lon,
    minLat: baseBounds.minLat - paddingDegNS.lat,
    maxLat: baseBounds.maxLat + paddingDegNS.lat
  };
}

/**
 * Normalize track points to 0-1 range based on bounding box
 */
export function normalizeTrackPoints(
  points: TrackPoint[],
  bounds: { minLon: number; maxLon: number; minLat: number; maxLat: number },
  elevationRange: { min: number; max: number }
): NormalizedTrackPoint[] {
  const lonRange = bounds.maxLon - bounds.minLon;
  const latRange = bounds.maxLat - bounds.minLat;
  const eleRange = elevationRange.max - elevationRange.min;

  return points.map(pt => ({
    x: (pt.lon - bounds.minLon) / lonRange,
    y: (pt.lat - bounds.minLat) / latRange,
    z: eleRange > 0 ? (pt.ele - elevationRange.min) / eleRange : 0
  }));
}

/**
 * Downsample track points by factor
 */
export function downsampleTrack(points: TrackPoint[], factor: number): TrackPoint[] {
  return points.filter((_, i) => i % factor === 0);
}

/**
 * Downsample normalized track points by factor
 */
export function downsampleNormalizedTrack(points: NormalizedTrackPoint[], factor: number): NormalizedTrackPoint[] {
  return points.filter((_, i) => i % factor === 0);
}

// ============================================================================
// Polyline Decoding (for Strava/Google encoded polylines)
// ============================================================================

/**
 * Decode a Google/Strava encoded polyline string
 */
export function decodePolyline(encoded: string): [number, number][] {
  if (!encoded) return [];
  
  const points: [number, number][] = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let shift = 0, result = 0, byte: number;
    
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += (result & 1) ? ~(result >> 1) : (result >> 1);

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += (result & 1) ? ~(result >> 1) : (result >> 1);

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
}

/**
 * Calculate bounds from decoded polyline points
 */
export function calculatePolylineBounds(points: [number, number][]): {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
} {
  let minLat = Infinity, maxLat = -Infinity;
  let minLng = Infinity, maxLng = -Infinity;

  for (const [lat, lng] of points) {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
  }

  return { minLat, maxLat, minLng, maxLng };
}

