(function() {
  /* Function definition 001 */
  const square = function(x) {
    return x * x;
  }
  console.log(square(12))

  /* Function definition 002 */
  const make_noise = function() {
    console.log("Plink!")
  }
  make_noise()

  const round_to = function(n, step) {
    let remainder = n % step
    return n = remainder + (remainder < step / 2 ? 0 : step)
  }
  console.log(round_to(23, 10))
})()


