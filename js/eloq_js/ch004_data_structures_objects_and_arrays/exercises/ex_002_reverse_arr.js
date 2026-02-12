(function() {
  function reverse_arr(arr) {
    let result_arr = []

    /* using for loop */
    // for (let i = arr.length -1; i >= 0; i--) {
    //   result_arr.push(arr[i])
    // }
    //
    // return result_arr

    /* using reduce method */
    // return arr.reduce((acc, current) => [current, ...acc], [])

    /* using map */
    // return arr.map((_, i, a) => a[a.length - 1 - i])

    /* using  for/of and unshift */
    for (let item of arr) {
      result_arr.unshift(item)
    }

    return result_arr
  }

  function reverse_arr_in_place(arr) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      let temp = arr[i]
      arr[i] = arr[arr.length - 1 - i]
      arr[arr.length - 1 - i] = temp
    }

    return arr
  }

  console.log(reverse_arr([1, 2, 3, 4, 5]))

  let demo_arr = [10, 20, 30, 40, 50]
  console.log("Array reverse before:", demo_arr)
  reverse_arr_in_place(demo_arr)
  console.log("Array reverse in place after", demo_arr)
})()

