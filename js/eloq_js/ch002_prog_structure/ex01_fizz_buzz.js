/* FIZZ BUZZ */
console.log("if else")
const fizz_buzz = function(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("fizz_buzz")
    } else if (i % 3 === 0) {
      console.log("fizz")
    } else if (i % 5 === 0) {
      console.log("buzz")
    } else {
      console.log(i)
    }
  }
}
fizz_buzz(32);
console.log("\n")
console.log("\n")

console.log("ternary")
const fizz_buzz_ternary = function(n) {
  for (let i = 1; i <= n; i++) {
    (i % 3 === 0 && i % 5 === 0)
      ? console.log("fizz_buzz")
      : i % 3 === 0
        ? console.log("fizz")
        : i % 5 === 0
          ? console.log("buzz")
          : console.log(i)
  }
}
fizz_buzz_ternary(32);
console.log("\n")
console.log("\n")

console.log("switch")
const fizz_buzz_switch = function(n) {
  for (let i = 1; i <= n; i++) {
    switch (true) {
      case (i % 3 === 0 && i % 5 === 0):
        console.log("fizz_buzz")
        break
      case i % 3 === 0:
        console.log("fizz")
        break
      case i % 5 === 0:
        console.log("buzz")
        break
      default:
        console.log(i)
    }
  }
}
fizz_buzz_switch(32);

