(function() {
  let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62,
  }
  console.log(`Julia is ${ ages["Julia"] }`)
  console.log("Is Jack's age known?", "Jack" in ages)
  console.log("Is toString's age known?", "toString" in ages)
  console.log("toString" in Object.create(null)) // creating object without prototype to be safely used as a map

  let ages_map = new Map()
  ages_map.set("Boris", 39)
  ages_map.set("Liang", 22)
  ages_map.set("Julia", 62)

  // When using obj in a map is not allowed
  console.log(`Julia is ${ ages_map.get("Julia") }`)
  console.log(`Is Jack's age known? ${ ages_map.has("Jack") }`)
  console.log(`Is toString's age known? ${ ages_map.has("toString()") }`)

  console.log(Object.hasOwn({ x: 1 }, "x"))
  console.log(Object.hasOwn({ x: 1 }, "toString"))
})()
