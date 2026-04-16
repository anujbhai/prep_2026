import { run_robot, compare_robots } from "./simulation/runner.js"
import { random_robot } from "./robots/random.js"
import { route_robot } from "./robots/route.js"
import { goal_oriented_robot } from "./robots/goals.js"
import { VillageState } from "./road-graph/village-state.js"

console.log("Random vs Route:")
compare_robots(random_robot, [], route_robot, [])

console.log("\nRoute vs Goal Oriented:")
compare_robots(route_robot, [], goal_oriented_robot, [])
