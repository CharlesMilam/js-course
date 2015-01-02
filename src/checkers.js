var board, currentPlayer;
var firstMove = [];

var resetBoard = function () {
  board = [
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    ['wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X '],
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
    [' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ', 'red'],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ']
  ];

  currentPlayer = 'wht';

  $(document).trigger('boardChange');
};

var selectSquare = function(row, col) {
  // select piece to move, this is the first move
  if (firstMove.length === 0) {
    // selected empty square
    if (board[row][col] === ' X ') {
      $(document).trigger('invalidMove', "You selected an empty square.\nSelect one of your pieces.");
    }
    // selected opponent's piece
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
    console.log("Move dists " + moveXDist + " " + moveYDist)
    // select where to move the piece, this is the second move
    if (board[row][col] != " X " || col === firstMove[1] || moveXDist != moveYDist) {
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
        case "wht":
          if (col > firstMove[1]) {
            // valid capture
            if (board[row - 1][col - 1] === "red") {
              $(document).trigger("capture", [row - 1, col - 1]);
              $(document).trigger("validMove", [row, col]);
            }
            // invalid move, jumped own piece
            else if (board[row - 1][col - 1] === "wht") {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot jump your own piece.\nSelect a piece and try again.");
            }
            // invalid move, too many spaces
            else {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
            }
          }
          else if (col < firstMove[1]) {
            // valid capture
            if (board[row - 1][col + 1] === "red") {
              $(document).trigger("capture", [row - 1, col + 1]);
              $(document).trigger("validMove", [row, col]);
            }
            // invalid move, jumped own piece
            else if (board[row - 1][col + 1] === "wht") {
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
        case "red":
          if (col > firstMove[1]) {
            // valid capture
            if (board[row + 1][col - 1] === "wht") {
              $(document).trigger("capture", [row + 1, col - 1]);
              $(document).trigger("validMove", [row, col]);
            }
            // invalid move, jumped own piece
            else if (board[row + 1][col - 1] === "red") {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot jump your own piece.\nSelect a piece and try again.");
            }
            // invalid move, too many spaces
            else {
              firstMove = [];
              $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
            }
          }
          else if (col < firstMove[1]) {
            // valid capture
            if (board[row + 1][col + 1] === "wht") {
              $(document).trigger("capture", [row + 1, col + 1]);
              $(document).trigger("validMove", [row, col]);
            }
            // invalid move, jumped own piece
            else if (board[row + 1][col + 1] === "red") {
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
      // valid move
      $(document).trigger("validMove", [row, col]);
    }
  }
};

var makeMove = function(row, col) {
  var numRow = charToNum[row];
  selectSquare(numRow, col);
};

$(document).on("validMove", function(e, row, col) {
  board[row][col] = currentPlayer;
  board[firstMove[0]][firstMove[1]] = " X ";
  firstMove = [];
  // switch user
  if (currentPlayer === "wht") {
    currentPlayer = "red";
  }
  else {
    currentPlayer = "wht";
  }
  // redisplay board
  $(document).trigger("boardChange");  
});

$(document).on("invalidMove", function(e, error){
  alert(error);
});

$(document).on("capture", function(e, row, col) {
  board[row][col] = " X ";
  alert("Nyah, nyah, all your pieces are belong to us!");
});

$(document).on("boardChange", function(){
  displayBoard();
});
