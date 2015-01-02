var numToChar = ["a", "b", "c", "d", "e", "f", "g", "h"];
var charToNum = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
}

var displayBoard = function() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      //console.log(board[i][j]);
      switch (board[i][j]) {
        case "empty":
          console.log("empty");
          break;
        case "white":
          console.log("white");
          break;
        case "red  ":
          console.log("red");
          break;
      }
    };
  }
}