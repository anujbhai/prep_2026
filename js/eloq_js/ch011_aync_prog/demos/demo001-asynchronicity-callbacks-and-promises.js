import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

(function () {
  setTimeout(() => console.log("Tick"), 1000)

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

  // readTextFile("shopping-list.txt", content => {
  //   console.log(content)
  // })

  function compare_files(fileA, fileB, callback) {
    readTextFile(fileA, contentA => {
      readTextFile(fileB, contentB => {
        callback(contentA == contentB)
      })
    })
  }
  // compare_files("shopping-list.txt", "shopping-list-2.txt", content => {
    // console.log(content)
  // })

  // Promises
  let fifteen = Promise.resolve(15)
  // fifteen.then(val => console.log(`Got ${ val }`))

  // console.log("Text file:")
  function text_file(file_name) {
    return new Promise(resolve => {
      readTextFile(file_name, text => resolve(text))
    })
  }
  // text_file("plans.txt").then(console.log)

  // console.log("Random file:")
  function random_file(list_file) {
    return text_file(list_file)
      .then(content => content.split(/\r?\n/).map(line => line.trim()).filter(Boolean))
      .then(ls => ls[Math.floor(Math.random() * ls.length)])
      .then(filename => {
        console.log(`Picked file: ${filename}`)
        console.log("readTextFile input:", JSON.stringify(filename))
        return text_file(filename)
      })
  }
  // random_file("listfile.txt").then(console.log)

  function json_file(filename) {
    return text_file(filename).then(JSON.parse) 
  }
  json_file("../../package.json").then(console.log)
})()
