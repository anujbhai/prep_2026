(function() {
  const arr = ["1", "2", "3", "4"]

  function own_loop(val, test, update, body) {
    while(test(val)) {
      body(val)
      val = update(val)
    }
  }

  own_loop(3, n => n > 0, n => n - 1, console.log)
  own_loop(0, n => n < arr.length, n => n + 1, n => console.log(arr[n]))
})()
