import { VillageState } from "../road-graph/village-state.js"
import { road_graph } from "../road-graph/index.js"

export function run_robot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      return turn;
    }
    let action = robot(state, memory)
    state = state.move(action.direction)
    memory = action.memory
  }
}

export function compare_robots(robot1, memory1, robot2, memory2, tasks = 100) {
  // let tasks = 100
  let robot1_total = 0, robot2_total = 0

  for (let i = 0; i < tasks; i++) {
    let state = VillageState.random(undefined, road_graph)

    robot1_total += run_robot(state, robot1, memory1)
    robot2_total += run_robot(state, robot2, memory2)
  }

  let avg1 = Math.round(robot1_total / tasks)
  let avg2 = Math.round(robot2_total / tasks)

  console.log(`Bot 1: ${ avg1 } avg turns`)
  console.log(`Bot 2: ${ avg2 } avg turns`)
}
// compare_robots(route_robot, [], goal_oriented_robot, [])
// compare_robots(goal_oriented_robot, [], route_robot, [])