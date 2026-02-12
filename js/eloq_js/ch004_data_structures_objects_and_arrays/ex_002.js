(function() {
  /* Mutability */
  let obj_1 = { value: 10 }
  let obj_2 = obj_1
  let obj_3 = { value: 10 }

  console.log(obj_1 == obj_2)
  console.log(obj_1 == obj_3)

  obj_1.value = 15

  console.log(obj_2.value)
  console.log(obj_3.value)

  /* Further arrayology */
  let todo_list = []

  function remember(task) {
    todo_list.push(task)
  }
  function get_task() {
    return todo_list.shift()
  }
  function remember_urgently(task) {
    todo_list.unshift(task)
  }
  remember("haircut");
  console.log("remember:", todo_list);
  get_task()
  console.log("get task:", todo_list);
  remember_urgently("pay bill")
  console.log("remember urgently", todo_list);

  // indexOf and lastIndexOf
  console.log([1, 2, 3, 2, 1].indexOf(2))
  console.log([1, 2, 3, 2, 1].lastIndexOf(2))

  // slice
  console.log([0, 1, 2, 3, 4].slice(2, 4))
  console.log([0, 1, 2, 3, 4].slice(2))

  function remove_from_arr(arr, index) {
    return arr.slice(0, index)
      .concat(arr.slice(index + 1))
  }
  console.log(remove_from_arr(["a", "b", "c", "d", "e"], 2))
})()

