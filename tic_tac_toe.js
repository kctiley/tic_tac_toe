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

var availableWinPositions = [];
var checkForAvailableWinPosition = function(){
  availableWinPositions = [];
  

  for (var i = 0; i < 3; i++){
    var mkr = " X ";
    var player = "Computer"
    for (var j = 0; j < board[i].length; j++){
      if(board[i][j - 1] && board[i][j + 1]){
        if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j - 1].marker == "[ ]"){
          availableWinPositions.push({position: board[i][j - 1].position, player: player})
        }
      }
      if(board[i][j + 1] && board[i][j + 2]){
        if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j + 2].marker == "[ ]"){
          availableWinPositions.push({position:board[i][j + 2].position, player: player})
        }
      }
      if(board[i][j - 1] && board[i][j + 1]){
        if (board[i][j - 1].marker == mkr && board[i][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
          availableWinPositions.push({position:board[i][j].position, player: player})
        }
      }
      if(board[i - 1] && board[i + 1]){
        if (board[i -1][j].marker == mkr && board[i + 1][j].marker == mkr && board[i][j].marker == "[ ]"){
          availableWinPositions.push({position:board[i][j].position, player: player})
        }
      }
      if(board[i + 1] && board[i + 2]){
        if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i + 2][j].marker == "[ ]"){
          availableWinPositions.push({position:board[i + 2][j].position, player: player})
        }
      }
      if(board[i - 1] && board[i + 1]){
        if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i - 1][j].marker == "[ ]"){
          availableWinPositions.push({position:board[i - 1][j].position, player: player})
        }
      }
    }
  }






  for (var i = 0; i < 3; i++){
    var mkr = " O ";
    var player = "User"
    for (var j = 0; j < board[i].length; j++){
      if(board[i][j - 1] && board[i][j + 1]){
        if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j - 1].marker == "[ ]"){
          availableWinPositions.push({position: board[i][j - 1].position, player: player})
        }
      }
      if(board[i][j + 1] && board[i][j + 2]){
        if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j + 2].marker == "[ ]"){
          availableWinPositions.push({position:board[i][j + 2].position, player: player})
        }
      }
      if(board[i][j - 1] && board[i][j + 1]){
        if (board[i][j - 1].marker == mkr && board[i][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
          availableWinPositions.push({position:board[i][j].position, player: player})
        }
      }
      if(board[i - 1] && board[i + 1]){
        if (board[i -1][j].marker == mkr && board[i + 1][j].marker == mkr && board[i][j].marker == "[ ]"){
          availableWinPositions.push({position:board[i][j].position, player: player})
        }
      }
      if(board[i + 1] && board[i + 2]){
        if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i + 2][j].marker == "[ ]"){
          availableWinPositions.push({position:board[i + 2][j].position, player: player})
        }
      }
      if(board[i - 1] && board[i + 1]){
        if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i - 1][j].marker == "[ ]"){
          availableWinPositions.push({position:board[i - 1][j].position, player: player})
        }
      }
    }
  }


}

var upDateAll = function(position, player){
  movesPlayed++;
  console.log(player + " chooses " + position + ".")
  updateLastMoveData(position, player)
  updateBoard();
  displayBoard();
  updateAvailablePositions();

  if(gameOver == true && winner == "Computer"){
    console.log("Gameover...COMPUTER wins!")
  }
  else if(availablePositions.length == 0 ){
    console.log("Gameover...all positions filled.. TIE")
  }
  else {
    console.log("availablePositions", availablePositions)
    updateCornerChoices()
    // console.log("cornerChoices", cornerChoices)
    updateSideChoices()
    // console.log("sideChoices", sideChoices)
    updateCenterChoice()
    // console.log("centerChoice", centerChoice)
    checkForAvailableWinPosition()
    console.log("availableWinPositions", availableWinPositions.length, availableWinPositions)
    console.log("Move " + (movesPlayed +1))
    nextPlayerGo();
  }
}

var computerSelectPosition = function(){
  if(movesPlayed < 3){
    if(movesPlayed == 2 && centerChoice.length > 0){
      upDateAll(centerChoice[0], "Computer")
    }
    else {
      var selected = cornerChoices[Math.floor(Math.random() * (cornerChoices.length))]
      upDateAll(selected, "Computer");
    } 
    
  }
  else{
    if(availableWinPositions.length > 0){
      var winPositionSelected = false;
      for (var w = 0; w < availableWinPositions.length; w++){
        if(availableWinPositions[w].player == "Computer"){
          winPositionSelected = true;
          selected = availableWinPositions[w].position;
          gameOver = true;
          winner = "Computer";
          alert('winning position found by computer')
        }
        else{
          if(winPositionSelected == false){
            selected = availableWinPositions[w].position
            console.log("**User win move detected: " + selected)
          }
        }
      }
      upDateAll(selected, "Computer")

    }

    else if(cornerChoices.length > 0){
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
  if(movesPlayed > 8){ 
    console.log("in userSelectPosition...gameover");

  }
  else{
    var selected = prompt("Enter a move position");

    var positionAvailable = false
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < board[i].length; j++){
        if (board[i][j].position == selected && board[i][j].marker == "[ ]"){
          positionAvailable = true;
          upDateAll(selected, "User")
        }
      }
    }
    if (positionAvailable == false){
      console.log("position invalid or unavailable");
      userSelectPosition();
    }
  }
}

var nextPlayerGo = function(){
  if(lastMoveData.player == "User"){
    console.log("Computer goes....")
    computerSelectPosition()
  }
  else{
    console.log("User goes....")
    userSelectPosition()
  }
}

var lastMoveData = {};
var gameOver = false;
var winner = "";


// Begin game play
displayBoard()
console.log('Computer will move first...Move 1')
computerSelectPosition()

