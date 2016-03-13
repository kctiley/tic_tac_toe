var boardPerim = [ {position: "nwcorner", marker: "[ ]"},
              {position: "nside", marker: "[ ]"},
              {position: "necorner", marker: "[ ]"},
              {position: "eside", marker: "[ ]"},
              {position: "secorner", marker: "[ ]"},
              {position: "sside", marker: "[ ]"},
              {position: "swcorner", marker: "[ ]"},
              {position: "wside", marker: "[ ]"},
]
var boardCenter = {position: "center", marker: "[ ]" };

var winner = false;
var moveCount = -1;

var showBoard = function(){
  console.log("**************");
  console.log(boardPerim[0].marker, boardPerim[1].marker, boardPerim[2].marker);
  console.log(boardPerim[7].marker, boardCenter.marker, boardPerim[3].marker);
  console.log(boardPerim[6].marker, boardPerim[5].marker, boardPerim[4].marker);
  console.log("**************");
}

var updateBoard = function(lastPlayer){
  moveCount++;
  console.log("Move count: " + moveCount);
  console.log("Updating board...");
  showBoard();
  var boardAll = boardPerim;
  boardAll.push(boardCenter);
  var tie = true;
  boardAll.forEach(function(boardSlot){
    if(boardSlot.marker == "[ ]"){
      tie = false;
    }
  })
  if(winner){
    console.log("Winner");
  }
  else if (tie){
    console.log("Tie");
  }
  else {
    (moveCount == 0 || lastPlayer == "User")? computer.move() : user.move();
  }
}

var computer = {
  move: function() {
    var rotateBoard = function(){
      var newFirst = boardPerim.slice(6,8);
      var newLast = boardPerim.slice(0,6);
      var newArr = newFirst;
      newLast.forEach(function(each){
        newArr.push(each);
      })
      boardPerim = newArr;
    }

    console.log("Computer move...");
    if (moveCount == 0){
      boardPerim[0].marker = " X ";
      // or go to boardPerim[6].marker = " X " or 2 or 4
      updateBoard("Computer");
    }
    else if (moveCount == 2){
      console.log("In computer 3rd move");
      // Rotate board 3 times to check for match and rotate 1 more time to reset to original position
      for (var i = 0; i < 5; i++){
        if(i > 0){rotateBoard();}
        showBoard();
        // Scenario 2nd move was center
        if(boardPerim[0].marker == " X " && boardCenter.marker == " O "){
          boardPerim[4].marker = " X ";
          break;
        }
        // Scenario 2nd move was near side
        if(boardPerim[0].marker == " X " && boardPerim[1].marker == " O "){
          boardPerim[6].marker = " X ";
          break;
        }
        if(boardPerim[2].marker == " X " && boardPerim[1].marker == " O "){
          boardPerim[4].marker = " X ";
          break;
        }
        // Scenario 2nd move was a far side or a close corner
        if(boardPerim[0].marker == " X " && (boardPerim[3].marker == " O " || boardPerim[5].marker == " O " || boardPerim[2].marker == " O " || boardPerim[6].marker == " O ")){
          boardPerim[4].marker = " X ";
          break;
        }
        // Scenario 2nd move was a far corner
        if(boardPerim[0].marker == " X " && boardPerim[4].marker == " O "){
          boardPerim[2].marker = " X ";
          // or go to boardPerim[6].marker = " X "
          break;
        }
      }

      updateBoard("Computer");
    }
    else {
      console.log("Scenario not coded yet")
    }
  },

}

var user = {
  move : function(){
    console.log("User move...");
    var position = prompt('User enter position ');
    var moveValid = false;
    for (var i = 0; i < boardPerim.length; i++){
      if(position == boardPerim[i].position && boardPerim[i].marker == "[ ]"){
        boardPerim[i].marker = " O ";
        moveValid = true;
        console.log("User move: " + boardPerim[i].position);
        updateBoard("User");
      }
      if(position == boardCenter.position && boardCenter.marker == "[ ]"){
        boardCenter.marker = " O ";
        moveValid = true;
        console.log("User move: " + boardCenter.position);
        updateBoard("User");
      }
    }
    if(moveValid == false){
      var continueGame = prompt("Invalid move. Continue y or n?");
      if(continueGame == "y"){
        user.move();
      }
    }
  }
}

updateBoard()
