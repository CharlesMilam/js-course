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
    if (board[row][col] === ' X ') {
      $(document).trigger('invalidMove', "You selected an empty spot.");
    }
    else if (board[row][col] != currentPlayer) {
      $(document).trigger("invalidMove", "You selected an opponent's piece.");
    }
    else {
      firstMove = [row, col];
    }
  }
  else {
    // select where to move the piece, this is the second move
    if (board[row][col] != " X ") {
      // invalid move, not an empty square
      firstMove = [];
      $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
    }
    else if (col === firstMove[1]) {
      // invalide move, not diagonal
      firstMove = [];
      $(document).trigger("invalidMove", "You cannot place your piece there.\nSelect a piece and try again.");
    }
    else {
      // valid move
      board[row][col] = currentPlayer;
      board[firstMove[0]][firstMove[1]] = " X ";
      firstMove = [];
      $(document).trigger("boardChange");
    }
  }
};

var makeMove = function(row, col) {
  var numRow = charToNum[row];
  selectSquare(numRow, col);
};

$(document).on("invalidMove", function(e, error){
  alert(error);
});
