/**
 * Contour line generation utilities.
 * Uses marching squares algorithm to trace contour lines from elevation data.
 */

// ============================================================================
// Types
// ============================================================================

export interface ContourConfig {
  /** Major contour interval in meters (e.g., 200m) */
  majorInterval: number;
  /** Minor contour interval in meters (e.g., 50m) */
  minorInterval: number;
  /** Line width for major contours */
  majorLineWidth: number;
  /** Line width for minor contours */
  minorLineWidth: number;
  /** RGB color for contour lines */
  lineColor: [number, number, number];
}

export interface ContourLevel {
  elevation: number;
  isMajor: boolean;
}

export type ContourSegment = [[number, number], [number, number]];

// ============================================================================
// Default Configuration
// ============================================================================

export const DEFAULT_CONTOUR_CONFIG: ContourConfig = {
  majorInterval: 200,
  minorInterval: 50,
  majorLineWidth: 1.5,
  minorLineWidth: 0.6,
  lineColor: [100, 85, 70]
};

// ============================================================================
// Marching Squares Algorithm
// ============================================================================

/**
 * Interpolate between two values to find the crossing point
 */
function interpolate(v1: number, v2: number, level: number): number {
  if (Math.abs(v2 - v1) < 0.0001) return 0.5;
  return Math.max(0, Math.min(1, (level - v1) / (v2 - v1)));
}

/**
 * Trace contour lines at a specific elevation using marching squares
 */
export function traceContours(
  elevations: Float32Array | number[],
  width: number,
  height: number,
  level: number,
  minElevation: number,
  maxElevation: number
): ContourSegment[] {
  const segments: ContourSegment[] = [];

  // Helper to get elevation at grid position
  const getElevation = (x: number, y: number): number => {
    if (x < 0 || x >= width || y < 0 || y >= height) return minElevation;
    const normalized = elevations[y * width + x];
    return normalized * (maxElevation - minElevation) + minElevation;
  };

  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const tl = getElevation(x, y);
      const tr = getElevation(x + 1, y);
      const br = getElevation(x + 1, y + 1);
      const bl = getElevation(x, y + 1);

      // Build case index
      let caseIndex = 0;
      if (tl >= level) caseIndex |= 1;
      if (tr >= level) caseIndex |= 2;
      if (br >= level) caseIndex |= 4;
      if (bl >= level) caseIndex |= 8;

      // Skip if all corners are on same side
      if (caseIndex === 0 || caseIndex === 15) continue;

      // Calculate edge crossing points
      const topT = interpolate(tl, tr, level);
      const top: [number, number] = [x + topT, y];
      const rightT = interpolate(tr, br, level);
      const right: [number, number] = [x + 1, y + rightT];
      const bottomT = interpolate(bl, br, level);
      const bottom: [number, number] = [x + bottomT, y + 1];
      const leftT = interpolate(tl, bl, level);
      const left: [number, number] = [x, y + leftT];

      // Generate segments based on case
      switch (caseIndex) {
        case 1: case 14: segments.push([top, left]); break;
        case 2: case 13: segments.push([top, right]); break;
        case 3: case 12: segments.push([left, right]); break;
        case 4: case 11: segments.push([right, bottom]); break;
        case 5: {
          const avg5 = (tl + tr + br + bl) / 4;
          if (avg5 >= level) {
            segments.push([top, right]);
            segments.push([bottom, left]);
          } else {
            segments.push([top, left]);
            segments.push([right, bottom]);
          }
          break;
        }
        case 6: case 9: segments.push([top, bottom]); break;
        case 7: case 8: segments.push([bottom, left]); break;
        case 10: {
          const avg10 = (tl + tr + br + bl) / 4;
          if (avg10 >= level) {
            segments.push([top, left]);
            segments.push([right, bottom]);
          } else {
            segments.push([top, right]);
            segments.push([bottom, left]);
          }
          break;
        }
      }
    }
  }

  return segments;
}

/**
 * Generate all contour levels for an elevation range
 */
export function generateContourLevels(
  minElevation: number,
  maxElevation: number,
  config: ContourConfig = DEFAULT_CONTOUR_CONFIG
): ContourLevel[] {
  const levels: ContourLevel[] = [];
  const startElev = Math.ceil(minElevation / config.minorInterval) * config.minorInterval;
  const endElev = Math.floor(maxElevation / config.minorInterval) * config.minorInterval;

  for (let elev = startElev; elev <= endElev; elev += config.minorInterval) {
    levels.push({
      elevation: elev,
      isMajor: elev % config.majorInterval === 0
    });
  }

  return levels;
}

// ============================================================================
// Canvas-based Contour Rendering
// ============================================================================

/**
 * Render contours to an alpha channel array (for use in textures)
 */
export function renderContoursToAlpha(
  elevations: Float32Array | number[],
  width: number,
  height: number,
  minElevation: number,
  maxElevation: number,
  config: ContourConfig = DEFAULT_CONTOUR_CONFIG
): Uint8Array {
  // Use OffscreenCanvas if available, otherwise create a regular canvas
  let canvas: OffscreenCanvas | HTMLCanvasElement;
  let ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

  if (typeof OffscreenCanvas !== 'undefined') {
    canvas = new OffscreenCanvas(width, height);
    ctx = canvas.getContext('2d')!;
  } else if (typeof document !== 'undefined') {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d')!;
  } else {
    // Fallback for Node.js without canvas - return empty alpha
    return new Uint8Array(width * height);
  }

  ctx.clearRect(0, 0, width, height);

  const levels = generateContourLevels(minElevation, maxElevation, config);
  const [r, g, b] = config.lineColor;

  // Draw minor contours first
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
  ctx.lineWidth = config.minorLineWidth;
  ctx.lineCap = 'round';

  for (const { elevation, isMajor } of levels) {
    if (isMajor) continue;
    const segments = traceContours(elevations, width, height, elevation, minElevation, maxElevation);

    ctx.beginPath();
    for (const [p1, p2] of segments) {
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
    }
    ctx.stroke();
  }

  // Draw major contours on top
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.45)`;
  ctx.lineWidth = config.majorLineWidth;

  for (const { elevation, isMajor } of levels) {
    if (!isMajor) continue;
    const segments = traceContours(elevations, width, height, elevation, minElevation, maxElevation);

    ctx.beginPath();
    for (const [p1, p2] of segments) {
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
    }
    ctx.stroke();
  }

  // Extract alpha channel
  const imageData = ctx.getImageData(0, 0, width, height);
  const alpha = new Uint8Array(width * height);
  for (let i = 0; i < alpha.length; i++) {
    alpha[i] = imageData.data[i * 4 + 3];
  }

  return alpha;
}

// ============================================================================
// Node.js Canvas Rendering (for preprocessing scripts)
// ============================================================================

/**
 * Render contours using node-canvas (for preprocessing)
 * This should be called from a Node.js script that imports 'canvas'
 */
export function renderContoursNode(
  // deno-lint-ignore no-explicit-any
  createCanvas: (width: number, height: number) => any,
  elevations: Float32Array | number[],
  width: number,
  height: number,
  minElevation: number,
  maxElevation: number,
  config: ContourConfig = DEFAULT_CONTOUR_CONFIG
): Uint8Array {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  const levels = generateContourLevels(minElevation, maxElevation, config);
  const [r, g, b] = config.lineColor;

  // Draw minor contours first
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
  ctx.lineWidth = config.minorLineWidth;
  ctx.lineCap = 'round';

  let totalSegments = 0;

  for (const { elevation, isMajor } of levels) {
    if (isMajor) continue;
    const segments = traceContours(elevations, width, height, elevation, minElevation, maxElevation);
    totalSegments += segments.length;

    ctx.beginPath();
    for (const [p1, p2] of segments) {
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
    }
    ctx.stroke();
  }

  console.log(`Minor: ${totalSegments.toLocaleString()} segments`);

  // Draw major contours on top
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.45)`;
  ctx.lineWidth = config.majorLineWidth;

  totalSegments = 0;
  for (const { elevation, isMajor } of levels) {
    if (!isMajor) continue;
    const segments = traceContours(elevations, width, height, elevation, minElevation, maxElevation);
    totalSegments += segments.length;

    ctx.beginPath();
    for (const [p1, p2] of segments) {
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
    }
    ctx.stroke();
  }

  console.log(`Major: ${totalSegments.toLocaleString()} segments`);

  // Extract alpha channel
  const imageData = ctx.getImageData(0, 0, width, height);
  const alpha = new Uint8Array(width * height);
  for (let i = 0; i < alpha.length; i++) {
    alpha[i] = imageData.data[i * 4 + 3];
  }

  return alpha;
}

