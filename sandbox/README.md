# Sandbox

This folder contains independent projects that are built separately and served under `/sandbox/<name>/`.

## How It Works

1. Each subfolder with a `deno.json` (or `deno.jsonc`) is treated as a sandbox project
2. Running `npm run build:sandbox` will:
   - Run `deno task build` for each project
   - Copy the `dist/` output to `public/sandbox/<name>/`
3. Astro then serves these as static files

## Creating a New Project

1. Create a folder: `sandbox/my-project/`
2. Add a `deno.json` with at least a `build` task
3. Ensure the build outputs to `dist/`
4. Set the base path to `/sandbox/my-project/` in your bundler config

### Example with Vite

```bash
cd sandbox
mkdir my-project && cd my-project
```

Create `deno.json`:

```json
{
  "tasks": {
    "dev": "deno run -A npm:vite",
    "build": "deno run -A npm:vite build"
  },
  "imports": {
    "vite": "npm:vite@^6.0.0"
  }
}
```

Create `vite.config.js`:

```js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/sandbox/my-project/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
```

### Example: Static HTML Project

For simple projects without bundling, create a build script:

`deno.json`:
```json
{
  "tasks": {
    "build": "deno run -A build.ts"
  }
}
```

`build.ts`:
```typescript
import { ensureDir, copy } from "https://deno.land/std@0.224.0/fs/mod.ts";

await ensureDir("./dist");
await copy("./index.html", "./dist/index.html");
// Copy other assets as needed
```

## Commands

```bash
# Build all sandbox projects
npm run build:sandbox

# Build all (clean rebuild)
npm run build:sandbox:clean

# Dev server for a specific project
cd sandbox/my-project && deno task dev

# Full build (sandbox + main blog)
npm run build
```

## Directory Structure

```
sandbox/
  example-site/           # Example Vite project
    deno.json
    vite.config.js
    index.html
    src/
      main.js
      style.css
    dist/                 # Build output (gitignored)
  
  poc-interactive-hiking-map/
    deno.json
    vite.config.js
    ...

  poc-strava-wrapped-2025-heatmap/
    deno.json
    build.ts              # Simple build script
    heatmap.html
    ...

public/
  sandbox/                # Build outputs copied here (gitignored)
    example-site/
    poc-interactive-hiking-map/
    poc-strava-wrapped-2025-heatmap/
```

## Notes

- The `public/sandbox/` folder is gitignored (regenerated on build)
- Each project is fully independent - use Vite, plain HTML, or any tools
- All projects use Deno for running tasks (but can use npm packages via `npm:` specifiers)
- For npm-heavy projects, add `"nodeModulesDir": "auto"` to deno.json
