#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Build Orchestration Script for Sandbox Projects (Deno)
 * 
 * This script:
 * 1. Discovers all projects in the `sandbox/` directory
 * 2. Installs dependencies for each (if needed)
 * 3. Builds each project
 * 4. Copies the built output to `public/sandbox/<project-name>/`
 * 
 * Usage:
 *   deno task build:sandbox          # Build all projects
 *   deno task build:sandbox --clean  # Clean and rebuild
 */

import { existsSync } from "https://deno.land/std@0.224.0/fs/exists.ts";
import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";
import { emptyDir } from "https://deno.land/std@0.224.0/fs/empty_dir.ts";
import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";
import { dirname, fromFileUrl, join } from "https://deno.land/std@0.224.0/path/mod.ts";

const __dirname = dirname(fromFileUrl(import.meta.url));
const ROOT_DIR = join(__dirname, "..");
const SANDBOX_DIR = join(ROOT_DIR, "sandbox");
const OUTPUT_DIR = join(ROOT_DIR, "public", "sandbox");

const args = Deno.args;
const shouldClean = args.includes("--clean");
const isVerbose = args.includes("--verbose") || args.includes("-v");

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

async function exec(command: string[], cwd: string): Promise<void> {
  if (isVerbose) {
    log(`Running: ${command.join(" ")}`, "info");
  }
  
  const proc = new Deno.Command(command[0], {
    args: command.slice(1),
    cwd,
    stdout: "inherit",
    stderr: "inherit",
  });
  
  const { code } = await proc.output();
  
  if (code !== 0) {
    throw new Error(`Command failed with exit code ${code}`);
  }
}

async function getProjects(): Promise<string[]> {
  if (!existsSync(SANDBOX_DIR)) {
    return [];
  }
  
  const projects: string[] = [];
  
  for await (const entry of Deno.readDir(SANDBOX_DIR)) {
    if (!entry.isDirectory) continue;
    
    const projectPath = join(SANDBOX_DIR, entry.name);
    const denoJson = join(projectPath, "deno.json");
    const denoJsonc = join(projectPath, "deno.jsonc");
    
    if (existsSync(denoJson) || existsSync(denoJsonc)) {
      projects.push(entry.name);
    }
  }
  
  return projects;
}

async function cleanOutputDir(): Promise<void> {
  if (existsSync(OUTPUT_DIR)) {
    log(`Cleaning ${OUTPUT_DIR}...`, "info");
    await Deno.remove(OUTPUT_DIR, { recursive: true });
  }
}

async function buildProject(name: string): Promise<void> {
  const projectPath = join(SANDBOX_DIR, name);
  const distDir = join(projectPath, "dist");
  const outputPath = join(OUTPUT_DIR, name);

  log(`Building: ${name}`, "info");

  // Run deno task build
  log(`  Running build...`, "info");
  await exec(["deno", "task", "build"], projectPath);

  // Check if dist exists
  if (!existsSync(distDir)) {
    throw new Error(`Build did not produce dist/ directory for ${name}`);
  }

  // Ensure output directory exists
  await Deno.mkdir(OUTPUT_DIR, { recursive: true });

  // Clean previous output for this project
  if (existsSync(outputPath)) {
    await Deno.remove(outputPath, { recursive: true });
  }

  // Copy dist to public/sandbox/<name>
  log(`  Copying to ${outputPath}...`, "info");
  await copy(distDir, outputPath);

  log(`  Done!`, "success");
}

async function main(): Promise<void> {
  console.log("\n\x1b[1m🔧 Building Sandbox Projects\x1b[0m\n");

  if (shouldClean) {
    await cleanOutputDir();
  }

  const projects = await getProjects();

  if (projects.length === 0) {
    log("No projects found in sandbox/ directory", "warn");
    log("Create a project by adding a folder with a deno.json to sandbox/", "info");
    return;
  }

  log(`Found ${projects.length} project(s): ${projects.join(", ")}\n`, "info");

  const results = { success: [] as string[], failed: [] as string[] };

  for (const name of projects) {
    try {
      await buildProject(name);
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
    Deno.exit(1);
  }

  console.log(`\nProjects are available at /sandbox/<name>/\n`);
}

await main();
