(function() {
  let ok_iterator = "OK"[Symbol.iterator]()
  console.log(ok_iterator.next())
  console.log(ok_iterator.next())
  console.log(ok_iterator.next())

  // Class based linked list
  class List {
    constructor(value, rest) {
      this.value = value
      this.rest = rest
    }

    get length() {
      return 1 + (this.rest ? this.rest.length : 0)
    }

    static from_arr(arr) {
      let result = null

      for (let i = arr.length - 1; i >= 0; i--) {
        result = new this(arr[i], result)
      }

      return result
    }
  }

  class ListIterator {
    constructor(list) {
      this.list = list
    }

    next() {
      if (this.list == null) {
        return { done: true }
      }

      let value = this.list.value
      this.list = this.list.rest

      return { value, done: false }
    }
  }

  List.prototype[Symbol.iterator] = function() {
    return new ListIterator(this)
  }

  let list_demo_a = List.from_arr([1, 2, 3])

  for (let element of list_demo_a) {
    console.log(element)
  }

  console.log({..."PCI"})
})()
