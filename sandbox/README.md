# Sandbox

This folder contains independent projects that are built separately and served under `/sandbox/<name>/`.

## How It Works

1. Each subfolder with a `package.json` is treated as a sandbox project
2. Running `npm run build:sandbox` will:
   - Install dependencies for each project
   - Run `npm run build` for each
   - Copy the `dist/` output to `public/sandbox/<name>/`
3. Astro then serves these as static files

## Creating a New Project

1. Create a folder: `sandbox/my-project/`
2. Add a `package.json` with at least a `build` script
3. Ensure the build outputs to `dist/`
4. Set the base path to `/sandbox/my-project/` in your bundler config

### Example with Vite

```bash
cd sandbox
npm create vite@latest my-project
cd my-project
```

Then update `vite.config.js`:

```js
export default defineConfig({
  base: '/sandbox/my-project/',
});
```

### Example with Other Frameworks

- **React (CRA):** Set `"homepage": "/sandbox/my-project/"` in package.json
- **Next.js:** Set `basePath: '/sandbox/my-project'` in next.config.js (static export)
- **Vue:** Set `publicPath: '/sandbox/my-project/'` in vue.config.js
- **Astro:** Set `base: '/sandbox/my-project'` in astro.config.mjs

## Commands

```bash
# Build all sandbox projects
npm run build:sandbox

# Build all (clean rebuild)
npm run build:sandbox:clean

# Dev server for a specific project
npm run dev:sandbox --name=example-site

# Full build (sandbox + main blog)
npm run build
```

## Directory Structure

```
sandbox/
  example-site/           # Example Vite project
    package.json
    vite.config.js
    index.html
    src/
      main.js
      style.css
    dist/                 # Build output (gitignored)
  
  my-react-app/           # You could add a React app
    package.json
    ...

public/
  sandbox/                # Build outputs copied here (gitignored)
    example-site/
    my-react-app/
```

## Notes

- The `public/sandbox/` folder is also gitignored (regenerated on build)
- Each project is fully independent - use any framework, bundler, or tools
