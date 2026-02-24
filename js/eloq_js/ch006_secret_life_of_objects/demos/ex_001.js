(function() {
  function speak(line) {
    console.log(`the ${ this.type } rabbit says "${ line }"`)
  }

  let white_rabbit = { type: "white", speak }
  let killer_rabbit = { type: "killer", speak }
  let fast_rabbit = { type: "fast", speak }

  killer_rabbit.speak("No mercy!")
  white_rabbit.speak("Oh my furs and whiskers!")
  speak.call(fast_rabbit, "Gangway!!")

  // "this" in arrow function (finding values in array)
  let finder = {
    find(arr) {
      return arr.some(v => v == this.value)
    },
    value: 5,
  }
  console.log(finder.find([4, 5]))

  // ======= Prototype =======
  let empty = {}
  console.log(empty.toString)
  console.log(empty.toString())

  console.log(Object.getPrototypeOf({}) == Object.prototype)
  console.log(Object.getPrototypeOf(Object.prototype))

  console.log(Object.getPrototypeOf(Math.max) == Function.prototype)
  console.log(Object.getPrototypeOf([]) == Array.prototype)

  let proto_rabbit = {
    speak(line) {
      console.log(`The ${ this.type } rabbit says "${ line }"`)
    }
  }
  let conqueror_rabbit = Object.create(proto_rabbit)
  conqueror_rabbit.type = "conqueror"
  conqueror_rabbit.speak("I, the scourge of god..!!")
})()
