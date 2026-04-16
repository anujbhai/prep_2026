import { roads } from "./roads.js"
import { build_graph } from "./graph.js"

export { VillageState } from "./village-state.js"
export { build_graph, roads }

export const road_graph = build_graph(roads)
