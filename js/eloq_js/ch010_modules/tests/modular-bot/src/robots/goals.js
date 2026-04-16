import { road_graph } from "../road-graph/index.js"

export function find_route(graph, from, to) {
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

export function goal_oriented_robot({ place, parcels }, route) {
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
