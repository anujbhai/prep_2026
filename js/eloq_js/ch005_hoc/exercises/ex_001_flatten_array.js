(function() {
  const arr_demo = [
    1,
    2,
    3,
    [
      4,
      5,
      6,
      [
        7,
        8,
        9
      ],
      10,
      11,
      12
    ],
    13,
    14,
    15
  ]

  // flattenning with recursion and loop
  function flatten_1(arr) {
    let result = []

    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result = result.concat(flatten_1(arr[i]))
      } else {
        result.push(arr[i])
      }
    }

    return result
  }
  console.log("Flattenning array with recursion and loop: ", flatten_1(arr_demo))

  // flattenning with recursion and reduce
  function flatten_2(arr) {
    return arr
      .reduce(
        (acc, current) => acc.concat(
          Array.isArray(current)
            ? flatten_1(current)
            : current
        ), [])
  }
  console.log("Flattenning array with recursion and reduce: ", flatten_1(arr_demo))

  // flattenning with reduce and spread operators
  function flatten_3(arr) {
    return arr
      .reduce((acc, current) => Array.isArray(current)
          ? [...acc, ...current]
          : [...acc, current]
      , [])
  }
  console.log("Flattenning array with reduce and spread operator:", flatten_3(arr_demo)) // doen not flatten deep nested array

  function flatten_4(arr) {
    return arr.flat(Infinity)
  }
  console.log("Flattenning array with infinity: ", flatten_4(arr_demo))
})()
