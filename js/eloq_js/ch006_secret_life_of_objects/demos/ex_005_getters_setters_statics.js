(function() {
  let varying_size = {
    get size() {
      return Math.floor(Math.random() * 100)
    }
  }
  console.log(varying_size.size)
  console.log(varying_size.size)

  class Temperature {
    constructor(celcius) {
      this.celcius = celcius
    }

    get farenheit() {
      return this.celcius * 1.8 + 32
    }

    set farenheit(value) {
      this.celcius = (value - 32) / 1.8
    }

    static from_farenheit(val) {
      return new Temperature((val - 32) / 1.8)
    }
  }

  let temp = new Temperature(22)
  console.log(temp.farenheit)
  temp.farenheit = 86
  console.log(temp.celcius)

  let boil = Temperature.from_farenheit(212)
  console.log(boil.celcius)
})()
