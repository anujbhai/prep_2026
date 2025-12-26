const chessboard = function(n) {
  let board = ""
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if ((i + j) % 2 !== 0) {
        board += "#"
      }

      board += " "
    }

    board += "\n"
  }

  console.log(board)
}
chessboard(8)

