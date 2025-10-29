#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the monorepo root (two levels up from this file)
const monorepoRoot = path.resolve(__dirname, "../..");

// Directories to check
const directoriesToSync = [
  ".",
  ...fs
    .readdirSync(path.join(monorepoRoot, "apps"), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => `apps/${dirent.name}`),
];

// Helper function to ask for confirmation
function askForConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

// Helper function to check if file exists and is not empty
function fileExistsAndNotEmpty(filePath) {
  if (!fs.existsSync(filePath)) {
    return false;
  }
  const stats = fs.statSync(filePath);
  return stats.size > 0;
}

async function syncEnvFiles() {
  const filesToSync = [];

  // First pass: collect all files that need syncing
  for (const dir of directoriesToSync) {
    const fullDir = path.join(monorepoRoot, dir);
    const src = path.join(fullDir, ".env.example");
    const dest = path.join(fullDir, ".env");

    if (fs.existsSync(src)) {
      const existsAndNotEmpty = fileExistsAndNotEmpty(dest);
      filesToSync.push({
        dir,
        src,
        dest,
        needsConfirmation: existsAndNotEmpty,
      });
    }
  }

  if (filesToSync.length === 0) {
    console.log("No .env.example files found to sync.");
    return;
  }

  // Second pass: check for conflicts and ask for confirmation
  const conflictingFiles = filesToSync.filter((f) => f.needsConfirmation);
  if (conflictingFiles.length > 0) {
    console.log(
      "\n⚠️  Warning: The following .env files already exist and will be overwritten:",
    );
    conflictingFiles.forEach((f) => {
      console.log(`  - ${f.dir}/.env`);
    });

    const shouldContinue = await askForConfirmation(
      "\nDo you want to continue? This will overwrite existing .env files. (y/N): ",
    );

    if (!shouldContinue) {
      console.log("Sync cancelled.");
      return;
    }
  }

  // Third pass: perform the sync
  let syncedCount = 0;
  for (const { dir, src, dest } of filesToSync) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Synced ${dir}/.env.example to ${dir}/.env`);
    syncedCount++;
  }

  console.log(`\nSynced ${syncedCount} environment file(s).`);
}

syncEnvFiles();
