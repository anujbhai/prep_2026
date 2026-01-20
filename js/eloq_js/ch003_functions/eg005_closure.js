(function() {
  // Basic example
  function alert_function(msg) {
    return () => {
      console.log(`Alert: ${ msg }`)
    }
  }

  const alert_user = alert_function("hi user")

  alert_user()

  // Closure interview test
  for (var i = 0; i < 3; i++) {
    const log = () => {
      console.log(i)
    }

    setTimeout(log, 100)
  }

  for (let i = 0; i < 3; i++) {
    const log = () => {
      console.log(i)
    }

    setTimeout(log, 100)
  }
})()

