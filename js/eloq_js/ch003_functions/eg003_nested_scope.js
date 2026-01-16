(function() {
  /* Nested scope */
  const hummus = function(factor) {
    const ingredient = function(amount, unit, name) {
      let ingredient_amount = amount * factor;
      if (ingredient_amount > 1) {
        unit += "s"
      }

      console.log(`${ingredient_amount} ${unit} ${name}`)
    }
    ingredient(1, "can", "chickpeas")
    ingredient(0.25, "cup", "tahini")
    ingredient(0.25, "cup", "lemon juice")
    ingredient(1, "clove", "garlic")
    ingredient(2, "tablespoon", "olive oil")
    ingredient(0.5, "teaspoon", "cumin")
  }
  hummus(1)

  /* Function as values */
  // let launch_missiles = function() {
  //   missile_system.launch("now")
  // }
  // if (safe_mode) {
  //   launch_missiles = function() {/* do nothing */}
  // }

  /* Declaration Notation */
  function square(x) {
    return x * x
  }
  console.log("the future says: ", future())
  function future() {
    return "You'll never have flying cars"
  }

  /* Arrow functions */
  const round_to = (n, step) => {
    let remainder = n % step
    return n = remainder + (remainder < step / 2 ? 0 : step)
  }
  console.log(round_to(100, 1))

  const square_1 = (x) => {return x * x}
  const square_2 = x => x * x;
  console.log(square(2))
  console.log(square_1(3))
  console.log(square_2(4))
  const horn = () => {
    console.log("Toot")
  }
  horn()
})()

