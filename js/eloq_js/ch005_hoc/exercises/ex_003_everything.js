(function() {
  function everything_loop(arr, predicate) {
    for (let item of arr) {
      if (!predicate(item)) {
        return false
      }
    }

    return true
  }

  function everything_some(arr, predicate) {
    return !arr.some(item => !predicate(element))
  }

  function is_even(n) { return n % 2 === 0 }
  function is_odd(n) { return n % 2 === 1 }

  console.log(everything_loop([1, 3, 5], is_odd))
  console.log(everything_loop([1, 3, 4], is_odd))
  console.log(everything_loop([2, 4, 6], is_even))
  console.log(everything_loop([2, 3, 5], is_even))
})()
