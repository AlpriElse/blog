#!/usr/bin/env npx tsx

/**
 * Build Orchestration Script for Sandbox Projects
 * 
 * This script:
 * 1. Discovers all projects in the `sandbox/` directory
 * 2. Installs dependencies for each (if needed)
 * 3. Builds each project
 * 4. Copies the built output to `public/sandbox/<project-name>/`
 * 
 * Usage:
 *   npx tsx scripts/build-sandbox.ts          # Build all projects
 *   npx tsx scripts/build-sandbox.ts --clean  # Clean and rebuild
 */

import { existsSync, readdirSync, statSync, rmSync, mkdirSync, cpSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, "..");
const SANDBOX_DIR = join(ROOT_DIR, "sandbox");
const OUTPUT_DIR = join(ROOT_DIR, "public", "sandbox");

const args = process.argv.slice(2);
const shouldClean = args.includes("--clean");
const isVerbose = args.includes("--verbose") || args.includes("-v");

// Projects that are pre-built locally and committed (skip in CI due to resource constraints)
const PREBUILT_PROJECTS = ["poc-subtext"];

type LogType = "info" | "success" | "error" | "warn";

function log(message: string, type: LogType = "info") {
  const prefix: Record<LogType, string> = {
    info: "\x1b[36mℹ\x1b[0m",
    success: "\x1b[32m✓\x1b[0m",
    error: "\x1b[31m✗\x1b[0m",
    warn: "\x1b[33m⚠\x1b[0m",
  };
  console.log(`${prefix[type]} ${message}`);
}

function exec(command: string, cwd: string): void {
  if (isVerbose) {
    log(`Running: ${command}`, "info");
  }
  
  execSync(command, {
    cwd,
    stdio: isVerbose ? "inherit" : "pipe",
    env: { ...process.env, FORCE_COLOR: "1" },
  });
}

function getProjects(): string[] {
  if (!existsSync(SANDBOX_DIR)) {
    return [];
  }
  
  return readdirSync(SANDBOX_DIR).filter(name => {
    const projectPath = join(SANDBOX_DIR, name);
    if (!statSync(projectPath).isDirectory()) return false;
    
    const packageJson = join(projectPath, "package.json");
    return existsSync(packageJson);
  });
}

function cleanOutputDir(): void {
  if (existsSync(OUTPUT_DIR)) {
    log(`Cleaning ${OUTPUT_DIR}...`, "info");
    rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
}

function buildProject(name: string): void {
  const projectPath = join(SANDBOX_DIR, name);
  const nodeModules = join(projectPath, "node_modules");
  const distDir = join(projectPath, "dist");
  const outputPath = join(OUTPUT_DIR, name);

  log(`Building: ${name}`, "info");

  // Install dependencies if node_modules doesn't exist
  if (!existsSync(nodeModules)) {
    log(`  Installing dependencies...`, "info");
    exec("npm install", projectPath);
  }

  // Run build
  log(`  Running build...`, "info");
  exec("npm run build", projectPath);

  // Check if dist exists
  if (!existsSync(distDir)) {
    throw new Error(`Build did not produce dist/ directory for ${name}`);
  }

  // Ensure output directory exists
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Clean previous output for this project
  if (existsSync(outputPath)) {
    rmSync(outputPath, { recursive: true, force: true });
  }

  // Copy dist to public/sandbox/<name>
  log(`  Copying to ${outputPath}...`, "info");
  cpSync(distDir, outputPath, { recursive: true });

  log(`  Done!`, "success");
}

function main(): void {
  console.log("\n\x1b[1m🔧 Building Sandbox Projects\x1b[0m\n");

  if (shouldClean) {
    cleanOutputDir();
  }

  const projects = getProjects();

  if (projects.length === 0) {
    log("No projects found in sandbox/ directory", "warn");
    log("Create a project by adding a folder with a package.json to sandbox/", "info");
    return;
  }

  log(`Found ${projects.length} project(s): ${projects.join(", ")}\n`, "info");

  const results = { success: [] as string[], failed: [] as string[] };

  for (const name of projects) {
    // Skip pre-built projects (they're built locally and committed)
    if (PREBUILT_PROJECTS.includes(name)) {
      log(`Skipping ${name} (pre-built locally)`, "info");
      continue;
    }

    try {
      buildProject(name);
      results.success.push(name);
    } catch (error) {
      log(`Failed to build ${name}: ${(error as Error).message}`, "error");
      results.failed.push(name);
    }
  }

  console.log("\n\x1b[1m📊 Summary\x1b[0m");
  if (results.success.length > 0) {
    log(`Built: ${results.success.join(", ")}`, "success");
  }
  if (results.failed.length > 0) {
    log(`Failed: ${results.failed.join(", ")}`, "error");
    process.exit(1);
  }

  console.log(`\nProjects are available at /sandbox/<name>/\n`);
}

main();
