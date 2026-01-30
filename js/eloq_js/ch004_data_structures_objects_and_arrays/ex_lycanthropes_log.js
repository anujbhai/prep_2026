(function () {
  const JOURNAL = require("./journal/journal")

  let journal = []

  function add_entry(events, squirrel) {
    journal.push({ events, squirrel })
  }
  // add_entry([
  //   "work",
  //   "touched tree",
  //   "pizza",
  //   "running",
  //   "television"
  // ], false)
  // add_entry([
  //   "work",
  //   "ice cream",
  //   "cauliflower",
  //   "lasagna",
  //   "touched tree",
  //   "brushed teeth"
  // ], false)
  // add_entry([
  //   "weekend",
  //   "cycling",
  //   "break",
  //   "peanuts",
  //   "beer"
  // ], true)

  /* Computing correlation */
  function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) / Math.sqrt(
      (table[2] + table[3]) *
      (table[0] + table[1]) *
      (table[1] + table[3]) *
      (table[0] + table[2])
    )
  }
  console.log(phi([76, 9, 4, 1]))

  function table_for(event, journal)  {
    let table = [0, 0, 0, 0]

    for (let i = 0; i < journal.length; i++) {
      let entry = journal[i], index = 0

      if (entry.events.includes(event)) index += 1
      if (entry.squirrel) index += 2
      
      table[index] += 1
    }
    return table
  }
  console.log(table_for("pizza", JOURNAL))

  function journal_events(journal) {
    let events = []

    for (let entry of journal) {
      for (let event of entry.events) {
        if (!events.includes(event)) {
          events.push(event)
        }
      }
    }

    return events
  }
  console.log(journal_events(JOURNAL))

  function max(...numbers) {
    let result = -Infinity

    for (let number of numbers) {
      if (number > result) result = number
    }

    return result
  }
  console.log(max(4, 1, 9, -2))

  for (let event of journal_events(JOURNAL)) {
    let correlation = phi(table_for(event, JOURNAL))

    if (correlation > 0.1 || correlation < -0.1) {
      console.log(event + ":", correlation)
    }
  }

  for (let entry of JOURNAL) {
    if (entry.events.includes("peanuts") && !entry.events.includes("brushed teeth")) {
      entry.events.push("peanut teeth")
    }
  }
  console.log(phi(table_for("peanut teeth", JOURNAL)))

  var list = {
    value: 1,
    rest: {
      value: 2,
      rest: {
        value: 3,
        rest: null,
      },
    },
  }
})()

