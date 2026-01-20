(function() {
  function print_farm_inventory(cows, chicken) {
    let cow_string = String(cows)

    while (cow_string.length < 3) {
      cow_string = "0" + cow_string
    }
    console.log(`${cow_string} Cows`)

    let chicken_string = String(chicken)

    while (chicken_string.length < 3) {
      chicken_string = "0" + chicken_string
    }
    console.log(`${chicken_string} Chicken`)
  }
  print_farm_inventory(7, 11)

  // zero padded
  function print_zero_padded_with_label(number, label) {
    let number_string = String(number)

    while (number_string.length < 3) {
      number_string = "0" + number_string
    }
    console.log(`${number_string} ${label}`)
  }

  function print_farm_inventory2(cows, chicken, pigs) {
    print_zero_padded_with_label(cows, "Cows")
    print_zero_padded_with_label(chicken, "Chicken")
    print_zero_padded_with_label(pigs, "Pigs")
  }
  print_farm_inventory2(7, 33, 5)
})()

