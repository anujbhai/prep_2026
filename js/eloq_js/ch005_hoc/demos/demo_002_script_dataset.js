(function() {
  const SCRIPTS = require("./scripts")

  // FILTERING ARRAYS
  function filter(arr, test) {
    let filtered = []

    for (let element of arr) {
      if (test(element)) {
        filtered.push(element)
      }
    }

    return filtered
  }
  // console.log(filter(SCRIPTS, script => script.living))

  // TRANSFORMING WITH MAP
  function map(arr, transform) {
    let mapped = []

    for (let element of arr) {
      mapped.push(transform(element))
    }

    return mapped
  }

  let rtlScripts = SCRIPTS.filter(s => s.direction === "rtl")
  console.log("Output 1 :", map(rtlScripts, s => s.name))

  // SUMMARIZING WITH REDUCE
  function reduce(arr, combine, start) {
    let current = start

    for (let element of arr) {
      current = combine(current, element)
    }

    return current
  }
  console.log("Output 2 :", reduce([1, 2, 3, 4], (a, b) => a + b, 0))
  console.log("Output 3 :", [1, 2, 3, 4].reduce((a, b) => a + b, 0))

  // reduce twice to find the script with most characters
  function char_count(script) {
    return script.ranges.reduce((count, [from, to]) => {
      return count + (to - from)
    }, 0)
  }
  console.log("Output 4 :", SCRIPTS.reduce((a, b) => {
    return char_count(a) > char_count(b) ? b : a
  }))

  // COMPOSABILITY
  // w/o HOF
  function find_biggest() {
    let biggest = null
    for (let script of SCRIPTS) {
      if (biggest === null || char_count(script) > char_count(biggest)) {
        biggest = script
      }
    }
    console.log("Output 5 :", biggest)
  }
  find_biggest()

  // composing average readable approach
  function average(array) {
    return array.reduce((a, b) => a + b) / array.length
  }
  console.log("Output 6 :", Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year))))
  console.log("Output 7 :", Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year))))

  // composing average abstract (+fast) approach
  function avg_abstract_fast() {
    let total = 0, count = 0

    for (let script of SCRIPTS) {
      if (script.living) {
        total += script.year
        count += 1
      }
    }
    console.log("Output 8 :", Math.round(total / count))
  }
  avg_abstract_fast()

  // STRINGS AND CHARACTER CODES
  function char_script(code) {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => {
        return code >= from && code < to
      })) {
        return script
      }
    }

    return null
  }
  console.log("Output 9 :", char_script(121))
})()
