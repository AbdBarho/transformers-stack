import fs from "fs";
import zlib from "zlib";
import { mkdir, writeFile } from "fs/promises";
import { resolve, dirname } from "path";

export class FileMappedJSON {
  constructor(path) {
    this.path = resolve(path);
  }
  read() {
    if (!fs.existsSync(this.path)) {
      return {};
    }
    const contents = zlib.gunzipSync(fs.readFileSync(this.path));
    return JSON.parse(contents.toString("utf-8"));
  }
  async write(data) {
    await mkdir(dirname(this.path), { recursive: true });
    const buffer = zlib.gzipSync(JSON.stringify(data), { level: 5 });
    return writeFile(this.path, buffer);
  }
}

export const db = new FileMappedJSON(process.env.DB_FILE);
