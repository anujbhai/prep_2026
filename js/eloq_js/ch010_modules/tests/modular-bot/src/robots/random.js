import { road_graph } from "../road-graph/index.js"

export function random_pick(arr) {
  let choice = Math.floor(Math.random() * arr.length)
  return arr[choice]
}

export function random_robot(state) {
  return { direction: random_pick(road_graph[state.place]) }
}