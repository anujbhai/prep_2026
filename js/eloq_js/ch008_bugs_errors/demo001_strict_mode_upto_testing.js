(function() {
  "use strict"

  // reference error
  function spot_the_problem() {
    for (counter = 0; counter < 10; counter++) {
      console.log("Happy happy")
    }
  }
  // spot_the_problem()

  function Person(name) {
    this.name = name
  }
  let ferdinand = Person("Ferdinand")
  console.log(ferdinand)
})()
