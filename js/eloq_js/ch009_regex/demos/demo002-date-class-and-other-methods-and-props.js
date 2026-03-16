(function() {
  console.log(new Date())
  console.log(new Date(2009, 11, 9))
  console.log(new Date(2009, 11, 9, 59, 59, 999))
  console.log(new Date(2013, 11, 19).getTime())
  console.log(new Date(1387407600000))

  function get_date(string) {
    let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string)

    return new Date(year, month - 1, day)
  }
  console.log(get_date("1-30-2003"))

  // BOUNDARIES AND LOOK-AHEAD
  console.log(/a(?=e)/.exec("braeburn"))
  console.log(/a(?! )/.exec("a b"))

  // CHOICE PATTERNS
  let animal_count = /\d+ (pig|cow|chicken)s?/
  console.log(animal_count.test("15 pigs"))
  console.log(animal_count.test("15 pugs"))

  // REPLACE METHOD
  console.log("papa".replace("p", "m"))
  console.log("Borobudur".replace(/[ou]/, "a"))
  console.log("Borobudur".replace(/[ou]/g, "a"))

  console.log("Liskov, Barbara\nMcCarthy, John\nMilner, Robin".replace(/(\p{L}+), (\p{L}+)/gu, "$2 $1"))

  let stock = "1 lemon, 2 cabbages, and 101 eggs"
  function minus_one(match, amount, unit) {
    amount = Number(amount) - 1

    if (amount == 1) { // only one left, remove the 's'
      unit = unit.slice(0, unit.length - 1)
    } else if (amount == 0) {
      amount = "no"
    }

    return amount + " " + unit
  }
  console.log(stock.replace(/(\d+) (\p{L}+)/gu, minus_one))

  // GREED
  function strip_comments(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "")
  }
  console.log(strip_comments("1 + /* 2 */3"))
  console.log(strip_comments("x = 10;// ten!"))
  console.log(strip_comments("1 /* a */+/* b */ 1"))

  // non-greedy
  function strip_comments(code) {
    return code.replace(/\/\/.*|\/\*[^]\*\//g, "")
  }
  console.log(strip_comments("1 /* a */+/* b */ 1"))

  // DYNAMICALLY CREATING REGEXP OBJECT
  let name_normal = "harry"
  let regexp = new RegExp("(^|\\s)" + name_normal + "($|\\s)", "gi")
  console.log(regexp.test("Harry is a dodgy character."))

  let name_nerdy = "dea+h1[]rd"
  let escaped = name_nerdy.replace(/[\\[.+*?(){|^$]/g, "\\$&")
  let regexp_nerdy = new RegExp("(^|\\s)" + escaped + "($|\\s)", "gi")
  let text = "This dea+h1[]rd guy is super annoying."
  console.log(regexp_nerdy.test(text))

  // THE SEARCH METHOD
  console.log(" word".search(/\S/))
  console.log(" ".search(/\S/))

  // THE LAST INDEX PROPERTY
  let pattern = /y/g
  pattern.lastIndex = 3
  let match = pattern.exec("xyzzy")
  console.log(match.index)
  console.log(pattern.lastIndex)

  let global = /abc/g
  console.log(global.exec("xyz abc"))

  let sticky = /abc/y
  console.log(sticky.exec("xyz abc"))

  let digit = /\d/g
  console.log(digit.exec("here it is: 1"))
  console.log(digit.exec("and now: 1"))
  console.log("Banana".match(/an/g))

  let input = "A string with 3 numbers in it... 42 and 88."
  let matches = input.matchAll(/\d+/g)
  for (let match of matches) {
    console.log("Found", match[0], "at", match.index)
  }
})()
