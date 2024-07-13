import path from "node:path";
import fs from "node:fs/promises";

// Function to sanitize the file name
function sanitizeFileName(fileName: string) {
  // Replace invalid characters with an underscore
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9_\-\.]/g, "_");

  // Ensure the sanitized file name is not empty
  if (!sanitizedFileName) {
    throw new Error("Invalid file name after sanitization.");
  }

  // Prevent file names that are reserved on Windows
  const reservedNames = [
    "CON",
    "PRN",
    "AUX",
    "NUL",
    "COM1",
    "COM2",
    "COM3",
    "COM4",
    "COM5",
    "COM6",
    "COM7",
    "COM8",
    "COM9",
    "LPT1",
    "LPT2",
    "LPT3",
    "LPT4",
    "LPT5",
    "LPT6",
    "LPT7",
    "LPT8",
    "LPT9"
  ];
  const baseName = path
    .basename(sanitizedFileName, path.extname(sanitizedFileName))
    .toUpperCase();
  if (reservedNames.includes(baseName)) {
    throw new Error("File name is a reserved name on Windows.");
  }

  return sanitizedFileName;
}

// Main function
(async function main() {
  // Get the file name from script arguments
  const args = process.argv.slice(2);
  if (args.length === 0 || !args[0]) {
    console.error("Please provide a file name as an argument.");
    process.exit(1);
  }

  const fileName = args[0];

  try {
    // Sanitize the file name
    const sanitizedFileName = `${getFormattedDate()}_${sanitizeFileName(fileName)}.ts`;
    const fullPath = path.join(__dirname, "migrations", sanitizedFileName);
    const templatePath = path.join(__dirname, "./template.ts");
    const templateData = await fs.readFile(templatePath, "utf8");
    await fs.writeFile(fullPath, templateData, "utf8");
    console.log(`New migration file is generated at: ${fullPath}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();

function getFormattedDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
