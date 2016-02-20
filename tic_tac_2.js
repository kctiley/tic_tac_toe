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
  player == "Computer" ? userMove() : computerMove();
}

var computerMove = function(){
  var updateThis = function(){
    // Submit choice
    moveData.marker = " X ";
    moveData.player = "Computer";
    updateAll(moveData)
  }
  var moveData ;
  // Scenario 1st move: Choose a corner
  if(moveLog.length < 1){
    moveData = cornerChoices[Math.floor(Math.random()* corners.length)];
    updateThis();
  }
  // Scenario 3rd move: 
  if(moveLog.length == 2){
    var move1 = moveLog[moveLog.length - 2]
    var move2 = moveLog[moveLog.length - 1]
    // Scenario move O moved to adjacent side of X
    // Scenario 1st top-left 2nd top-center
    if(move1.coords.i == 0 && move2.coords.i == 0 && move1.coords.j == 0 && move2.coords.j == 1){
      moveData = board[2][0];
      updateThis();
    }
    // Scenario 1st top-left 2nd mid-left
    else if(move1.coords.i == 0 && move2.coords.i == 1 && move1.coords.j == 0 && move2.coords.j == 0){
      moveData = board[0][2];
      updateThis();
    }
    // Scenario 1st bot-left 2nd bot-center
    else if(move1.coords.i == 2 && move2.coords.i  == 2 && move1.coords.j == 0 && move2.coords.j == 1){
      moveData = board[0][0];
      updateThis();
    }
    // Scenario 1st bot-left 2nd mid-left
    else if(move1.coords.i == 2 && move2.coords.i  == 1 && move1.coords.j == 0 && move2.coords.j == 0){
      moveData = board[2][2];
      updateThis();
    }
    // Scenario 1st top-right 2nd top-center
    else if(move1.coords.i == 0 && move2.coords.i == 0 && move1.coords.j == 2 && move2.coords.j == 1){
      moveData = board[2][2];
      updateThis();
    }
    // Scenario 1st top-right 2nd mid-right
    else if(move1.coords.i == 0 && move2.coords.i == 1 && move1.coords.j == 2 && move2.coords.j == 2){
      moveData = board[0][0];
      updateThis();
    }
    // Scenario 1st bot-right 2nd bot-center
    else if(move1.coords.i == 2 && move2.coords.i == 2 && move1.coords.j == 2 && move2.coords.j == 1){
      moveData = board[0][2];
      updateThis();
    }
    // Scenario 1st bot-right 2nd mid-right
    else if(move1.coords.i == 2 && move2.coords.i == 1 && move1.coords.j == 2 && move2.coords.j == 2){
      moveData = board[2][0];
      updateThis();
    }
    // 2nd move was not a side move
    else {
      console.log("2nd move was not a side move")
    }
  }
  // Scenario 5th move:
  console.log("5th move not coded")


  
}

var userMove = function(){
  var moveData;
  var validMove = false;
  var position = prompt('Enter a position for your move');

  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (board[i][j].marker == "[ ]" && board[i][j].position == position){
        moveData = board[i][j];
        moveData.marker = " O ";
        moveData.player = "User";
        moveData.coords = {i : "", j : ""};
        moveData.coords.i = i;
        moveData.coords.j = j;
        validMove = true;
      }
    }
  }
  validMove == true ? updateAll(moveData) : console.log("INVALID SELECTION")
}

// Updates
var updateMoveLog = function(moveData){
  lastPlayData = moveData;
  if(!lastPlayData.coords){
    lastPlayData.coords = {i : "", j : ""};
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        if (moveData.position == board[i][j].position){
          lastPlayData.coords.i = i;
          lastPlayData.coords.j = j;
        }
      }
    }
  }
  moveLog.push(lastPlayData);
}

var updateAll = function(moveData){
  updateMoveLog(moveData);
  console.log("\n");
  console.log("Begin move #", moveLog.length);
  console.log(moveLog[moveLog.length - 1].player + " chose " + moveLog[moveLog.length - 1].position);
  console.log("Last play data: ", lastPlayData);
  updateChoices();
  showOptions();
  console.log("\n");
  showBoard();

  allOptions.length > 0 ? nextPlayerGo(moveData.player) : console.log("Gameover...no more options")
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