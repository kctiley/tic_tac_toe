// Initial Values
var allOptions = [];
var cornerChoices = [];
var sideChoices = [];
var centerChoice = [];
var lastPlayData ={};
var moveLog = [];

// Board 
var board = [
  [{position:"top-left", marker:"[ ]", category: "corner"},{position:"top-center", marker:"[ ]", category: "side"},{position:"top-right", marker:"[ ]", category: "corner"}],
  [{position:"mid-left", marker:"[ ]", category: "side"},{position:"mid-center", marker:"[ ]", category: "center"},{position:"mid-right", marker:"[ ]", category: "side"}],
  [{position:"bot-left", marker:"[ ]", category: "corner"},{position:"bot-center", marker:"[ ]", category: "side"},{position:"bot-right", marker:"[ ]", category: "corner"}]
]

var updateChoices = function(){
  allOptions = [];
  cornerChoices = [];
  sideChoices = [];
  centerChoice = [];
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (board[i][j].marker == "[ ]"){
        if(board[i][j].category == 'corner'){
          cornerChoices.push(board[i][j]);
          allOptions.push(board[i][j]);
        }
        if(board[i][j].category == 'side'){
          sideChoices.push(board[i][j]);
          allOptions.push(board[i][j]);
        }
        if(board[i][j].category == 'center'){
          centerChoice.push(board[i][j]);
          allOptions.push(board[i][j]);
        }
      }
    }
  }
}

// Displays
var showBoard = function(){
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

var showOptions = function(){
  var positions = [];
  allOptions.forEach(function(each){
    positions.push(each.position);
  })
  console.log(positions);
}

// Move Logic
var nextPlayerGo =function(player){
  player == "Computer" ? userMove() : computerMove;
}

var computerMove = function(){
  // Scenario 1st move go to any corner
  var selected = cornerChoices[Math.floor(Math.random()* corners.length)];
  selected.marker = " X ";
  updateAll(selected,"Computer")
}

var userMove = function(){
  var selected;
  var validMove = false;
  var position = prompt('Enter a position for your move');
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (board[i][j].marker == "[ ]" && board[i][j].position == position){
        selected = board[i][j];
        selected.marker = " O ";
        validMove = true;
      }
    }
  }
  validMove == true ? updateAll(selected, "User") : console.log("INVALID SELECTION")
}

// Updates
var updateMoveLog = function(selected, player){
  lastPlayData.move = selected;
  lastPlayData.player = player;
  moveLog.push(lastPlayData);
}

var updateAll = function(position, player){
  updateMoveLog(position, player);
  console.log("\n");
  console.log("Begin move #",moveLog.length);
  console.log(moveLog[moveLog.length - 1].player + " chose " + moveLog[moveLog.length - 1].move.position);
  console.log("Last play data: ",lastPlayData);
  updateChoices();
  showOptions();
  console.log("\n");
  showBoard();

  allOptions.length > 0 ? nextPlayerGo(player) : console.log("Gameover...no more options")
}


// Game Play
console.log("\n")
console.log("\n")
console.log("*********GAME START*****************")
showBoard()
updateChoices()
console.log("Computer will go first..")
console.log("\n")
computerMove()