(function() {
  const num_regex = /^[+\-]?\d*\.?\d*(?:[eE][+\-]?\d+)?$/

  function test_number(str, expected) {
    const pass = num_regex.test(str)

    console.log(`${str.padEnd(20)} -> ${pass} ${pass === expected ? '✅' : '❌'}`)
  }

  // Valid JS numbers
  test_number("0", true)
  test_number("-0", true)
  test_number("+42", true)
  test_number("3.1415", true)
  test_number(".5", true)
  test_number("5.", true)
  test_number("1e3", true)
  test_number("1E-3", true)
  test_number("1.2e+3", true)
  test_number("123e456", true)

  // Invalid
  test_number(".", false);
  test_number("e", false);
  test_number("", false);
  test_number("abc", false);
  test_number("1.2.3", false);
  test_number("1e", false);
  test_number("1e+", false);

  console.log("\n✅ Number regex:", num_regex.source);
})()
