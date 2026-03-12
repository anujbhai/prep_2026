(function() {
  const box = {
    locked: true,
    _content: [],
    unlock() { this.locked = false },
    lock() { this.locked = true },
    get content() {
      if (this.locked) throw new Error("Locked!")
      return this._content
    }
  }

  // solution
  function with_box_unlocked(body) {
    const was_locked = box.locked

    if (was_locked) box.unlock()

    try {
      body()
    } finally {
      if (was_locked) box.lock()
    }
  }

  with_box_unlocked(() => {
    box.content.push("gold piece")
  })

  try {
    with_box_unlocked(() => {
      throw new Error("Pirates on the horizon! Abort!")
    })
  } catch (e) {
    console.log("Error raised: ", e.message)
  }

  with_box_unlocked(() => {
    console.log("Box locked?", box.locked)
    console.log("Box content:", box.content)
  })

  console.log("Finally locked?", box.locked)
})()
