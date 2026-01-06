# Shared Geo Utils

Utilities for 3D geographic visualization.

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
GPX/polyline parsing:
- Track segment extraction
- Google/Strava polyline decoding
- Bounds calculation

## Usage

```typescript
import { loadGeoTiffTiles, sampleElevation } from './shared-geo-utils/dem-utils.ts';
import { createTerrainGeometry, createTerrainMaterial } from './shared-geo-utils/threejs-terrain.ts';
```

