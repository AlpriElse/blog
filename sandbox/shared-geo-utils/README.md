# Shared Geo Utils

Shared utilities for 3D geographic visualization projects.

## Modules

### `dem-utils.ts`
DEM (Digital Elevation Model) processing utilities:
- Coordinate projections (WGS84 ↔ UTM)
- GeoTIFF loading and tile management
- Elevation sampling with bilinear interpolation
- Bounds calculation

### `threejs-terrain.ts`
Three.js terrain visualization utilities:
- DEM to PlaneGeometry vertex displacement
- Landcover texture generation
- Contour texture generation
- Custom terrain material with contour overlay

### `contour-utils.ts`
Contour line generation:
- Marching squares algorithm
- Multi-level contour tracing

### `gpx-utils.ts`
GPX file parsing:
- Track segment extraction
- Bounds calculation

## Usage

```typescript
import { loadGeoTiffTiles, sampleElevation } from '../shared-geo-utils/dem-utils.ts';
import { createTerrainGeometry, createTerrainMaterial } from '../shared-geo-utils/threejs-terrain.ts';
```

## Projects Using This Library

- `poc-interactive-hiking-map` - Interactive 3D hiking trail visualizations
- `poc-strava-wrapped-2025-heatmap` - 3D Strava activity heatmaps

