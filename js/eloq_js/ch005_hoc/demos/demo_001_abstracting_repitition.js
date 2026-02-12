(function() {
  // abstracting repitition
  function repeat(n, action) {
    for (let i = 0; i < n; i++) {
      action(i)
    }
  }

  repeat(3, console.log)

  let labels = []
  repeat(5, i => {
    labels.push(`Unit ${i + 1}`)
  })
  console.log(labels)

  /* Higher-order functions */
  // 1. creating new function by abstracting over action
  function greaterThan(n) {
    return m => m > n
  }
  let greaterThan10 = greaterThan(10)
  console.log(greaterThan10(11))

  // 2. change other function
  function noisy(f) {
    return (...args) => {
      console.log("calling with", args)
      let result = f(...args)
      console.log("called with", args, "returned", result)
      return result
    }
  }
  noisy(Math.min)(3, 2, 1)

  // 3. function that call nw type of control flow
  function unless(test, then) {
    if (!test) then()
  }
  repeat(3, n => {
    unless(n % 2 === 0, () => {
      console.log(n, "is even")
    })
  })
})()
