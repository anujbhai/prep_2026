import fs from "node:fs"
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
function readTextFile(fileName, callback) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const filePath = path.join(__dirname, fileName)

  fs.readFile(filePath, "utf8", (error, content) => {
    if (error) {
      console.error("Unable to read file:", error.message)
      return
    }

    callback(content)
  })
}

function text_file(file_name) {
  return new Promise(resolve => {
    readTextFile(file_name, text => resolve(text))
  })
}

async function file_sizes(files) {
  let list = ""

  await Promise.all(files.map(async file_name => {
    list += file_name + ": " + (await text_file(file_name)).length + "\n"
  }))

  return list;
}
const result = await file_sizes(["plans.txt", "listfile.txt"])
console.log(result)
