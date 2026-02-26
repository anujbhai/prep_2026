(function() {
  /*
  The standard JavaScript environment provides another data structure called Set. Like an instance of Map, a set holds a collection of values. Unlike Map, it does not associate other values with those—it just tracks which values are part of the set. A value can be part of a set only once—adding it again doesn’t have any effect. Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods. Its constructor creates an empty group, add adds a value to the group (but only if it isn’t already a member), delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group. Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same. Give the class a static from method that takes an iterable object as its ar gument and creates a group that contains all the values produced by iterating over it.
  */
  class Group {
    constructor() {
      this.members = []
    }

    add(val) {
      if (!this.has(val)) {
        this.members.push(val)
      }
    }

    delete(val) {
      this.members = this.members.filter(m => m !== val)
    }

    has(val) {
      return this.members.includes(val)
    }

    static from(iterable) {
      let group = new Group()

      for (let val of iterable) {
        group.add(val)
      }

      return group
    }
  }

  let group1 = Group.from([10, 20, 30, 20]);
  console.log(group1.has(10));
  console.log(group1.has(40));

  group1.add(40);
  console.log(group1.has(40));

  group1.delete(20);
  console.log(group1.has(20));
  console.log("Group 1", group1);
})()
