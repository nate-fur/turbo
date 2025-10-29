#!/usr/bin/env node
import { execSync } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ports to kill processes on
const ports = [3000, 3001, 3002];

function killProcessOnPort(port) {
  try {
    // Find process ID using lsof
    const result = execSync(`lsof -ti:${port}`, { encoding: "utf-8" }).trim();

    if (!result) {
      console.log(`✓ No process found on port ${port}`);
      return false;
    }

    // Kill the process
    const pids = result.split("\n").filter((pid) => pid.trim() !== "");
    pids.forEach((pid) => {
      try {
        execSync(`kill -9 ${pid}`, { encoding: "utf-8", stdio: "inherit" });
        console.log(`✓ Killed process ${pid} on port ${port}`);
      } catch (error) {
        console.error(
          `✗ Failed to kill process ${pid} on port ${port}:`,
          error.message,
        );
      }
    });
    return true;
  } catch (error) {
    // lsof returns non-zero exit code when no process is found
    if (error.status === 1) {
      console.log(`✓ No process found on port ${port}`);
      return false;
    }
    console.error(`✗ Error checking port ${port}:`, error.message);
    return false;
  }
}

function killAllPorts() {
  console.log("Killing processes on ports 3000, 3001, 3002...\n");

  let killedCount = 0;
  ports.forEach((port) => {
    if (killProcessOnPort(port)) {
      killedCount++;
    }
  });

  console.log(`\nDone. ${killedCount} port(s) had running processes.`);
}

killAllPorts();
