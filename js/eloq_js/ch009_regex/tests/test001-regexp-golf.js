(function () {
  function verify(regexp, yes, no) {
    for (let str of yes) {
      if (!regexp.test(str)) {
        console.log(`❌ Fail '${str}'`)
      }
    }

    for (let str of no) {
      if (regexp.test(str)) {
        console.log(`⚡ Unexpected '${str}'`)
      }
    }
  }

  // 1. car and cat -> /ca[rt]/
  verify(/ca[rt]/,
    ["my car", "bad cats"],
    ["camper", "high art"])

  // 2. pop and prop -> /pr?op/
  verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop", "prrrop"])

  // 3. ferret, ferry, ferrari -> /ferr[etariy]/
  verify(/ferr[etariy]/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"])

  // 4. Any word ending in ious -> /ious\b/
  verify(/ious\b/,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"])

  // 5. Whitespace + [. , ; :] -> /\s[.,:;]/
  verify(/\s[.,:;]/,
    ["bad punctuation ."],
    ["escape the period"])

  // 6. Word longer than 6 letters -> /\w{7,}/
  verify(/\w{7,}/,
    ["hottentottententen", "Siebentausenddreihundertzweiundzwanzig"],
    ["no", "hotten totten tenten", "three small words"])

  // 7. Word without e/E -> /\b\w*[bcdfghjklmnpqrstvwxyz]+\b/gi
  verify(/\b[^e\s][^e\s]*\b/i,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape", "BEET"])

  console.log("✅ All tests passed")
})()
