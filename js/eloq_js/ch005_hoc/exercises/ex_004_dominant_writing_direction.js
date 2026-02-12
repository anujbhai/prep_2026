(function() {
  const scripts = require("../demos/scripts")

  function count_by(items, group_name) {
    let count = []

    for (let item of items) {
      let name = group_name(item)
      let known = count.find(c => c.name == name)

      if (!known) {
        count.push({ name, count: 1 })
      } else {
        known.count++
      }
    }

    return count
  }

  function char_script(code) {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => code >= from && code < to)) {
        return script
      }
    }

    return null
  }

  const dominant_write_direction = function(text) {
    let counted = count_by(text, char => {
      let script = char_script(char.codePointAt(0))

      return script
        ? script.direction
        : null
    }).filter(({ name }) => name !== null)

    if (counted.length === 0) return "unknown"

    return counted.reduce((acc, current) => (acc.count > current.count ? acc : b)).name
  }

  console.log(dominant_write_direction("Quick brown fox..."));
  console.log(dominant_write_direction("جمع اللغة"));
  console.log(dominant_write_direction("ཡིག་མགོ་ཨ་ཕྱེད"));
  console.log(dominant_write_direction("を前部要素とする複合語の形態素説明で"));
  console.log(dominant_write_direction("文意的完整性亦可能受到影響"));
  console.log(dominant_write_direction("한국어 어문 규범. 국립국어원."));
  console.log(dominant_write_direction("ᠥᠷᠭᠡᠰᠦᠲᠡᠢ ᠰᠢᠯᠪᠢ"))
})()
