(function () {
  /* Bindings and scope 1 */
  // let x = 10; // global
  // if (true) {
  //   let y = 20 // local to block
  //   let z = 30 // also global
  // }

  /* Bindings and scope 1 */
  const halve = function(n) {
    return n / 2
  }
  let n = 10
  console.log(halve(100))
  console.log(n)
})()

