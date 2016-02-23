// Initial Values
var allOptions = [];
var cornerChoices = [];
var sideChoices = [];
var centerChoice = [];
var lastPlayData ={};
var moveLog = [];
var computerWon = false;
var secondMove = "";
var availableWinPositions = [];
var checkForAvailableWinPosition;

// Board 
var board = [
  [{position:"top-left", marker:"[ ]", category: "corner"},{position:"top-center", marker:"[ ]", category: "side"},{position:"top-right", marker:"[ ]", category: "corner"}],
  [{position:"mid-left", marker:"[ ]", category: "side"},{position:"mid-center", marker:"[ ]", category: "center"},{position:"mid-right", marker:"[ ]", category: "side"}],
  [{position:"bot-left", marker:"[ ]", category: "corner"},{position:"bot-center", marker:"[ ]", category: "side"},{position:"bot-right", marker:"[ ]", category: "corner"}]
]


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

var showWinMoves = function(){
  console.log("Win move: ")
  console.log(availableWinPositions)
}

// Move Logic
var nextPlayerGo =function(player){
  player == "Computer" ? userMove() : computerMove();
}

var computerMove = function(){
  var moveData = {marker: "", player: ""};
  var updateThis = function(){
    // Submit choice
    moveData.marker = " X ";
    moveData.player = "Computer";
    checkForAvailableWinPosition();
    updateAll(moveData)
  }

  var selectAnyAvailableCorner = function(){
    return cornerChoices[Math.floor(Math.random() * cornerChoices.length)];
  }

  // Select killmove if exists for either player
  checkForAvailableWinPosition = function(){
    availableWinPositions = [];

    for (var i = 0; i < 3; i++){
      var mkr = " X ";
      for (var j = 0; j < board[i].length; j++){

        // horizontal detection
        if(board[i][j - 1] && board[i][j + 1]){
          if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j - 1].marker == "[ ]"){
            board[i][j - 1].computerKillSpot = true;
            availableWinPositions.push(board[i][j - 1])
          }
        }
        if(board[i][j + 1] && board[i][j + 2]){
          if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j + 2].marker == "[ ]"){
            board[i][j + 2].computerKillSpot = true;
            availableWinPositions.push(board[i][j + 2])
          }
        }
        if(board[i][j - 1] && board[i][j + 1]){
          if (board[i][j - 1].marker == mkr && board[i][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
            board[i][j].computerKillSpot = true;
            availableWinPositions.push(board[i][j])
          }
        }
        // vertical detection
        //vert-mid
        if(board[i - 1] && board[i + 1]){
          if (board[i -1][j].marker == mkr && board[i + 1][j].marker == mkr && board[i][j].marker == "[ ]"){
            board[i][j].computerKillSpot = true;
            availableWinPositions.push(board[i][j])
          }
        }
        //vert-bot
        if(board[i + 1] && board[i + 2]){
          if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i + 2][j].marker == "[ ]"){
            board[i + 2][j].computerKillSpot = true;
            availableWinPositions.push(board[i + 2][j])
          }
        }
        //vert-top
        if(board[i - 1] && board[i + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i - 1][j].marker == "[ ]"){
            board[i - 1][j].computerKillSpot = true;
            availableWinPositions.push(board[i - 1][j])
          }
        }


        // diagonal detection
        // start top left  mid-center
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i - 1][j - 1].marker == mkr && board[i + 1][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
            board[i][j].computerKillSpot = true;
            availableWinPositions.push(board[i][j])
          }
        }
        // start top left  top-left
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j + 1].marker == mkr && board[i - 1][j - 1].marker == "[ ]"){
            board[i - 1][j - 1].computerKillSpot = true;
            availableWinPositions.push(board[i - 1][j - 1])
          }
        }
        // start top left  bot-right
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i - 1][j - 1].marker == mkr && board[i][j].marker == mkr && board[i + 1][j + 1].marker == "[ ]"){
            board[i + 1][j + 1].computerKillSpot = true;
            availableWinPositions.push(board[i + 1][j + 1])
          }
        }
        // start top right  mid-center
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i - 1][j + 1].marker == mkr && board[i + 1][j - 1].marker == mkr && board[i][j].marker == "[ ]"){
            board[i][j].computerKillSpot = true;
            availableWinPositions.push(board[i][j])
          }
        }
        // start top right  top-right
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j - 1].marker == mkr && board[i - 1][j + 1].marker == "[ ]"){
            board[i - 1][j + 1].computerKillSpot = true;
            availableWinPositions.push(board[i - 1][j + 1])
          }
        }
        // start top right  bot-left
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i][j].marker == mkr && board[i - 1][j + 1].marker == mkr && board[i + 1][j - 1].marker == "[ ]"){
            board[i + 1][j - 1].computerKillSpot = true;
            availableWinPositions.push(board[i + 1][j - 1])
          }
        }
      }
    }
// **************************************
    for (var i = 0; i < 3; i++){
      var mkr = " O ";
      for (var j = 0; j < board[i].length; j++){
        // horizontal detection
        if(board[i][j - 1] && board[i][j + 1]){
          if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j - 1].marker == "[ ]"){
            board[i][j - 1].userKillSpot = true;
            availableWinPositions.push(board[i][j - 1])
          }
        }
        if(board[i][j + 1] && board[i][j + 2]){
          if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j + 2].marker == "[ ]"){
            board[i][j + 2].userKillSpot = true;
            availableWinPositions.push(board[i][j + 2])
          }
        }
        if(board[i][j - 1] && board[i][j + 1]){
          if (board[i][j - 1].marker == mkr && board[i][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
            board[i][j].userKillSpot = true;
            availableWinPositions.push(board[i][j])
          }
        }
        // vertical detection
        //vert-mid
        if(board[i - 1] && board[i + 1]){
          if (board[i - 1][j].marker == mkr && board[i + 1][j].marker == mkr && board[i][j].marker == "[ ]"){
            board[i][j].userKillSpot = true;
            availableWinPositions.push(board[i][j])
          }
        }
        //vert-bot
        if(board[i + 1] && board[i + 2]){
          if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i + 2][j].marker == "[ ]"){
            board[i + 2][j].userKillSpot = true;
            availableWinPositions.push(board[i + 2][j])
          }
        }
        //vert-top
        if(board[i - 1] && board[i + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i - 1][j].marker == "[ ]"){
            board[i - 1][j].userKillSpot = true;
            availableWinPositions.push(board[i - 1][j])
          }
        }
        // diagonal detection
        // start top left  mid-center
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i - 1][j - 1].marker == mkr && board[i + 1][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
            board[i][j].userKillSpot = true;
            availableWinPositions.push(board[i][j])
          }
        }
        // start top left  top-left
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j + 1].marker == mkr && board[i - 1][j - 1].marker == "[ ]"){
            board[i - 1][j - 1].userKillSpot = true;
            availableWinPositions.push(board[i - 1][j - 1])
          }
        }
        // start top left  bot-right
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i - 1][j - 1].marker == mkr && board[i][j].marker == mkr && board[i + 1][j + 1].marker == "[ ]"){
            board[i + 1][j +1].userKillSpot = true;
            availableWinPositions.push(board[i + 1][j + 1])
          }
        }
        // start top right  mid-center
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i - 1][j + 1].marker == mkr && board[i + 1][j - 1].marker == mkr && board[i][j].marker == "[ ]"){
            board[i][j].userKillSpot = true;
            availableWinPositions.push(board[i][j])
          }
        }
        // start top right  top-right
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j - 1].marker == mkr && board[i - 1][j + 1].marker == "[ ]"){
            board[i - 1][j + 1].userKillSpot = true;
            availableWinPositions.push(board[i - 1][j + 1])
          }
        }
        // start top right  bot-left
        if(board[i - 1] && board[i + 1] && board[i - 1][j - 1] && board[i + 1][j + 1]){
          if (board[i][j].marker == mkr && board[i - 1][j + 1].marker == mkr && board[i + 1][j - 1].marker == "[ ]"){
            board[i + 1][j - 1].userKillSpot = true;
            availableWinPositions.push(board[i + 1][j - 1])
          }
        }
      }
    }

  }


  // Scenario 1st move Computer: Choose a corner
  if(moveLog.length < 1){
    moveData = cornerChoices[Math.floor(Math.random()* cornerChoices.length)];
    updateThis();
  }
  // Scenario 3rd move: 
  else if(moveLog[0].player == "Computer" && moveLog.length == 2){
    var move1 = moveLog[moveLog.length - 2];
    var move2 = moveLog[moveLog.length - 1];
    var selectFarCorner = function(){
      if(move1.coords.i == 0 && move1.coords.j == 0){
        moveData = board[2][2];
      }
      if(move1.coords.i == 0 && move1.coords.j == 2){
        moveData = board[2][0];
      }
      if(move1.coords.i == 2 && move1.coords.j == 2){
        moveData = board[0][0];
      }
      if(move1.coords.i == 2 && move1.coords.j == 0){
        moveData = board[0][2];
      }
    }
    var ifSecondMoveFarCorner = function(){
      if(move1.coords.i == 0 && move1.coords.j == 0 && move2.coords.i == 2 && move2.coords.j == 2){
        moveData = selectAnyAvailableCorner();
        secondMove = "farCorner";
      }
      if(move1.coords.i == 0 && move1.coords.j == 2 && move2.coords.i == 2 && move2.coords.j == 0){
        moveData = selectAnyAvailableCorner();
        secondMove = "farCorner";
      }
      if(move1.coords.i == 2 && move1.coords.j == 2 && move2.coords.i == 0 && move2.coords.j == 0){
        moveData = selectAnyAvailableCorner();
        secondMove = "farCorner";
      }
      if(move1.coords.i == 2 && move1.coords.j == 0 && move2.coords.i == 0 && move2.coords.j == 2){
        moveData = selectAnyAvailableCorner();
        secondMove = "farCorner";
      }
    }
    var ifSecondMoveFarSides = function(){
      if(secondMove !== "adjacent"){
        sideChoices.forEach(function(side){
          if(move2.position == side.position){
            moveData = side;
            secondMove = "farSide";  
          }
        })
      }
    }

    // O moves center X moves to far corner
    if(move2.position == "mid-center"){
      secondMove = "center";
      selectFarCorner();
      updateThis();
    }
    // Scenario move O moved to adjacent side of X
    // Scenario 1st top-left 2nd top-center
    else if(move1.coords.i == 0 && move2.coords.i == 0 && move1.coords.j == 0 && move2.coords.j == 1){
      moveData = board[2][0];
      secondMove = "adjacent";
      updateThis();
    }
    // Scenario 1st bot-right 2nd mid-right
    else if(move1.coords.i == 2 && move2.coords.i == 1 && move1.coords.j == 2 && move2.coords.j == 2){
      secondMove = "adjacent";
      moveData = board[2][0];
      updateThis();
    }
    // Scenario 1st top-left 2nd mid-left
    else if(move1.coords.i == 0 && move2.coords.i == 1 && move1.coords.j == 0 && move2.coords.j == 0){
      secondMove = "adjacent";
      moveData = board[0][2];
      updateThis();
    }
    // Scenario 1st bot-right 2nd bot-center
    else if(move1.coords.i == 2 && move2.coords.i == 2 && move1.coords.j == 2 && move2.coords.j == 1){
      secondMove = "adjacent";
      moveData = board[0][2];
      updateThis();
    }
    // Scenario 1st bot-left 2nd bot-center
    else if(move1.coords.i == 2 && move2.coords.i  == 2 && move1.coords.j == 0 && move2.coords.j == 1){
      secondMove = "adjacent";
      moveData = board[0][0];
      updateThis();
    }
    // Scenario 1st top-right 2nd mid-right
    else if(move1.coords.i == 0 && move2.coords.i == 1 && move1.coords.j == 2 && move2.coords.j == 2){
      secondMove = "adjacent";
      moveData = board[0][0];
      updateThis();
    }
    // Scenario 1st bot-left 2nd mid-left
    else if(move1.coords.i == 2 && move2.coords.i  == 1 && move1.coords.j == 0 && move2.coords.j == 0){
      secondMove = "adjacent";
      moveData = board[2][2];
      updateThis();
    }
    // Scenario 1st top-right 2nd top-center
    else if(move1.coords.i == 0 && move2.coords.i == 0 && move1.coords.j == 2 && move2.coords.j == 1){
      secondMove = "adjacent";
      moveData = board[2][2];
      updateThis();
    }
    // Scenarios 2nd move not center or adjacent go to any available corner
    else {
      ifSecondMoveFarCorner();
      ifSecondMoveFarSides();
      if(secondMove !== "center" && secondMove !== "adjacent" && secondMove !== "farCorner" && secondMove !== "farSide"){
        secondMove = "nearCorner";
        selectFarCorner();
      }
      updateThis();
    }
  }
   // Scenario 5th move:
  else if(moveLog.length >= 4 ){
    alert("4 or more moves")
    checkForAvailableWinPosition();
    if(availableWinPositions.length > 0){
      var userWinData = {};
      for (var i = 0; i < availableWinPositions.length; i++){
        if(availableWinPositions[i].computerKillSpot = true){
          moveData = availableWinPositions[i];
          computerWon = true;
        }
        if(availableWinPositions[i].userKillSpot = true) {
          userWinData = availableWinPositions[i];
        }
      }
      if(computerWon == false){
        moveData = userWinData;
      }
      updateThis();
    }
    // IF secondMove adjacent choose opposite corner
    else if(secondMove == "adjacent"){
      alert("secondMove was adjacent")
      var move1 = moveLog[0];
      if(move1.position == "top-right"){
        moveData = board[2][0];
      }
      if(move1.position == "top-left"){
        moveData = board[2][2];
      }
      if(move1.position == "bot-left"){
        moveData = board[0][2];
      }
      if(move1.position == "bot-right"){
        moveData = board[0][0];
      }
      updateThis();
    }   
    else {
      console.log("move not coded")
    }
  }

  
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

var updateAll = function(moveData){
  updateMoveLog(moveData);
  console.log(moveLog)

  if(!computerWon){

    if(moveLog.length == 9){
      console.log("\n");
      console.log(moveLog[moveLog.length - 1].player + " chose " + moveLog[moveLog.length - 1].position);
      showBoard();
      console.log("No more moves available....Tie.");

    } 
    else{
      console.log("\n");
      console.log("Begin move #", moveLog.length);
      console.log(moveLog[moveLog.length - 1].player + " chose " + moveLog[moveLog.length - 1].position);
      console.log("Last play data: ", lastPlayData);
      updateChoices();
      showOptions();
      checkForAvailableWinPosition();
      showWinMoves();
      console.log("\n");
      showBoard();

      allOptions.length > 0 ? nextPlayerGo(moveData.player) : console.log("Gameover...no more options")
    }
  }
  else {
    console.log("\n");
    console.log("Begin move #", moveLog.length);
    console.log(moveLog[moveLog.length - 1].player + " chose " + moveLog[moveLog.length - 1].position);
    console.log(board);
    console.log("Last play data: ", lastPlayData);
    updateChoices();
    showOptions();
    checkForAvailableWinPosition();
    showWinMoves();
    console.log("\n");
    showBoard();
    console.log("Computer wins!!")
  }
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