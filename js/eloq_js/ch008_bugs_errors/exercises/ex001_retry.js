(function() {
  class MultiplicatorUnitFailure extends Error {}

  function primitiveMultiply(a, b) {
    // 20% failure, 80% success
    if (Math.random() < 0.8) {
      throw new MultiplicatorUnitFailure("Klunk")
    }

    return a * b
  }

  function reliableMultiply(a, b) {
    while (true) {
      try {
        return primitiveMultiply(a, b)
      } catch (e) {
        if (e instanceof MultiplicatorUnitFailure) {
          continue
        }

        throw e
      }
    }
  }

  console.log(reliableMultiply(8, 8))
  console.log(reliableMultiply(2, 6))

  try {
    reliableMultiply("a", 5)
  } catch (e) {
    console.log("Other error:", e.message)
  }
})()
