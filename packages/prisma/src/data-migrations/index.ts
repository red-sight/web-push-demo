import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const path = join(__dirname, "./migrations");

(async function () {
  try {
    const existingMigrations = (await prisma.dataMigration.findMany()).map(
      ({ name }) => name
    );
    const files = (await readdir(path)).sort();
    const pendingFiles = files.filter((f) => !existingMigrations.includes(f));
    if (!pendingFiles.length)
      return console.log(`No new migrations found, exiting...`);
    console.log(`Executing ${pendingFiles.length} data migrations...`);
    for await (const file of pendingFiles) await executeFile(file);
  } catch (err) {
    console.error(err);
  }
})();

async function executeFile(fileName: string) {
  const filePath = join(path, fileName);

  try {
    const out = await spawnAsync("ts-node", [filePath]);
    await prisma.dataMigration.create({
      data: { name: fileName }
    });
    if (out) console.log(out);
    console.log(`✓ ${fileName}`);
  } catch (error: any) {
    throw new Error(`Failed to migrate ${fileName}, \n ${error.stack}`);
  }
}

function spawnAsync(command: string, args: string[]) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args);
    let stdout = "";
    let stderr = "";

    process.stdout.on("data", (data) => {
      stdout += data;
    });

    process.stderr.on("data", (data) => {
      stderr += data;
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}\n${stderr}`));
      } else {
        resolve(stdout);
      }
    });
  });
}
