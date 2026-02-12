(function() {
  function range(start, end, step = start <= end ? 1 : -1) {
    let req_arr = []

    for (
      let i = start;
      step >= 0
        ? i <= end
        : i >= end;
      i += step
    ) {
      req_arr.push(i)
    }

    return req_arr
  }

  function sum(nums) {
    let result = 0;

    for (let num of nums) {
      result += num
    }

    return result
  }

  console.log(sum(range(1, 10)))
  console.log(range(1, 10, 2))
  console.log(range(5, 2, -1))
  console.log(sum(range(1, 10, 2)))
})()

