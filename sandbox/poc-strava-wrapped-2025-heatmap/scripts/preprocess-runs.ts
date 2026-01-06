/**
 * Preprocess Strava export data for the heatmap visualization.
 * 
 * Reads activities.csv and GPX files from the Strava archive export,
 * filters to 2025 runs, and outputs a JSON file for the frontend.
 * 
 * Usage: deno run --allow-read --allow-write scripts/preprocess-runs.ts [config.json]
 */

import { existsSync } from 'node:fs';

// ============================================================================
// Types
// ============================================================================

interface RunsConfig {
  dataDir: string;
  outputPath: string;
  excludeActivityIds?: string[];
  bounds?: {
    maxLat?: number;
    minLat?: number;
    maxLng?: number;
    minLng?: number;
  };
}

interface ActivityCSVRow {
  activityId: string;
  activityDate: string;
  activityName: string;
  activityType: string;
  distance: number;
  movingTime: number;
  elevationGain: number;
  filename: string;
}

interface ProcessedRun {
  id: string;
  name: string;
  date: string;
  distance: number; // meters
  movingTime: number; // seconds
  elevationGain: number; // meters
  route: [number, number][]; // [lat, lon] pairs
}

interface OutputData {
  runs: ProcessedRun[];
  totalDistance: number;
  totalTime: number;
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}

// ============================================================================
// CSV Parsing
// ============================================================================

function parseCSV(content: string): ActivityCSVRow[] {
  const lines = content.trim().split("\n");
  const headerLine = lines[0];
  
  // Parse header to get column indices
  // The CSV has duplicate column names, so we need to find them by index
  const headers = parseCSVLine(headerLine);
  
  const idIdx = headers.indexOf("Activity ID"); // 0
  const dateIdx = headers.indexOf("Activity Date"); // 1
  const nameIdx = headers.indexOf("Activity Name"); // 2
  const typeIdx = headers.indexOf("Activity Type"); // 3
  const filenameIdx = headers.indexOf("Filename"); // 12
  const movingTimeIdx = headers.indexOf("Moving Time"); // 16
  // Second "Distance" column (index 17) has the actual distance in meters
  const distanceIdx = headers.lastIndexOf("Distance"); // 17
  const elevationIdx = headers.indexOf("Elevation Gain"); // 20

  const rows: ActivityCSVRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length < Math.max(idIdx, dateIdx, nameIdx, typeIdx, filenameIdx) + 1) {
      continue;
    }

    rows.push({
      activityId: fields[idIdx],
      activityDate: fields[dateIdx],
      activityName: fields[nameIdx],
      activityType: fields[typeIdx],
      distance: parseFloat(fields[distanceIdx]) || 0,
      movingTime: parseFloat(fields[movingTimeIdx]) || 0,
      elevationGain: parseFloat(fields[elevationIdx]) || 0,
      filename: fields[filenameIdx],
    });
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current);

  return fields;
}

// ============================================================================
// Date Filtering
// ============================================================================

function isIn2025(dateStr: string): boolean {
  // Date format: "Oct 1, 2020, 12:05:20 PM"
  const match = dateStr.match(/(\w+)\s+(\d+),\s+(\d{4})/);
  if (!match) return false;
  
  const year = parseInt(match[3], 10);
  return year === 2025;
}

// ============================================================================
// GPX Processing
// ============================================================================

async function loadGPXRoute(filepath: string): Promise<[number, number][] | null> {
  try {
    let content: string;
    
    // Handle gzipped files
    if (filepath.endsWith(".gz")) {
      const gzData = await Deno.readFile(filepath);
      const ds = new DecompressionStream("gzip");
      const writer = ds.writable.getWriter();
      writer.write(gzData);
      writer.close();
      
      const reader = ds.readable.getReader();
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }
      
      content = new TextDecoder().decode(
        new Uint8Array(chunks.reduce((acc, chunk) => [...acc, ...chunk], [] as number[]))
      );
    } else {
      content = await Deno.readTextFile(filepath);
    }

    return parseGPXToRoute(content);
  } catch (error) {
    console.error(`  Failed to load ${filepath}:`, error);
    return null;
  }
}

function parseGPXToRoute(content: string): [number, number][] {
  const route: [number, number][] = [];
  
  // Parse track points from GPX using regex
  // Format: <trkpt lat="40.1135660" lon="-88.2322620">
  const trkptRegex = /<trkpt\s+lat="([^"]+)"\s+lon="([^"]+)"/g;
  
  let match;
  while ((match = trkptRegex.exec(content)) !== null) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    if (!isNaN(lat) && !isNaN(lon)) {
      route.push([lat, lon]);
    }
  }
  
  return route;
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  // Load config if provided
  const configPath = Deno.args[0];
  let config: RunsConfig = {
    dataDir: "./data/strava-export",
    outputPath: "./public/runs_2025.json",
    excludeActivityIds: ["14594503781"], // Default exclusion
    bounds: {},
  };

  if (configPath && existsSync(configPath)) {
    const fullConfig = JSON.parse(await Deno.readTextFile(configPath));
    if (fullConfig.runsPreprocess) {
      config = { ...config, ...fullConfig.runsPreprocess };
    }
    console.log(`Loaded config from ${configPath}`);
  }

  const { dataDir, outputPath, excludeActivityIds = [], bounds = {} } = config;

  console.log("Loading activities.csv...");
  const csvContent = await Deno.readTextFile(`${dataDir}/activities.csv`);
  const allActivities = parseCSV(csvContent);
  console.log(`  Found ${allActivities.length} total activities`);

  // Filter to 2025 runs with GPX files, excluding specific activities
  const excludeSet = new Set(excludeActivityIds);
  const runs2025 = allActivities.filter(
    (a) => a.activityType === "Run" && isIn2025(a.activityDate) && a.filename
      && !excludeSet.has(a.activityId)
  );
  console.log(`  ${runs2025.length} runs in 2025 with GPX data (excluded ${excludeActivityIds.length} activities)`);

  // Process each run
  const processedRuns: ProcessedRun[] = [];
  let minLat = Infinity, maxLat = -Infinity;
  let minLng = Infinity, maxLng = -Infinity;

  // Bounds filters from config
  const boundsMaxLat = bounds.maxLat ?? Infinity;
  const boundsMinLat = bounds.minLat ?? -Infinity;
  const boundsMaxLng = bounds.maxLng ?? Infinity;
  const boundsMinLng = bounds.minLng ?? -Infinity;

  if (bounds.maxLat || bounds.minLat || bounds.maxLng || bounds.minLng) {
    console.log(`  Applying bounds filter: lat [${boundsMinLat}, ${boundsMaxLat}], lng [${boundsMinLng}, ${boundsMaxLng}]`);
  }

  for (let i = 0; i < runs2025.length; i++) {
    const activity = runs2025[i];
    const gpxPath = `${dataDir}/${activity.filename}`;
    
    console.log(`[${i + 1}/${runs2025.length}] ${activity.activityName}`);
    
    const route = await loadGPXRoute(gpxPath);
    if (!route || route.length < 2) {
      console.log(`  Skipped (no route data)`);
      continue;
    }

    // Check if route is within bounds (use start point for filtering)
    const startLat = route[0][0];
    const startLng = route[0][1];
    if (startLat > boundsMaxLat || startLat < boundsMinLat ||
        startLng > boundsMaxLng || startLng < boundsMinLng) {
      console.log(`  Skipped (outside bounds: ${startLat.toFixed(4)}, ${startLng.toFixed(4)})`);
      continue;
    }

    // Clip route points to bounds
    const clippedRoute = route.filter(([lat, lng]) =>
      lat <= boundsMaxLat && lat >= boundsMinLat &&
      lng <= boundsMaxLng && lng >= boundsMinLng
    );

    if (clippedRoute.length < 2) {
      console.log(`  Skipped (route fully outside bounds)`);
      continue;
    }

    // Update bounds from clipped route
    for (const [lat, lng] of clippedRoute) {
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    }

    // Downsample route for smaller file size (keep every 3rd point)
    const downsampledRoute = clippedRoute.filter((_, i) => i % 3 === 0);
    // Ensure we keep the last point
    if (clippedRoute.length > 0 && downsampledRoute[downsampledRoute.length - 1] !== clippedRoute[clippedRoute.length - 1]) {
      downsampledRoute.push(clippedRoute[clippedRoute.length - 1]);
    }

    processedRuns.push({
      id: activity.activityId,
      name: activity.activityName,
      date: activity.activityDate,
      distance: activity.distance,
      movingTime: activity.movingTime,
      elevationGain: activity.elevationGain,
      route: downsampledRoute,
    });
  }

  // Calculate totals
  const totalDistance = processedRuns.reduce((sum, r) => sum + r.distance, 0);
  const totalTime = processedRuns.reduce((sum, r) => sum + r.movingTime, 0);

  const output: OutputData = {
    runs: processedRuns,
    totalDistance,
    totalTime,
    bounds: { minLat, maxLat, minLng, maxLng },
  };

  // Write output
  await Deno.writeTextFile(outputPath, JSON.stringify(output, null, 2));
  
  console.log(`\n✅ Processed ${processedRuns.length} runs`);
  console.log(`   Total distance: ${(totalDistance / 1000).toFixed(1)} km`);
  console.log(`   Total time: ${Math.floor(totalTime / 3600)}h ${Math.floor((totalTime % 3600) / 60)}m`);
  console.log(`   Bounds: [${minLat.toFixed(4)}, ${minLng.toFixed(4)}] to [${maxLat.toFixed(4)}, ${maxLng.toFixed(4)}]`);
  console.log(`   Output: ${outputPath}`);
}

main();

