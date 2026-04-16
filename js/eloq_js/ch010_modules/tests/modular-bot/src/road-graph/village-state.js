export class VillageState {
  constructor(place, parcels, road_graph) {
    this.place = place
    this.parcels = parcels
    this.road_graph = road_graph
  }

  move(destination) {
    if (!this.road_graph[this.place].includes(destination)) {
      return this
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place !== this.place) return p

        return { place: destination, address: p.address }
      }).filter(p => p.place != p.address)

      return new VillageState(destination, parcels, this.road_graph)
    }
  }

  static random(parcel_count = 5, road_graph) {
    let parcels = []

    for (let i = 0; i < parcel_count; i++) {
      let address = random_pick(Object.keys(road_graph))
      let place
      do {
        place =  random_pick(Object.keys(road_graph))
      } while (place == address)
      parcels.push({ place, address })
    }

    return new VillageState("Post Office", parcels, road_graph)
  }
}

function random_pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
