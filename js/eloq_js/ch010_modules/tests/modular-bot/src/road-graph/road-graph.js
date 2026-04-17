import { build_graph } from "./graph.js"
import { roads } from "./roads.js"

export const road_graph = build_graph(roads)

export { build_graph, roads }
