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
  function run_robot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Done in ${ turn } turns`)
        break
      }

      let action = robot(state, memory)
      state = state.move(action.direction)
      memory = action.memory
      console.log(`Moved to ${ action.direction }`)
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
})()
