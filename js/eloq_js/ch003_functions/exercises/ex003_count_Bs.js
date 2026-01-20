(function() {
  function count_char(str, char) {
    let count = 0

    for (let i = 0; i < str.length; i++) {
      if (str[i] === char) {
        count++
      }
    }

    return count
  }

  function count_Bs(str) {
    return count_char(str, "B")
  }

  console.log(count_Bs("BOBBY"))
  console.log(count_char("karakoram", "k"))
  console.log(count_char("annamalai", "a"))
})()

