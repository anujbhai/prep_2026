(function() {
  let data = [1, 2, 3, 4]

  let data_list = {
    value: 1,
    rest: {
      value: 2,
      rest: {
        value: 3,
        rest: null
      },
    },
  }
  let edit_data_list = {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }

  const arr_to_list = function(arr) {
    let list = null;

    for (let i = arr.length - 1; i >= 0; i--) {
      list = { value: arr[i], rest: list }
    }

    return list
  }

  const list_to_arr = function(list) {
    const arr = []
    let current = list

    while (current !== null) {
      arr.push(current.value)
      current = current.rest
    }

    return arr
  }

  const prepend = function(el, ls) {
    return { value: el, rest: ls }
  }

  const find_nth_iterative = function(list, index) {
    let current = list
    let count = 0

    while (current !== null) {
      if (count === index) {
        return current.value
      }

      current = current.rest
      count++
    }

    return undefined
  }

  const find_nth_recursive = function(list, index) {
    if (list === null) {
      return undefined
    }

    if (index === 0) {
      return list.value
    }

    return find_nth_recursive(list.rest, index - 1)
  }

  // eg. 1
  const converted_data_list = arr_to_list(data)
  console.log(data_list)

  // eg. 2
  console.log(list_to_arr(data_list))

  // eg. 3
  const prepend_data = prepend(1, edit_data_list)
  console.log(prepend_data)

  // eg. 4
  console.log(find_nth_iterative(data_list, 1))
  console.log(find_nth_iterative(data_list, 5))

  // eg. 5
  console.log(find_nth_recursive(data_list, 1))
  console.log(find_nth_recursive(data_list, 2))
})()

