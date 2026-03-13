(function() {
  // CREATING A REGEX
  let rel1 = new RegExp("abc")
  let rel2 = /abc/
  let a_plus = /A\+/

  // TESTING FOR MATCHES
  console.log(rel2.test("abcde"))
  console.log(rel2.test("abxde"))

  // SETS OF CHARACTER
  console.log("\n")
  console.log(/[0123456789]/.test("in 1992"))
  console.log(/[0-9]/.test("in 1992"))

  let date_time_1 = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/
  console.log("\n")
  console.log(date_time_1.test("01-30-2003 15:20"))
  console.log(date_time_1.test("01-jan-2003 15:20"))

  let non_binary = /[^01]/
  console.log("\n")
  console.log(non_binary.test("1100100010100110"))
  console.log(non_binary.test("0111010112101001"))

  // INTERNATIONAL CHARACTERS
  console.log("\n")
  console.log(/\p{L}/u.test("α"))
  console.log(/\p{L}/u.test("!"))
  console.log(/\p{Script=Greek}/u.test("α"))
  console.log(/\p{Script=Arabic}/u.test("α"))

  // REPEATING PARTS OF A PATTERN
  console.log("\n")
  console.log(/'\d+'/.test("'123'"))
  console.log(/'\d+'/.test("''"))
  console.log(/'\d*'/.test("'123'"))
  console.log(/'\d*'/.test("''"))

  let neighbor = /neighbou?r/
  console.log("\n")
  console.log(neighbor.test("neighbour"))
  console.log(neighbor.test("neighbor"))
  
  let date_time_2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/
  console.log("\n")
  console.log(date_time_2.test("1-20-2003 8:45"))

  // GROUPING SUBEXPRESSION
  let cartoon_crying = /boo+(hoo)+/i
  console.log("\n")
  console.log(cartoon_crying.test("Boohooohoohooo"))

  // MATCHING GROUPS
  let match = /\d+/.exec("one two 100")
  console.log("\n")
  console.log(match)
  console.log(match.index)
  console.log("one two 100".match(/\d+/))

  let quoted_text = /'([^']*)'/
  console.log("\n")
  console.log(quoted_text.exec("she said 'hello'"))
  
  console.log(/bad(ly)?/.exec("bad"))
  console.log(/(\d)+/.exec("123"))
  console.log(/(?:na)+/.exec("banana"))
})()
