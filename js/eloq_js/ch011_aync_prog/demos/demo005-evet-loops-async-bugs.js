import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

/* EVENT LOOP */
let start = Date.now()

setTimeout(() => {
  console.log("Timeout ran at", Date.now() - start)
}, 20)

while (Date.now() < start + 50) {}
console.log("Wasted time until", Date.now() - start)

Promise.resolve("Done").then(console.log)
console.log("Me first!")

/* Async bugs */
// Callbacks
async function readTextFile(fileName) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const filePath = path.join(__dirname, fileName)

  try {
    return await fs.readFile(filePath, "utf8")
  } catch (err) {
    throw new Error(`Unable to read file: ${ err.message }`)
  }
}

async function file_sizes(files) {
  const lines = await Promise.all(
    files.map(async file_name => {
      const text = await readTextFile(file_name)

      return `${ file_name }: ${ text.length }`
    })
  )

  return lines.join("\n") + "\n"
  // let list = ""

  // await Promise.all(files.map(async file_name => {
  //   list += `${ file_name }: ${ (await readTextFile(file_name)).length }\n`
  // }))

  // return list;
}
const result = await file_sizes(["plans.txt", "listfile.txt"])
console.log(result)
