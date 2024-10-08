import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";

/**
 * Creates a temporary file that is automatically deleted when exiting the application.
 * @param content - Temporary content to write into the file
 * @returns The file path
 */
export async function createTempFile(content: string | undefined | null) {
  const uuid = crypto.randomUUID();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `${uuid}-`));
  const tempFilePath = path.join(tempDir, `${uuid}.txt`);

  fs.writeFileSync(tempFilePath, content || "");
  console.debug(`Temporary file created at: ${tempFilePath}`);

  const deleteFile = () => {
    fs.unlinkSync(tempFilePath);
    fs.rmdirSync(tempDir);
  };

  // Delete temporary file when program exits
  process.once("exit", deleteFile);
  process.once("SIGINT", deleteFile);
  process.once("SIGTERM", deleteFile);

  return tempFilePath;
}
