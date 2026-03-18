(function() {
  // Test cases
  function test(text, expected) {
    let result = text.replace(/^'|(\W)'|'(\W)|'$/g, '$1"$2')
    console.log(result === expected ? '✅' : '❌', result)
  }

  test("'I'm the cook,' he said, 'It's my job.'", "\"I'm the cook,\" he said, \"It's my job.\"")
  test("don't change 'contractions'", "don't change \"contractions\"")
  test("'start story' then don't", "\"start story\" then don't")
})()
