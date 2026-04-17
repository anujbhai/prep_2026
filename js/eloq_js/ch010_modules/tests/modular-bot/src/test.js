import { roads } from "./road-graph/roads.js"
import { road_graph } from "./road-graph/road-graph.js"

console.log("Placees:", Object.keys(road_graph))
console.log("Roads:", roads.length)
console.log("Alice's connections:", road_graph["Alice's House"])
