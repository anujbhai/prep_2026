(function() {
  const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin", "Alice's House-Post Office", "Bob's House-Town Hall", "Daria's House-Ernie's House", "Daria's House-Town Hall", "Ernie's House-Grete's House", "Grete's House-Farm", "Grete's House-Shop", "Marketplace-Farm", "Marketplace-Post Office", "Marketplace-Shop", "Marketplace-Shop", "Marketplace-Town Hall", "Shop-Town Hall"
  ]

  function build_graph(edges) {
    let graph = Object.create(null)

    function add_edge(from, to) {
      if (from in graph) {
        graph[from].push(to)
      } else {
        graph[from] = [to]
      }
    }

    for (let [from, to] of edges.map(r => r.split("-"))) {
      add_edge(from, to)
      add_edge(to, from)
    }

    return graph
  }

  const road_graph = build_graph(roads)

  class VillageState {
    constructor(place, parcels) {
      this.place = place
      this.parcels = parcels
    }

    move(destination) {
      if (!road_graph[this.place].includes(destination)) {
        return this
      } else {
        let parcels = this.parcels.map(p => {
          if (p.place !== this.place) return p

          return { place: destination, address: p.address }
        }).filter(p => p.place != p.address)

        return new VillageState(destination, parcels)
      }
    }
  }

  let first = new VillageState(
    "Post Office",
    [{ place: "Post Office", address: "Alice's House" }]
  )
  let next = first.move("Alice's House")

  console.log(next.place)
  console.log(next.parcels)
  console.log(first.place)

  // Simulation
  // ex. 00. Original
  // function run_robot(state, robot, memory) {
  //   for (let turn = 0;; turn++) {
  //     if (state.parcels.length == 0) {
  //       console.log(`Done in ${ turn } turns`)
  //       break
  //     }

  //     let action = robot(state, memory)
  //     state = state.move(action.direction)
  //     memory = action.memory
  //     console.log(`Moved to ${ action.direction }`)
  //   }
  // }

  // ex. 01. bot comparision
  function run_robot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        return turn;
      }
      let action = robot(state, memory)
      state = state.move(action.direction)
      memory = action.memory
    }
  }

  function random_pick(arr) {
    let choice = Math.floor(Math.random() * arr.length)
    return arr[choice]
  }

  function random_robot(state) {
    return { direction: random_pick(road_graph[state.place]) }
  }

  VillageState.random = function(parcel_count = 5) {
    let parcels = []

    for (let i = 0; i < parcel_count; i++) {
      let address = random_pick(Object.keys(road_graph))
      let place

      do {
        place = random_pick(Object.keys(road_graph))
      } while (place == address)

      parcels.push({ place, address })
    }

    return new VillageState("Post Office", parcels)
  }

  run_robot(VillageState.random(), random_robot)

  // Mail truck's route (improving robots efficiency)
  const mail_route = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall", "Daria's House", "Ernie's House", "Grete's House", "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
  ]

  function route_robot(state, memory) {
    if (memory.length == 0) {
      memory = mail_route
    }

    return { direction: memory[0], memory: memory.slice(1) }
  }

  function find_route(graph, from, to) {
    let work = [{ at: from, route: [] }]

    for (let i = 0; i < work.length; i++) {
      let {at, route} = work[i]

      for (let place of graph[at]) {
        if (place == to) return route.concat(place)

        if (!work.some(w => w.at == place)) {
          work.push({ at: place, route: route.concat(place) })
        }
      }
    }
  }

  function goal_oriented_robot({ place, parcels }, route) {
    if (route.length == 0) {
      let parcel = parcels[0]

      if (parcel.place != place) {
        route = find_route(road_graph, place, parcel.place)
      } else {
        route = find_route(road_graph, place, parcel.address)
      }
    }

    return { direction: route[0], memory: route.slice(1) }
  }

  // Test route_robot
  console.log("=== Route Robot ===");
  run_robot(VillageState.random(), route_robot, []);

  // Test goal_oriented_robot  
  console.log("=== Goal Oriented Robot ===");
  run_robot(VillageState.random(), goal_oriented_robot, []);

  function compare_robots(robot1, memory1, robot2, memory2) {
    let tasks = 100
    let robot1_total = 0, robot2_total = 0

    for (let i = 0; i < tasks; i++) {
      let state = VillageState.random()

      robot1_total += run_robot(state, robot1, memory1)
      robot2_total += run_robot(state, robot2, memory2)
    }

    let avg1 = Math.round(robot1_total / tasks)
    let avg2 = Math.round(robot2_total / tasks)

    console.log(`Bot 1: ${ avg1 } avg turns`)
    console.log(`Bot 2: ${ avg2 } avg turns`)
  }
  compare_robots(route_robot, [], goal_oriented_robot, [])
  compare_robots(goal_oriented_robot, [], route_robot, [])

  // Ex. 02. bot efficiency
  function lazy_robot({ place, parcels }, route) {
    if (route.length == 0) {
      // Compute routes for every parcel
      let routes = parcels.map(parcel => {
        if (parcel.place != place) {
          return {
            route: find_route(road_graph, place, parcel.place),
            pick_up: true
          }
        } else {
          return {
            route: find_route(road_graph, place, parcel.address),
            pick_up: false
          }
        }
      })

      function score({ route, pick_up }) {
        return (pick_up ? 0.5 : 0) - route.length
      }

      route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route
    }

    return { direction: route[0], memory: route.slice(1) }
  }
  compare_robots(goal_oriented_robot, [], lazy_robot, [])
})()
