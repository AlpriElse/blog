#!/usr/bin/env node

/**
 * Build Orchestration Script for Subsites
 * 
 * This script:
 * 1. Discovers all subsites in the `subsites/` directory
 * 2. Installs dependencies for each (if needed)
 * 3. Builds each subsite
 * 4. Copies the built output to `public/sites/<subsite-name>/`
 * 
 * Usage:
 *   node scripts/build-subsites.js          # Build all subsites
 *   node scripts/build-subsites.js --clean  # Clean and rebuild
 */

import { execSync } from 'child_process';
import { existsSync, readdirSync, rmSync, cpSync, mkdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const SUBSITES_DIR = join(ROOT_DIR, 'subsites');
const OUTPUT_DIR = join(ROOT_DIR, 'public', 'sites');

const args = process.argv.slice(2);
const shouldClean = args.includes('--clean');
const isVerbose = args.includes('--verbose') || args.includes('-v');

function log(message, type = 'info') {
  const prefix = {
    info: '\x1b[36mℹ\x1b[0m',
    success: '\x1b[32m✓\x1b[0m',
    error: '\x1b[31m✗\x1b[0m',
    warn: '\x1b[33m⚠\x1b[0m',
  };
  console.log(`${prefix[type] || ''} ${message}`);
}

function exec(command, cwd) {
  if (isVerbose) {
    log(`Running: ${command}`, 'info');
  }
  try {
    execSync(command, { 
      cwd, 
      stdio: isVerbose ? 'inherit' : 'pipe',
      env: { ...process.env, FORCE_COLOR: '1' }
    });
  } catch (error) {
    throw new Error(`Command failed: ${command}\n${error.message}`);
  }
}

function getSubsites() {
  if (!existsSync(SUBSITES_DIR)) {
    return [];
  }
  
  return readdirSync(SUBSITES_DIR).filter(name => {
    const subsitePath = join(SUBSITES_DIR, name);
    const packageJson = join(subsitePath, 'package.json');
    return statSync(subsitePath).isDirectory() && existsSync(packageJson);
  });
}

function cleanOutputDir() {
  if (existsSync(OUTPUT_DIR)) {
    log(`Cleaning ${OUTPUT_DIR}...`, 'info');
    rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
}

function buildSubsite(name) {
  const subsitePath = join(SUBSITES_DIR, name);
  const nodeModules = join(subsitePath, 'node_modules');
  const distDir = join(subsitePath, 'dist');
  const outputPath = join(OUTPUT_DIR, name);

  log(`Building subsite: ${name}`, 'info');

  // Install dependencies if node_modules doesn't exist
  if (!existsSync(nodeModules)) {
    log(`  Installing dependencies...`, 'info');
    exec('npm install', subsitePath);
  }

  // Run build
  log(`  Running build...`, 'info');
  exec('npm run build', subsitePath);

  // Check if dist exists
  if (!existsSync(distDir)) {
    throw new Error(`Build did not produce dist/ directory for ${name}`);
  }

  // Ensure output directory exists
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Clean previous output for this subsite
  if (existsSync(outputPath)) {
    rmSync(outputPath, { recursive: true, force: true });
  }

  // Copy dist to public/sites/<name>
  log(`  Copying to ${outputPath}...`, 'info');
  cpSync(distDir, outputPath, { recursive: true });

  log(`  Done!`, 'success');
}

async function main() {
  console.log('\n\x1b[1m🔧 Building Subsites\x1b[0m\n');

  if (shouldClean) {
    cleanOutputDir();
  }

  const subsites = getSubsites();

  if (subsites.length === 0) {
    log('No subsites found in subsites/ directory', 'warn');
    log('Create a subsite by adding a folder with a package.json to subsites/', 'info');
    return;
  }

  log(`Found ${subsites.length} subsite(s): ${subsites.join(', ')}\n`, 'info');

  const results = { success: [], failed: [] };

  for (const name of subsites) {
    try {
      buildSubsite(name);
      results.success.push(name);
    } catch (error) {
      log(`Failed to build ${name}: ${error.message}`, 'error');
      results.failed.push(name);
    }
  }

  console.log('\n\x1b[1m📊 Summary\x1b[0m');
  if (results.success.length > 0) {
    log(`Built: ${results.success.join(', ')}`, 'success');
  }
  if (results.failed.length > 0) {
    log(`Failed: ${results.failed.join(', ')}`, 'error');
    process.exit(1);
  }

  console.log(`\nSubsites are available at /sites/<name>/\n`);
}

main().catch(error => {
  log(error.message, 'error');
  process.exit(1);
});

