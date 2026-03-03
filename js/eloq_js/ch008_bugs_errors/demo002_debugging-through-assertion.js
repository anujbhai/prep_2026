(function() {
  const readline = require("readline")
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  // Testing
  function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`)
  }

  test("convert Latin text to uppercase", () => {
    return "hello".toUpperCase() === "HELLO"
  })
  test("convert Greek text to lowercase", () => {
    return "Χαίρετε".toUpperCase() === "ΧΑΊΡΕΤΕ"
  })
  test("don't convert case-less characters", () => {
    return "السَّلَامُ عَلَيْكُمْ".toUpperCase() === "السَّلَامُ عَلَيْكُمْ"
  })

  // Error propagation
  // function prompt_number(question) {
  //   let result = Number(prompt(question))

  //   if (Number.isNaN(result)) return null
  //   else return result
  // }
  // console.log(prompt_number("How many trees do you see?"))

  function prompt_number(question) {
    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // })
    return new Promise((resolve) => {
      rl.question(question + " ", (answer) => {
        // rl.close()
        let result = Number(answer)
        if (Number.isNaN(result)) {
          resolve(null)
        } else {
          resolve(result)
        }
      })
    })
  }

  /* Selective catching */
  class InputError extends Error {}

  /* Exception */
  function prompt_direction(question) {
    // let result = readline.question(question)
    // if (result.toLowerCase() === "left") return "L"
    // if (result.toLowerCase() === "right") return "R"
    // throw new InputError(`Invalid direction: ${result}`)
    console.log(question + " (left/right - demo)")
    return "L"
  }

  // for (;;) {
  //   try {
  //     let dir = prompt_direction("Which way?")
  //     console.log("You chose", dir)
  //     break
  //   } catch (e) {
  //     if (e instanceof InputError) {
  //       console.log("Not a valid direction. Try again.")
  //     } else {
  //       throw e
  //     }
  //   }
  // }

  function look() {
    if (prompt_direction("Which way?") === "L") {
      return "a house"
    } else {
      return "two angry bears"
    }
  }

  try {
    console.log("You see", look())
  } catch (error) {
    console.log(`Something went wrong: ${error.message}`)
  }


  /* cleanup after exception */
  const accounts = {
    a: 100,
    b: 0,
    c: 20
  }

  function get_account() {
    return new Promise((resolve, reject) => {
      rl.question("Enter an account name: ", (acc_name) => {
        if (!Object.hasOwn(accounts, acc_name)) {
          reject(new Error(`No such account: ${acc_name}`))
          // resolve(get_account())
        } else {
          resolve(acc_name)
        }
      })

    })
  }

  async function transfer(from, amount) {
    if (accounts[from] < amount) {
      console.log(`Insufficient funds in ${ from }`)
      return
    }

    let progress = 0

    try {
      accounts[from] -= amount
      progress = 1
      let to = await get_account()
      accounts[to] += amount
      progress = 2
      console.log(`Transferred $${ amount } from ${ from } to ${ to }`)
    } finally {
      if (progress === 1) {
        accounts[from] += amount
        console.log("Transfer rolled back.")
      }
    }
  }

  async function main() {
    try {
      let result = await prompt_number("How many trees do you see?")
      console.log(result)
      
      // transfer outpurs
      await transfer("a", 10)
      await transfer("c", 5)
      console.log("Final accounts: ", accounts)
    } finally {
      rl.close()
    }
  }
  main().catch(console.error)
})()
