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
  var backColor = "red";
  var row, square;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      switch (board[i][j]) {
        case "empty":
          row = document.getElementsByClassName("row-" + numToChar[i]); 
          square = row[0].getElementsByClassName("col-" + j.toString()); 
          
          square[0].classList.remove("white");
          square[0].classList.remove("red");
          square[0].classList.remove("piece");
          square[0].classList.add("empty");
          
          // if (backColor === "red") {
          //   backColor = "black";
          // }
          // else {
          //   backColor = "red";
          // }
          // square[0].setAttribute("background-color", backColor);
          break;
        case "white":
          row = document.getElementsByClassName("row-" + numToChar[i]); 
          square = row[0].getElementsByClassName("col-" + j.toString()); 
          
          square[0].classList.remove("red");
          square[0].classList.remove("empty");
          square[0].classList.add("white");
          square[0].classList.add("piece");
          
          // if (backColor === "red") {
          //   backColor = "black";
          // }
          // else {
          //   backColor = "red";
          // }
          // square[0].setAttribute("background-color", backColor);
          break;
        case "red  ":
          row = document.getElementsByClassName("row-" + numToChar[i]); 
          square = row[0].getElementsByClassName("col-" + j.toString()); 
          
          square[0].classList.remove("white");
          square[0].classList.remove("empty");
          square[0].classList.add("red");
          square[0].classList.add("piece");
          
          // if (backColor === "red") {
          //   backColor = "black";
          // }
          // else {
          //   backColor = "red";
          // }
          // square[0].setAttribute("background-color", backColor);
          break;
      }
    };
  }
}