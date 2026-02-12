(function() {
  /* STRINGS AND THEIR PROPERTIES */
  let kim = "Kim"
  kim.age = 88
  console.log(kim.age)

  console.log("coconuts".slice(4, 7))
  console.log("coconut".indexOf("u"))
  console.log("one two three".indexOf("ee"))
  console.log(" okay \n ".trim())
  console.log(String(6).padStart(3, 0))

  // split
  let sentence = "Secretarybirds specialize in stomping"
  let words = sentence.split(" ")
  console.log(words)
  console.log(words.join(". "))

  // repeat
  console.log("LA".repeat(5))

  // Accessing the individual characters in a string looks like accessing array elements
  let str = "abc"
  console.log(str.length)
  console.log(str[1])

  /* REST PARAMETERS */
  console.log("\n\n REST PARAMETERS")
  function max(...numbers) {
    let result = -Infinity

    for (let number of numbers) {
      if (number > result) result = number
    }

    return result
  }
  console.log(max(4, 1, 9, -2))

  let numbers = [5, 1, 7]
  console.log(max(...numbers))

  let rest_words = ["never", "fully"]
  console.log(["will", ...rest_words, "understand"])

  let coordinates = {x: 10, y: 0}
  console.log({ ...coordinates, y: 6, z: 1 })

  /* THE MATH OBJECT */
  console.log("\n\n THE MATH OBJECT")
  function random_point_on_circle(radius) {
    let angle = Math.floor(Math.random() * 2) * Math.PI

    return {x: radius * Math.cos(angle), y: radius * Math.sin(angle)}
  }
  console.log(random_point_on_circle(2))

  console.log(Math.floor(Math.random() * 10))

  // Example
  // const nums = [1, 2, 3, 4, 5]
  // let mapped_result = nums.map((item, index, array) => {
  //   return item + 5
  // })
  // console.log(mapped_result)

  /* DESTRUCTURING */
  console.log("\n\n DESTRUCTURING")
  const arr = ["Custom 74", "Century 3776", "Large 1911"]
  // const [pilot, platinum, sailor] = arr
  // console.log(platinum)

  // destructuring using rest
  // const [pilot, ...rest] = arr
  // console.log(rest)

  // destructuring objects
  const instrument_objects = {
    pilot: "Custom 74",
    platinum: "Century 3776",
    sailor: "Large 1911",
  }
  const { pilot, platinum, sailor } = instrument_objects
  console.log(sailor)

  /* OPTIONAL PROPERTY ACCESS */
  console.log("\n\n OPTIONAL PROPERTY ACCESS")
  function city(obj) {
    return obj.address?.city
  }
  console.log(city({address: {city: "Toronto"}}))
  console.log(city({name: "Vera"}))
})()

