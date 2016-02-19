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


var updateBoard = function(){
  if(gameOver == true){
    console.log("The winner is...")
  }
  else{
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < board[i].length; j++){
        if (board[i][j].position == lastMoveData.position && lastMoveData.player == "Computer"){
          board[i][j].marker = " X ";
        }
        if (board[i][j].position == lastMoveData.position && lastMoveData.player == "User"){
          board[i][j].marker = " O ";
        }
      }
    }
  }
}

var movesPlayed = 0;
var currentPlayer = "Computer";
var cornerChoices = ["top-left", "top-right", "bot-left", "bot-right"]
var sideChoices = ["mid-left", "mid-right", "top-center", "bot-center"]
var centerChoice = ["mid-center"]

var availablePositions = [];

var updateAvailablePositions = function(){
  availablePositions = [];
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < board[i].length; j++){
      if (board[i][j].marker == "[ ]"){
        availablePositions.push(board[i][j].position)
      }
    }
  }
}

var updateCornerChoices = function(){
  var index = cornerChoices.indexOf(lastMoveData.position);
  if (index > -1) {
      cornerChoices.splice(index, 1);
  }
}

var updateSideChoices = function(position){
  var index = sideChoices.indexOf(lastMoveData.position);
  if (index > -1) {
      sideChoices.splice(index, 1);
  }
}

var updateCenterChoice = function(position){
  var index = centerChoice.indexOf(lastMoveData.position);
  if (index > -1) {
      centerChoice.splice(index, 1);
  }
}

var updateLastMoveData = function(position, player){
  lastMoveData.position = position;
  lastMoveData.player = player;
}

var upDateAll = function(position, player){
  movesPlayed++
  if(movesPlayed == 9){
    return "game over...tie"
  }
  updateLastMoveData(position, player)
  console.log("lastMoveData", lastMoveData)
  console.log("Updating board...")
  updateBoard()
  console.log("Displaying board...")
  displayBoard()
  updateAvailablePositions()
  console.log("availablePositions", availablePositions)
  updateCornerChoices()
  console.log("cornerChoices", cornerChoices)
  updateSideChoices()
  console.log("sideChoices", sideChoices)
  updateCenterChoice()
  console.log("centerChoice", centerChoice)
  nextPlayerGo();
}

var computerSelectPosition = function(){
  if(movesPlayed == 0){
    var selected = cornerChoices[Math.floor(Math.random() * (cornerChoices.length))]
    upDateAll(selected, "Computer");
    
  }
  else{
    if(cornerChoices.length > 0){
      var selected = cornerChoices[Math.floor(Math.random() * (cornerChoices.length))]
      upDateAll(selected, "Computer")
    }
    else if(centerChoice.length > 0){
      var selected = centerChoice[0]
      upDateAll(selected, "Computer")
    }
    else if (sideChoices.length > 0){
      var selected = sideChoices[Math.floor(Math.random() * (cornerChoices.length))]
      upDateAll(selected, "Computer")
    }
    else{
      console.log("No spaces left")
    }
  }

}

var userSelectPosition = function(){
  var selected = prompt("Enter a move position");

  var positionAvailable = false
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < board[i].length; j++){
      if (board[i][j].position == selected && board[i][j].marker == "[ ]"){
        positionAvailable = true;
        lastMoveData.player = "User";
        lastMoveData.position = selected;
        upDateAll(selected, "User")
        nextPlayerGo()
      }
    }
  }
  if (positionAvailable == false){
    console.log("position invalid or unavailable");
    nextPlayerGo();
  }
}

var nextPlayerGo = function(){
  if(lastMoveData.player == "User"){
    computerSelectPosition()
  }
  else{
    userSelectPosition()
  }
}

var lastMoveData = {};
var gameOver = false;


// Begin game play
displayBoard()
console.log('Computer will move first...')
computerSelectPosition()

