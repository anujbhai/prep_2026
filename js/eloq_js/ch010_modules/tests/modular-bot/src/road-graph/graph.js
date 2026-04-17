export function build_graph(edges) {
  let graph = Object.create(null)

  function add_edge(from, to) {
    // if (from in graph) {
    if (graph[from]) { // slightly faster
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
