(function() {
  function parse_INI(string) {
    // Start with an object to hold the top-level fields
    let result = {}
    let section = result

    for (let line of string.split(/\r?\n/)) {
      let match
      if (match = line.match(/^(\w+)=(.*)$/)) {
        section[match[1]] = match[2]
      } else if (match = line.match(/^\[(.*)\]$/)) {
        section = result[match[1]] = {}
      } else if (!/^\s*(;|$)/.test(line)) {
        throw new Error("Line '" + line + "' is not valid.")
      }
    }

    return result
  }

  console.log(parse_INI(`
name=Vasilis
[address]
city=Tessaloniki
  `))
})()
