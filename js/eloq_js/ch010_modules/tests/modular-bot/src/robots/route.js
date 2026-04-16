import { road_graph } from "../road-graph/index.js"

// Mail truck's route (improving robots efficiency)
export const mail_route = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House", "Town Hall", "Daria's House", "Ernie's House", "Grete's House", "Shop", "Grete's House", "Farm", "Marketplace", "Post Office"
]

export function route_robot(state, memory) {
  if (memory.length == 0) {
    memory = mail_route
  }

  return { direction: memory[0], memory: memory.slice(1) }
}
