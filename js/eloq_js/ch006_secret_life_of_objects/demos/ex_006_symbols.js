(function() {
  class Rabbit {
    constructor(type) {
      this.type = type
    }

    speak(line) {
      console.log(`The ${ this.type } rabbit says "${ line }"`)
    }
  }

  let killer_rabbit = new Rabbit('killer')
  killer_rabbit.speak("No mercy!")

  let sym = Symbol("name")
  console.log(sym == Symbol("name"))

  Rabbit.prototype[sym] = 55
  console.log(killer_rabbit[sym])

  const length = Symbol("length")
  Array.prototype[length] = 0
  console.log([1, 2].length)
  console.log([1, 2][length])

  let my_trip = {
    length: 2,
    0: "Lankwitz",
    1: "Babelsberg",
    [length]: 21500
  }
  console.log(my_trip[length], my_trip.length)
})()
