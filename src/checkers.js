var board, currentPlayer, firstMove;

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
  if (board[row][col] === ' X ') {
    $(document).trigger('invalidMove', "You selected an empty spot.");
  }
  else if (board[row][col] != currentPlayer) {
    $(document).trigger("invalidMove", "You selected an opponent's piece.");
  }
  else {
    firstMove = [row, col];
  }
};

$(document).on("invalidMove", function(e, error){
  alert(error);
});
