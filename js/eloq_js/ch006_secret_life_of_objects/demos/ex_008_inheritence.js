(function() {
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

      let val = this.list.value
      this.list = this.list.rest

      return { val, done: false }
    }
  }

  class LengthList extends List {
    #length // private property

    constructor(value, rest) {
      super(value, rest)

      this.#length = super.length
    }

    get length() {
      return this.#length
    }
  }

  List.prototype[Symbol.iterator] = function() {
    return new ListIterator(this)
  }

  console.log(LengthList.from_arr([1, 2, 3]).length)

  console.log(new LengthList(1, null) instanceof LengthList)
  console.log(new LengthList(2, null) instanceof List)
  console.log(new List(3, null) instanceof LengthList)
  console.log([1] instanceof Array)
})()
