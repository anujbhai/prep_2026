(function() {
  /* DATASETS */
  function datasets() {
    let list_of_numbers = [2, 3, 5, 7, 11]
    console.log(list_of_numbers[2])
    console.log(list_of_numbers[0])
    console.log(list_of_numbers[2 - 1])
  }
  datasets()

  /* ARRAY METHODS */
  function arr_methods() {
    let sequence = [1, 2, 3]
    sequence.push(4)
    sequence.push(5)
    console.log("pushed 4 and 5", sequence)
    console.log("", sequence.pop())
    console.log(sequence)
  }
  arr_methods()

  /* OBJECTS - arbitary collection of properties */
  function obj_props() {
    let day1 = {
      squirrel: false,
      events: ["work", "touched tree", "pizza", "running"]
    }
    console.log(day1.squirrel)
    console.log(day1.wolf)
    day1.wolf = false
    console.log(day1.wolf)
  }
  obj_props()

  // Deleting object ptoperties
  let an_obj = { left: 1, right: 2 }
  console.log(an_obj.left)

  delete an_obj.left
  console.log(an_obj.left) // returns 'undefined'

  // 'in' operator
  console.log("left" in an_obj)
  console.log("right" in an_obj)

  // 'Object.keys' function
  console.log(Object.keys({ x: 0, y: 0, z: 2 })) // returns an array of keys/properties

  // 'Object.assign'
  let obj_a = { a: 1, b: 2 }
  Object.assign(obj_a, { b: 3, c: 4 })
  console.log(obj_a)
})()

