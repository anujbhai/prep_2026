class Rabbit {
  constructor(type) {
    this.type = type;
  }

  speak(line) {
    console.log(`the ${ this.type } rabbit says "${ line }"`)
  }
}

let killer_rabbit = new Rabbit("killer")
killer_rabbit.speak("No mercy!")

// pre ES6 approach
function ArchaicRabbit(type) {
  this.type = type
}
ArchaicRabbit.prototype.speak = function(line) {
  console.log(`The ${ this.type } rabbit says "${ line }"`)
}
let old_school_rabbit = new ArchaicRabbit("old school")
old_school_rabbit.speak("Say, what\'s up doc?")

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype)
console.log(Object.getPrototypeOf(killer_rabbit) == Rabbit.prototype)

// Overriding Derived Properties
Rabbit.prototype.teeth = "small"
console.log(killer_rabbit.teeth)

killer_rabbit.teeth = "long, sharp, and bloody"
console.log(killer_rabbit.teeth)
console.log((new Rabbit("basic")).teeth)
console.log(Rabbit.prototype.teeth)

// Comparing 'toString' prototype property 
console.log(Array.prototype.toString == Object.prototype.toString)
console.log([1, 2, 3].toString())
console.log(Object.prototype.toString.call([1, 2]))
