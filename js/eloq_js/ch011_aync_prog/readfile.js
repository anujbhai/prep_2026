import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

export async function read_text_file(filename) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const filepath = path.join(__dirname, filename)

  return readFile(filepath, "utf-8")
}

async function main() {
  try {
    const content = await read_text_file("demos/plans.txt")
    console.log(content)
  } catch (err) {
    console.log("Unable to read file:", err.message)
  }
}

main()
