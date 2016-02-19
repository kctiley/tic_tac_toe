// Start Values
var moveCount = 0;
var cornerChoices = [];
var sideChoices = [];
var centerChoice = [];

// Board 
var board = [
  [{position:"top-left", marker:"[ ]", category: "corner"},{position:"top-center", marker:"[ ]", category: "side"},{position:"top-right", marker:"[ ]", category: "corner"}],
  [{position:"mid-left", marker:"[ ]", category: "side"},{position:"mid-center", marker:"[ ]", category: "center"},{position:"mid-right", marker:"[ ]", category: "side"}],
  [{position:"bot-left", marker:"[ ]", category: "corner"},{position:"bot-center", marker:"[ ]", category: "side"},{position:"bot-right", marker:"[ ]", category: "corner"}]
]

var findChoices = function(){
  cornerChoices = [];
  sideChoices = [];
  centerChoice = [];
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (board[i][j].marker == "[ ]"){
        if(board[i][j].category == 'corner'){
          cornerChoices.push(board[i][j])
        }
        if(board[i][j].category == 'side'){
          sideChoices.push(board[i][j])
        }
        if(board[i][j].category == 'side'){
          centerChoice.push(board[i][j])
        }
      }
    }
    console.log(row, rowName[i])
    row = "";
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

// Move Logic
var computerMove = function(){
  // Scenario 1st move go to any corner
  var selected = cornerChoices[Math.floor(Math.random()* corners.length)];
  console.log("Computer selects " + "'" + selected.position + "'");
  selected.marker = " X ";
  updateBoard()

}

// Updates
var updateBoard = function(){
  showBoard()
}


// Game Play
showBoard()
console.log("Computer will go first..")
console.log("Move: " + moveCount)
computerMove()