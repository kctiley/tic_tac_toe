console.log('Tic Tac Toe is ready!')

var board = [
  [{position:"top-left", marker:"[ ]"},{position:"top-center", marker:"[ ]"},{position:"top-right",marker:"[ ]"}],
  [{position:"mid-left", marker:"[ ]"},{position:"mid-center", marker:"[ ]"},{position:"mid-right",marker:"[ ]"}],
  [{position:"bot-left", marker:"[ ]"},{position:"bot-center", marker:"[ ]"},{position:"bot-right",marker:"[ ]"}]
];

var displayBoard = function(){
  var row = "";
  var rowName = ["top", "mid", "bot"]
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < board[i].length; j++){
      row += board[i][j].marker;
    }
    console.log(row, rowName[i])
    row = "";
  }
  console.log(" l ", "cen", " r ")
}

var displayOptions = function(){
  var row = "";
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < board[i].length; j++){
      if (board[i][j].marker == "[ ]"){
        row += board[i][j].position + " ";
      }
    }
  }
  console.log("Your options are: " + row)
}

var movesPlayed = 0;
var currentPlayer = "Computer"; 

var computerSelectPosition = function(){
  var cornerChoices = ["top-left", "top-right", "bot-left", "bot-right"]
  if(movesPlayed === 0){
    lastMoveData.position = cornerChoices[Math.floor(Math.random() * (cornerChoices.length))]
    var index = cornerChoices.indexOf(lastMoveData.position);
    if (index > -1) {
        cornerChoices.splice(index, 1);
    }
    lastMoveData.currentPlayer = "Computer";
    updateBoard()
    userSelectPosition()
  }
  else{
    console.log("New corner choices", cornerChoices)
  }

}

var userSelectPosition = function(){
  var selected = prompt("Enter a move position");

  var positionAvailable = false
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < board[i].length; j++){
      if (board[i][j].position == selected && board[i][j].marker == "[ ]"){
        positionAvailable = true;
        lastMoveData.currentPlayer = "User";
        lastMoveData.position = selected;
        updateBoard()
      }
    }
  }
  if (positionAvailable == false){
    console.log("position invalid or unavailable");
    userSelectPosition();
  }
}

var gameOver = false;

var updateBoard = function(){
  console.log(lastMoveData.currentPlayer + " selected " + lastMoveData.position + ".")

  if(gameOver == true){
    console.log("The winner is...")
  }
  else{
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < board[i].length; j++){
        if (board[i][j].position == lastMoveData.position && lastMoveData.currentPlayer == "Computer"){
          board[i][j].marker = " X ";
        }
        if (board[i][j].position == lastMoveData.position && lastMoveData.currentPlayer == "User"){
          board[i][j].marker = " O ";
        }
      }
    }
    displayBoard()
    displayOptions()
  }
}

var lastMoveData = { by: "none", position: "none"}

// Begin game play
displayBoard()
console.log('Computer will move first...')
computerSelectPosition()

