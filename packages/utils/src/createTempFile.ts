import crypto from "crypto";
import fs from "fs";
import os from "os";
import path from "path";

/**
 * Creates a temporary file that is automatically deleted when exiting the application.
 * @param content - Temporary content to write into the file
 * @param cleanup - Wether the temp file should be deleted on application exit
 * @returns The file path
 */
export function createTempFile(
  content: string = "",
  cleanup: boolean = true
): string {
  const uuid = crypto.randomUUID();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `${uuid}-`));
  const tempFilePath = path.join(tempDir, `${uuid}.txt`);

  fs.writeFileSync(tempFilePath, content);
  console.debug(`Temporary file created at: ${tempFilePath}`);

  if (cleanup) {
    const deleteFile = () => {
      fs.rmSync(tempDir, { force: true, recursive: true });
    };

    // Delete temporary file when program exits
    process.once("exit", deleteFile);
    process.once("SIGINT", deleteFile);
    process.once("SIGTERM", deleteFile);
  }

  return tempFilePath;
}
