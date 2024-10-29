import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { createTempFile } from "./createTempFile.js";

describe("createTempFile", () => {
  it("returns the path of the temporary file", () => {
    const path = createTempFile();
    expect(typeof path).toBe("string");
  });

  it("removes a temporary file on application exit by default", () => {
    const path = createTempFile("i will be gone");
    expect(fs.existsSync(path)).toBe(true);
    process.emit("SIGINT");
    expect(fs.existsSync(path)).toBe(false);
  });

  it("allows to keep a temporary file on application exit", () => {
    const path = createTempFile("you can remove me", false);
    expect(fs.existsSync(path)).toBe(true);
    process.emit("SIGINT");
    expect(fs.existsSync(path)).toBe(true);
  });
});
