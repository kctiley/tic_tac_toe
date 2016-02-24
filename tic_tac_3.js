var moveLog = [];

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

// User game logic
var userGo = function(){
  var userInput = prompt("Select a position.")
  var positionValid = false;
  var moveData;
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if(board[i][j].marker == "[ ]" && userInput == board[i][j].position){
        positionValid = true;
        board[i][j].marker = " O ";
        updateGame(board[i][j]);
      }
    }
  }
  if(positionValid == false){
    console.log("Invalid position selected.")
  }
}

var computerGo = function(){
  var availableCorners = [];
  var availableSides = [];
  var availableCenter = [];
  var availableWinPositions = [];
  var moveData;
  var upDateAvailableOptions = function(){
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        if(board[i][j].marker == "[ ]" && board[i][j].category == "corner"){
          availableCorners.push(board[i][j]);
        }
        if(board[i][j].marker == "[ ]" && board[i][j].category == "side"){
          availableSides.push(board[i][j]);
        }
        if(board[i][j].marker == "[ ]" && board[i][j].category == "center"){
          availableCenter.push(board[i][j]);
        }
      }
    }
  }
  var selectAnyAvailableCorner = function(){
    moveData = availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  var selectAvailableCenter = function(){
    board[1][1].marker = " X ";
    moveData = board[1][1];
    updateGame(moveData);
  }

  var selectFarCorner = function(){
    if(board[0][0].marker == " X "){
      board[2][2].marker = " X "; 
      moveData = board[2][2];
    } 
    if(board[0][2].marker == " X "){
      board[2][0].marker = " X "; 
      moveData = board[2][2];
    }
    if(board[2][0].marker == " X "){
      board[0][2].marker = " X "; 
      moveData = board[2][2];
    } 
    if(board[2][2].marker == " X "){
      board[0][0].marker = " X "; 
      moveData = board[2][2];
    }
  }

  var selectBlockOrWin = function(){
    if(availableWinPositions.length > 0){
      var winSpotDetected = false;
      var blockSpotDetected = false;
      var blockSpot = {};
      availableWinPositions.forEach(function(each){
        if(each.player == " X "){
          alert("X win spot detected", each.boardSpot.position)
          moveData = each.boardSpot;
          winSpotDetected = true;
        }
        if(each.player == " O " && winSpotDetected == false){
          alert("O win spot detected", each.boardSpot.position)
          blockSpotDetected = true;
          blockSpot = each.boardSpot;
        }
      })
      if(winSpotDetected == false && blockSpotDetected == true){
        moveData = blockSpot;
      }
    }
  }

  var checkIfBlockOrWinAvailable = function(){
    alert('inside block or win')
    var potential = {boardSpot:"", player:""};
    // Detect if win spot for User
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
          var mkr = " O ";
          alert(mkr)
        // horizontal detection
        if(board[i][j - 1] && board[i][j + 1]){
          if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j - 1].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j - 1]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i][j - 1].marker == mkr && board[i][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i][j - 1].marker == mkr && board[i][j].marker == mkr && board[i][j + 1].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j + 1]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
        }
          // vert detection
        if(board[i - 1] && board[i + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i - 1][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i - 1][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i - 1][j].marker == mkr && board[i + 1][j].marker == mkr && board[i][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j]; potential.player = mkr;
            availableWinPositions.push(potential) 
          }
          if (board[i - 1][j].marker == mkr && board[i][j].marker == mkr && board[i + 1][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i + 1][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
        }
        // diag detection
        if(board[i][j - 1] && board[i][j + 1] && board[i - 1] && board[i + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j + 1].marker == mkr && board[i - 1][j - 1].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i - 1][j - 1].marker == mkr && board[i + 1][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i - 1][j - 1].marker == mkr && board[i][j].marker == mkr && board[i + 1][j + 1].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i + 1][j +1]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
        }
      }
    }
    // End Detect if win spot for User
    // Detect if win spot for Computer
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
          var mkr = " X ";
          alert(mkr)
        // horizontal detection
        if(board[i][j - 1] && board[i][j + 1]){
          if (board[i][j].marker == mkr && board[i][j + 1].marker == mkr && board[i][j - 1].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j - 1]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i][j - 1].marker == mkr && board[i][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i][j - 1].marker == mkr && board[i][j].marker == mkr && board[i][j + 1].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j + 1]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
        }
          // vert detection
        if(board[i - 1] && board[i + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j].marker == mkr && board[i - 1][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i - 1][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i - 1][j].marker == mkr && board[i + 1][j].marker == mkr && board[i][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j]; potential.player = mkr;
            availableWinPositions.push(potential) 
          }
          if (board[i - 1][j].marker == mkr && board[i][j].marker == mkr && board[i + 1][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i + 1][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
        }
        // diag detection
        if(board[i][j - 1] && board[i][j + 1] && board[i - 1] && board[i + 1]){
          if (board[i][j].marker == mkr && board[i + 1][j + 1].marker == mkr && board[i - 1][j - 1].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i - 1][j - 1].marker == mkr && board[i + 1][j + 1].marker == mkr && board[i][j].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i][j]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
          if (board[i - 1][j - 1].marker == mkr && board[i][j].marker == mkr && board[i + 1][j + 1].marker == "[ ]"){
            alert('detection scenario')
            potential.boardSpot = board[i + 1][j +1]; potential.player = mkr;
            availableWinPositions.push(potential)
          }
        }
      }
    }
    // End detect if winspot for Computer
  }

  // Update arrays of corners, sides, and center availables
  upDateAvailableOptions();

  // Computer goes first move
  if(moveLog.length < 1){
    selectAnyAvailableCorner();
  }
  // Computer goes 2nd move 
  else if(moveLog.length == 1){
    // First was any corner
    if(availableCorners.length == 3){
      selectAvailableCenter();
    }
    // First was center
    if(availableCenter.length == 0){
      selectAnyAvailableCorner();
    }
    // First was a side
    if(availableSides.length) == 3){
      var move1 = moveLog[0];
      
    }
  }
  // Computer goes third move
  else if(moveLog.length == 2){
    // Second move was adjacent side
    if(board[0][0].marker == " X " && board[0][1].marker == " O " || board[2][2].marker == " X " && board[1][2].marker == " O " ){
      moveData = board[2][0];
    }
    if(board[0][0].marker == " X " && board[1][0].marker == " O " || board[2][2].marker == " X " && board[2][1].marker == " O " ){
      moveData = board[0][2];
    }
    if(board[0][2].marker == " X " && board[0][1].marker == " O " || board[2][0].marker == " X " && board[1][0].marker == " O " ){
      moveData = board[2][2];
    }
    if(board[0][2].marker == " X " && board[1][2].marker == " O " || board[2][0].marker == " X " && board[2][1].marker == " O " ){
      moveData = board[0][0];
    }
    // Second move was far corner
    if(board[0][0].marker == " X " && board[2][2].marker == " O " || board[0][2].marker == " X " && board[2][0].marker == " O " || board[2][0].marker == " X " && board[0][2].marker == " O " || board[2][2].marker == " X " && board[0][0].marker == " O "){
      selectAnyAvailableCorner();
    }
    // Second move was center
    if(moveLog[1].position == "mid-center"){
      selectFarCorner();
    }
   // Second move was any far side
    if(board[0][0].marker == " X " && board[1][2].marker == " O " || board[0][0].marker == " X " && board[2][1].marker == " O " || board[0][2].marker == " X " && board[1][0].marker == " O " || board[0][2].marker == " X " && board[2][1].marker == " O " || board[2][0].marker == " X " && board[0][1].marker == " O " || board[2][0].marker == " X " && board[1][2].marker == " O " || board[2][2].marker == " X " && board[0][1].marker == " O " || board[2][2].marker == " X " && board[1][0].marker == " O "){
      selectFarCorner();
    }
    // Second move was any near corner
    if(board[0][0].marker == " X " && board[0][2].marker == " O " || board[0][0].marker == " X " && board[2][0].marker == " O " || board[0][2].marker == " X " && board[2][2].marker == " O " || board[0][2].marker == " X " && board[0][0].marker == " O " || board[2][0].marker == " X " && board[0][0].marker == " O " || board[2][0].marker == " X " && board[2][2].marker == " O " || board[2][2].marker == " X " && board[0][2].marker == " O " || board[2][2].marker == " X " && board[2][0].marker == " O "){
      selectFarCorner();
    }  

  }
  // All moves after 3rd
  else if(moveLog.length >= 3){
    checkIfBlockOrWinAvailable();
    if(availableWinPositions.length > 0){
      console.log("availableWinPositions", availableWinPositions)
      selectBlockOrWin();
    }
    // Computer goes 4th move
    else if(moveLog.length == 3){
      console.log("note coded yet 4th move scenario")
    }
    // Commputer goes fifth move
    else if(moveLog.length == 4){
      console.log("note coded yet 5th move scenario")
    }
    // Commputer goes sixth move
    else if(moveLog.length == 5){
      console.log("note coded yet 6th move scenario")
    }
    else{
        console.log("note coded yet more 7+ move scenario")
    }
  }
  else{
    console.log("not caught")
  }
  moveData.marker = " X ";
  updateGame(moveData);
}

var updateGame = function(moveData){
  moveLog.push(moveData);
  console.log("\n");
  showBoard();
  console.log("Last move: ", moveLog[moveLog.length - 1]);
  checkForWin();
}

var checkForWin = function(){
  var markers = [" X ", " O "];
  var winDetected = false;
  markers.forEach(function(mkr){
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        if(board[i - 1] && board[i + 1] && board[i][j - 1] && board[i][j + 1]){
          if(board[i][j - 1].marker == mkr && board[i][j].marker == mkr && board[i][j + 1].marker == mkr || board[i - 1][j].marker == mkr && board[i][j].marker == mkr && board[i + 1][j].marker == mkr || board[i - 1][j -1].marker == mkr && board[i][j].marker == mkr && board[i + 1][j + 1].marker == mkr || board[i - 1][j + 1].marker == mkr && board[i][j].marker == mkr && board[i + 1][j - 1].marker == mkr){
            if(mkr == " X "){
              winDetected = true;
              console.log("Computer wins");
            }
            else{
              winDetected = true;
              console.log("User wins");
            }
          }
        }
      }
    }
  })
  if(winDetected == false){
    moveLog.length == 9 ? console.log("Tie??") : console.log("Turn #" + (moveLog.length + 1) + "begins..");
    moveLog[moveLog.length - 1].marker == " X " ? userGo() : computerGo();
  }
}

//Begin Game
console.log("\n");
showBoard();
console.log("Game starting..");

if(Math.random() > .5){
  userGo();
}
else{
  alert("Computer will go first.");
  computerGo();
}
