(function () {
  function is_even(num) {
    if (num < 0) return is_even(-num)
    if (num === 0) return true
    if (num === 1) return false
    
    return is_even(num - 2)
  }
  console.log(is_even(50))
  console.log(is_even(75))
  console.log(is_even(-1))
})()

