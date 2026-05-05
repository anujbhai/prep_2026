/*
const some_async_function = ((err, val) => {
  if (err) handle_error(err)
  else process_value(val)
})
*/
import { read_text_file } from "../readfile.js"
import { with_timeout, join_wifi } from "./demo00y-join-wifi.js"

function text_file(filename) {
  return new Promise((resolve, reject) => {
    read_text_file(filename, (text, err) => {
      if (err) reject(err)
      else resolve(text)
    })
  })
}

new Promise((_, reject) => reject(new Error("Fail")))
  .then(val => console.log("Handler 1:", val))
  .catch(reason => {
    console.log("Caught failure " + reason)
    return "nothing"
  })
  .then(val => console.log("Handler 2:", val))

/**
 * Breaking in
 */

function crack_passcode(network_ID) {
  function next_digit(code, digit) {
    let new_code = code + digit

    return with_timeout(join_wifi(network_ID, new_code), 50)
      .then(() => new_code)
      .catch(failure => {
        if (failure == "Timed out") {
          return next_digit(new_code, 0)
        } else if (digit < 9) {
          return next_digit(code, digit + 1)
        } else {
          throw failure
        }
      })
  }

  return next_digit("", 0)
}
crack_passcode("HANGAR 2").then(console.log)
