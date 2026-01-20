(function() {
  function greet(who) {
    console.log("Hello " + who)
  }
  greet("Harry")
  console.log("bye")

  // RUNNING OUT OF MEMORY / STACK OVERFLOW
  // function chicken() {
  //   return egg()
  // }
  // function egg() {
  //   return chicken()
  // }
  // console.log(chicken() + " came first.")

  /* Optional arguments */
  function round_to(n, step = 1) {
    let remainder = n % step
    return n - remainder + (remainder < step / 2 ? 0 : step)
  }
  console.log(round_to(4.5))
  console.log(round_to(4.5, 2))
})()

