# Bounds Configuration Guide

Tips for adjusting the geographic bounds of the Strava heatmap visualization.

## Current Architecture

The bounds are calculated automatically from your running routes:

1. **`preprocess-runs.ts`** - Filters activities and outputs `runs_2025.json`
2. **`preprocess-dem.ts`** - Reads routes, calculates bounds with padding, generates terrain
3. **`preprocess-landcover.ts`** - Reads terrain bounds from `terrain-data.json`, generates landcover texture

The terrain bounds flow **downstream** - DEM defines the bounds, and landcover follows.

## How Bounds Are Currently Calculated

In `preprocess-dem.ts`:

```typescript
// 1. Routes are filtered to the main cluster (within 0.5° of the most common start area)
// 2. Bounds are calculated from all points in filtered routes
// 3. Padding is added (default 10%)

const latRange = maxLat - minLat;
const lngRange = maxLng - minLng;
const pad = config.terrain.paddingPercent;  // 0.1 = 10%
minLat -= latRange * pad;
maxLat += latRange * pad;
minLng -= lngRange * pad;
maxLng += lngRange * pad;
```

## Ways to Adjust Bounds

### Option 1: Exclude Specific Activities (Recommended)

In `configs/seattle-running-2025.json`, add activity IDs to exclude:

```json
"runsPreprocess": {
  "excludeActivityIds": [
    "14594503781",
    "15916278381"
  ]
}
```

To find activity IDs to exclude:
```bash
# Find northernmost activity
deno eval "
const d = JSON.parse(Deno.readTextFileSync('public/runs_2025.json'));
const sorted = d.runs.map(r => ({
  id: r.id, name: r.name,
  maxLat: Math.max(...r.route.map(p => p[0]))
})).sort((a, b) => b.maxLat - a.maxLat);
sorted.slice(0, 5).forEach(r => console.log(r.id, r.maxLat.toFixed(4), r.name));
"
```

### Option 2: Filter by Geographic Bounds in Runs Preprocessing

In `configs/seattle-running-2025.json`:

```json
"runsPreprocess": {
  "bounds": {
    "maxLat": 47.68,
    "minLat": 47.45,
    "maxLng": -121.95,
    "minLng": -122.50
  }
}
```

This filters activities by their **start point** and clips route points to these bounds.

### Option 3: Adjust Padding

In `configs/seattle-running-2025.json`:

```json
"terrain": {
  "paddingPercent": 0.05  // 5% instead of 10%
}
```

Less padding = tighter crop around routes.

## Important Coordinate Conventions

### Geographic Coordinates (WGS84)
- **Latitude** (lat): North-South, ranges ~47.45 to 47.70 for Seattle
  - Higher values = more north
- **Longitude** (lng): East-West, ranges ~-122.5 to -122.0 for Seattle
  - More negative = more west (Seattle is west, so values are negative)

### In the Data Files
- `terrain-data.json` boundingBox: `minX/maxX` = longitude, `minY/maxY` = latitude
- `routes-data.json` bounds: `minLng/maxLng`, `minLat/maxLat`
- Routes are normalized to 0-1 range based on terrain bounds

### In Three.js Scene
- X axis = East-West (longitude)
- Z axis = North-South (latitude, but inverted: -Z = north)
- Y axis = Elevation

## Regenerating After Bounds Changes

After modifying the config, run all preprocessing scripts in order:

```bash
# 1. Runs (if changing activity filters or bounds)
deno run --allow-read --allow-write scripts/preprocess-runs.ts configs/seattle-running-2025.json

# 2. DEM terrain
deno run -A scripts/preprocess-dem.ts configs/seattle-running-2025.json

# 3. Landcover (uses terrain bounds)
deno run -A scripts/preprocess-landcover.ts configs/seattle-running-2025.json

# 4. Rebuild frontend
npm run build
```

## Gotchas

1. **Don't add `boundsOverride` to terrain config** - This was attempted and caused coordinate system issues. Let the bounds be calculated from routes.

2. **DEM coverage matters** - The terrain can only show elevation data where the DEM file has coverage. Check the log output for "DEM coverage" bounds.

3. **Aspect ratio is preserved** - The terrain dimensions (width × height) are calculated to maintain geographic aspect ratio at ~60m resolution.

4. **Route clipping** - Routes that extend outside terrain bounds will have points clipped, which may cause visual artifacts at edges.

## Useful Commands

```bash
# Check current bounds in generated data
deno eval "
const t = JSON.parse(Deno.readTextFileSync('public/terrain-data.json'));
const r = JSON.parse(Deno.readTextFileSync('public/routes-data.json'));
console.log('Terrain:', t.boundingBox);
console.log('Routes:', r.bounds);
console.log('Dimensions:', t.width, 'x', t.height);
"

# List activities outside Seattle area
deno eval "
const d = JSON.parse(Deno.readTextFileSync('public/runs_2025.json'));
d.runs.filter(r => {
  const [lat, lng] = r.route[0];
  return lat < 47 || lat > 48 || lng > -121 || lng < -123;
}).forEach(r => console.log(r.id, r.name, r.route[0]));
"
```


