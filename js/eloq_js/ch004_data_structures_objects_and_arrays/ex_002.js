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
})()

