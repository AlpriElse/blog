#!/usr/bin/env npx tsx

/**
 * R2 Asset Upload Script
 *
 * This script:
 * 1. Finds large media files that exceed Cloudflare Pages' 25MB limit
 * 2. Uploads them to Cloudflare R2
 * 3. Generates a manifest mapping local paths to R2 URLs
 *
 * Usage:
 *   npx tsx scripts/upload-r2-assets.ts              # Upload new/changed files
 *   npx tsx scripts/upload-r2-assets.ts --dry-run    # Preview what would be uploaded
 *   npx tsx scripts/upload-r2-assets.ts --force      # Re-upload all files
 *
 * Prerequisites:
 *   - wrangler CLI installed and authenticated (`wrangler login`)
 *   - R2 bucket created (`wrangler r2 bucket create <bucket-name>`)
 *   - Bucket configured for public access in Cloudflare dashboard
 */

import { execSync } from "node:child_process";
import { existsSync, statSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, "..");

// ============================================================================
// CONFIGURATION - Update these values for your setup
// ============================================================================
const CONFIG = {
  // R2 bucket name
  bucket: "alprielsexyz-assets",

  // Public URL for your R2 bucket
  publicUrl: "https://r2.alprielse.xyz",

  // File patterns to consider for R2 upload
  patterns: ["**/*.mp4", "**/*.mov", "**/*.webm", "**/*.zip"],

  // Directories to search for large files (only source dirs, not build outputs)
  searchDirs: ["sandbox"],

  // Subdirectories to skip (build outputs, etc.)
  skipDirs: ["dist", "node_modules"],

  // Files larger than this (in MB) will be uploaded to R2
  thresholdMb: 20,

  // Where to save the manifest (maps local paths to R2 URLs)
  manifestPath: join(ROOT_DIR, "r2-manifest.json"),
};

// ============================================================================
// Types
// ============================================================================
interface R2Manifest {
  [localPath: string]: {
    r2Url: string;
    size: number;
    uploadedAt: string;
  };
}

type LogType = "info" | "success" | "error" | "warn";

// ============================================================================
// Utilities
// ============================================================================
function log(message: string, type: LogType = "info") {
  const prefix: Record<LogType, string> = {
    info: "\x1b[36mℹ\x1b[0m",
    success: "\x1b[32m✓\x1b[0m",
    error: "\x1b[31m✗\x1b[0m",
    warn: "\x1b[33m⚠\x1b[0m",
  };
  console.log(`${prefix[type]} ${message}`);
}

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function loadManifest(): R2Manifest {
  if (existsSync(CONFIG.manifestPath)) {
    try {
      return JSON.parse(readFileSync(CONFIG.manifestPath, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
}

function saveManifest(manifest: R2Manifest): void {
  writeFileSync(CONFIG.manifestPath, JSON.stringify(manifest, null, 2) + "\n");
}

// ============================================================================
// Core Logic
// ============================================================================

// Get file extensions from patterns (e.g., "**/*.mp4" -> ".mp4")
function getExtensionsFromPatterns(patterns: string[]): Set<string> {
  const extensions = new Set<string>();
  for (const pattern of patterns) {
    const match = pattern.match(/\*\.(\w+)$/);
    if (match) {
      extensions.add(`.${match[1]}`);
    }
  }
  return extensions;
}

// Recursively walk directory and find files matching extensions
function walkDir(dir: string, extensions: Set<string>, results: string[]): void {
  if (!existsSync(dir)) return;

  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    // Skip node_modules
    if (entry.name === "node_modules") continue;

    if (entry.isDirectory()) {
      walkDir(fullPath, extensions, results);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (extensions.has(ext)) {
        results.push(fullPath);
      }
    }
  }
}

function findLargeFiles(): { path: string; size: number }[] {
  const files: { path: string; size: number }[] = [];
  const thresholdBytes = CONFIG.thresholdMb * 1024 * 1024;
  const extensions = getExtensionsFromPatterns(CONFIG.patterns);

  for (const dir of CONFIG.searchDirs) {
    const searchDir = join(ROOT_DIR, dir);
    const matchingFiles: string[] = [];
    walkDir(searchDir, extensions, matchingFiles);

    for (const fullPath of matchingFiles) {
      const relativePath = relative(ROOT_DIR, fullPath);

      try {
        const stats = statSync(fullPath);
        if (stats.size > thresholdBytes) {
          files.push({ path: relativePath, size: stats.size });
        }
      } catch {
        // Skip files we can't stat
      }
    }
  }

  return files;
}

function uploadToR2(filePath: string, dryRun: boolean): boolean {
  const fullPath = join(ROOT_DIR, filePath);
  const r2Key = filePath;

  if (dryRun) {
    log(`Would upload: ${filePath} → ${CONFIG.bucket}/${r2Key}`, "info");
    return true;
  }

  try {
    log(`Uploading: ${filePath}`, "info");
    execSync(
      `wrangler r2 object put "${CONFIG.bucket}/${r2Key}" --file="${fullPath}" --remote`,
      {
        cwd: ROOT_DIR,
        stdio: "pipe",
      }
    );
    log(`Uploaded: ${CONFIG.publicUrl}/${r2Key}`, "success");
    return true;
  } catch (error) {
    log(`Failed to upload ${filePath}: ${(error as Error).message}`, "error");
    return false;
  }
}

// ============================================================================
// Main
// ============================================================================
function main(): void {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const force = args.includes("--force");

  console.log("\n\x1b[1m☁️  R2 Asset Upload\x1b[0m\n");

  if (dryRun) {
    log("Dry run mode - no files will be uploaded", "warn");
  }

  // Check if wrangler is available (skip check in dry-run mode)
  if (!dryRun) {
    try {
      execSync("wrangler --version", { stdio: "pipe" });
    } catch {
      log("wrangler CLI not found. Install with: npm install -g wrangler", "error");
      log("Then authenticate with: wrangler login", "info");
      process.exit(1);
    }
  }

  // Find large files
  const largeFiles = findLargeFiles();

  if (largeFiles.length === 0) {
    log(`No files found exceeding ${CONFIG.thresholdMb} MB threshold`, "info");
    return;
  }

  log(
    `Found ${largeFiles.length} file(s) exceeding ${CONFIG.thresholdMb} MB:\n`,
    "info"
  );
  for (const file of largeFiles) {
    console.log(`  • ${file.path} (${formatSize(file.size)})`);
  }
  console.log();

  // Load existing manifest
  const manifest = loadManifest();

  // Upload files
  const results = { uploaded: 0, skipped: 0, failed: 0 };

  for (const file of largeFiles) {
    // Skip if already in manifest (unless --force)
    if (manifest[file.path] && !force) {
      log(`Skipping (already uploaded): ${file.path}`, "info");
      results.skipped++;
      continue;
    }

    const success = uploadToR2(file.path, dryRun);

    if (success) {
      results.uploaded++;
      if (!dryRun) {
        manifest[file.path] = {
          r2Url: `${CONFIG.publicUrl}/${file.path}`,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
      }
    } else {
      results.failed++;
    }
  }

  // Save manifest
  if (!dryRun && results.uploaded > 0) {
    saveManifest(manifest);
    log(`Manifest saved to ${relative(ROOT_DIR, CONFIG.manifestPath)}`, "success");
  }

  // Summary
  console.log("\n\x1b[1m📊 Summary\x1b[0m");
  if (results.uploaded > 0) log(`Uploaded: ${results.uploaded}`, "success");
  if (results.skipped > 0) log(`Skipped: ${results.skipped}`, "info");
  if (results.failed > 0) log(`Failed: ${results.failed}`, "error");

  // Next steps
  if (!dryRun && results.uploaded > 0) {
    console.log("\n\x1b[1m📋 Next Steps\x1b[0m");
    console.log("  1. Update CONFIG.publicUrl in this script with your R2 public URL");
    console.log("  2. Add the source files to .gitignore to exclude from deployment");
    console.log("  3. Update your code to use R2 URLs from r2-manifest.json");
    console.log();
  }

  if (results.failed > 0) {
    process.exit(1);
  }
}

main();
