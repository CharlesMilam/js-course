var board, currentPlayer;
var firstMove = [];

var resetBoard = function () {
  board = [
    ['empty', 'white', 'empty', 'white', 'empty', 'white', 'empty', 'white'],
    ['white', 'empty', 'white', 'empty', 'white', 'empty', 'white', 'empty'],
    ['empty', 'white', 'empty', 'white', 'empty', 'white', 'empty', 'white'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['red  ', 'empty', 'red  ', 'empty', 'red  ', 'empty', 'red  ', 'empty'],
    ['empty', 'red  ', 'empty', 'red  ', 'empty', 'red  ', 'empty', 'red  '],
    ['red  ', 'empty', 'red  ', 'empty', 'red  ', 'empty', 'red  ', 'empty']
  ];

  currentPlayer = 'white';

  $(document).trigger('boardChange');
};

var selectSquare = function(row, col) {
  // select piece to move, this is the first move
  if (firstMove.length === 0) {
    // invalid piece, selected empty square
    if (board[row][col] === 'empty') {
      $(document).trigger('invalidMove', "You selected an empty square.\nSelect one of your pieces.");
    }
    // invalid piece, selected opponent's piece
    else if (board[row][col] != currentPlayer) {
      $(document).trigger("invalidMove", "You selected an opponent's piece.\nSelect one of your pieces.");
    }
    // valid piece
    else {
      firstMove = [row, col];
    }
  }
  else {
    // assign distances moved X & Y coords
    var moveXDist = Math.abs(col - firstMove[1]);
    var moveYDist = Math.abs(row - firstMove[0]);
    
    // select where to move the piece, this is the second move
    if (board[row][col] != "empty" || col === firstMove[1] || moveXDist != moveYDist) {
      // invalid move, not empty square or not a diagonal move
      firstMove = [];
      $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
    }
    else if (moveXDist > 2 || moveYDist > 2) {
      // invalid move, too many squares
      firstMove = [];
      $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
    }
    else if (moveXDist === 2 && moveYDist === 2) {
      // check for capture, else invalid move
      switch (currentPlayer) {
        case "white":
          // diagonal move to the right
          if (col > firstMove[1]) {
            // valid capture
            if (board[row - 1][col - 1] === "red  ") {
              $(document).trigger("capture", [row - 1, col - 1]);
              $(document).trigger("validMove", [row, col]);
            }
            // invalid move, jumped own piece
            else if (board[row - 1][col - 1] === "white") {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot jump your own piece.\nSelect a piece and try again.");
            }
            // invalid move, too many spaces
            else {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
            }
          }
          // diagonal move to the left
          else if (col < firstMove[1]) {
            // valid capture
            if (board[row - 1][col + 1] === "red  ") {
              $(document).trigger("capture", [row - 1, col + 1]);
              $(document).trigger("validMove", [row, col]);
            }
            // invalid move, jumped own piece
            else if (board[row - 1][col + 1] === "white") {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot jump your own piece.\nSelect a piece and try again.");
            }
            // invalid move, too many spaces
            else {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
            } 
          }
          break;
        case "red  ":
          // diagonal move to the right
          if (col > firstMove[1]) {
            // valid capture
            if (board[row + 1][col - 1] === "white") {
              $(document).trigger("capture", [row + 1, col - 1]);
              $(document).trigger("validMove", [row, col]);
            }
            // invalid move, jumped own piece
            else if (board[row + 1][col - 1] === "red  ") {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot jump your own piece.\nSelect a piece and try again.");
            }
            // invalid move, too many spaces
            else {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
            }
          }
          // diagonal move to the left
          else if (col < firstMove[1]) {
            // valid capture
            if (board[row + 1][col + 1] === "white") {
              $(document).trigger("capture", [row + 1, col + 1]);
              $(document).trigger("validMove", [row, col]);
            }
            // invalid move, jumped own piece
            else if (board[row + 1][col + 1] === "red  ") {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot jump your own piece.\nSelect a piece and try again.");
            }
            // invalid move, too many spaces
            else {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
            } 
          }
          break;
      }
    }
    else {
      // valid move, no capture
      $(document).trigger("validMove", [row, col]);
    }
  }
};

// user friendly move function, uses letter column, number row
var makeMove = function(row, col) {
  var numRow = charToNum[row];
  selectSquare(numRow, col);
};

// valid move event handler
$(document).on("validMove", function(e, row, col) {
  // mark board with new move, and clear previous square
  board[row][col] = currentPlayer;
  board[firstMove[0]][firstMove[1]] = "empty";
  // reset the first move
  firstMove = [];
  // switch user
  if (currentPlayer === "white") {
    currentPlayer = "red  ";
  }
  else {
    currentPlayer = "white";
  }
  // redisplay board
  $(document).trigger("boardChange");  
});

// invalid move event handler
$(document).on("invalidMove", function(e, error){
  alert(error);
});

// piece capture event handler, with taunt
$(document).on("capture", function(e, row, col) {
  board[row][col] = "empty";
  alert("Nyah, nyah, all your pieces are belong to us!");
});

// board change event handler
$(document).on("boardChange", function(){
  // call to displayBoard of driver
  displayBoard();
});

// on click event handler for start button
$(document).on("click", ".start", function() {
  resetBoard();
});

// on click handler for squares
$(document).on("click", ".col", function() {
  row = charToNum[this.dataset.row];
  col = parseInt(this.dataset.col);
  
  selectSquare(row, col);
});
