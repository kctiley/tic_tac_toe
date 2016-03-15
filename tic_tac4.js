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
var boardAll = boardPerim;
boardAll.push(boardCenter);

var winner = false;
var moveCount = -1;
var availPositions;

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
  var tie = true;
  availPositions = [];
  boardAll.forEach(function(boardSlot){
    if(boardSlot.marker == "[ ]"){
      tie = false;
      availPositions.push(boardSlot.position);
      console.log("boardPerim",boardPerim)
      console.log("boardCenter",boardCenter)
      console.log("boardAll",boardAll)
      console.log("boardSlot",boardSlot)
    }
  })
  if(winner){
    console.log(winner);
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

    var resetBoard = function(){
      while(boardPerim[0].position !== "nwcorner"){
        rotateBoard();
      }
    }

    var availWinsUser = [];
    var availWinsComputer = [];
    var resetAvailWinsToEmptyArray = function(){
      availWinsUser = [];
      availWinsComputer = [];
    }

    var checkForBlockOrWin = function(){
      var mrkrs = [" X ", " O "];
      for (var i = 0; i < 2; i++){
        var mrkr = mrkrs[i];
        if(availWinsComputer.length == 0){
          // Perimeter win scenarios
          // middle avail top row
          if(boardPerim[0].marker == mrkr && boardPerim[1].marker == "[ ]" && boardPerim[2].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardPerim[1]); }
            if(mrkr == " O "){availWinsUser.push(boardPerim[1]); }
          }
          // nw avail top row
          if(boardPerim[0].marker == "[ ]" && boardPerim[1].marker == mrkr && boardPerim[2].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardPerim[0]); }
            if(mrkr == " O "){availWinsUser.push(boardPerim[0]); }
          }
          // ne avail top row
          if(boardPerim[0].marker == mrkr && boardPerim[1].marker == mrkr && boardPerim[2].marker == "[ ]"){
            if(mrkr == " X "){availWinsComputer.push(boardPerim[2]); }
            if(mrkr == " O "){availWinsUser.push(boardPerim[2]); }
          }
          // Center row win scenarios
          // middle avail center row
          if(boardPerim[7].marker == mrkr && boardCenter.marker == "[ ]" && boardPerim[3].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardCenter);}
            if(mrkr == " O "){availWinsUser.push(boardCenter)}
          }
          // wside avail center row
          if(boardPerim[7].marker == "[ ]" && boardCenter.marker == mrkr && boardPerim[3].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardPerim[7]);}
            if(mrkr == " O "){availWinsUser.push(boardPerim[7]);}
          }
          // eside avail center row
          if(boardPerim[7].marker == mrkr && boardCenter.marker == mrkr && boardPerim[3].marker == "[ ]"){
            if(mrkr == " X "){availWinsComputer.push(boardPerim[3]);}
            if(mrkr == " O "){availWinsUser.push(boardPerim[3]);}
          }
          // Diagonal scenarios
          // center avail
          if(boardPerim[0].marker == mrkr && boardCenter.marker == "[ ]" && boardPerim[4].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardCenter);}
            if(mrkr == " O "){availWinsUser.push(boardCenter);}
          }
          // ne avail
          if(boardPerim[0].marker == "[ ]" && boardCenter.marker == mrkr && boardPerim[4].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardPerim[0]);}
            if(mrkr == " O "){availWinsUser.push(boardPerim[0]);}
          }
          // se avail
          if(boardPerim[0].marker == mrkr && boardCenter.marker == mrkr && boardPerim[4].marker == "[ ]"){
            if(mrkr == " X "){availWinsComputer.push(boardPerim[4]);}
            if(mrkr == " O "){availWinsUser.push(boardPerim[4]);}
          }
        }
      }
    }// End checkForBlockOrWin

    console.log("Computer move...");
    if (moveCount == 0){
      boardPerim[0].marker = " X ";
      // or go to boardPerim[6].marker = " X " or 2 or 4 for random ux
      updateBoard("Computer");
    }
    else if (moveCount == 2){
      console.log("In computer 3rd move");
      // Rotate board 3 times to check for match and rotate 1 more time to reset to original position
      for (var i = 0; i < 5; i++){
        if(i > 0){rotateBoard();}
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
        // Scenario 2nd move was close corner
        if(boardPerim[0].marker == " X " && (boardPerim[2].marker == " O " || boardPerim[6].marker == " O ")){
          boardPerim[4].marker = " X ";
          break;
        }
        // Scenario 2nd move was far side
        if(boardPerim[0].marker == " X " && boardPerim[3].marker == " O "){
          boardPerim[6].marker = " X ";
          break;
        }
        if(boardPerim[0].marker == " X " && boardPerim[5].marker == " O "){
          boardPerim[2].marker = " X ";
          break;
        }
        // Scenario 2nd move was a far corner. This scenario could be included with 2nd move far side scenario IF NOT doing random ux
        if(boardPerim[0].marker == " X " && boardPerim[4].marker == " O "){
          boardPerim[2].marker = " X ";
          // or go to boardPerim[6].marker = " X " for random ux
          break;
        }
      }
      // resetBoard();
      // updateBoard("Computer");
    }
    else if (moveCount == 4){
      console.log("In computer 5th move");
      // Rotate board 3 times to check for match and rotate 1 more time to reset to original position
      for (var i = 0; i < 5; i++){
        if(i > 0){rotateBoard();}
        checkForBlockOrWin();
      }  
      // Block or Win also covers scenario move 2 was near corner since next move will either be win or block
      // Go for win
      if(availWinsComputer.length > 0){
        availWinsComputer[0].marker = " X ";
        winner = "Computer wins!";
      }
      // Go for block
      // Block also covers scenario move 2 was center and any 4th move would be block
      else if(availWinsUser.length > 0){
        availWinsUser[0].marker = " X ";
      }
      else {
        for (var i = 0; i < 5; i++){
          if(i > 0){rotateBoard();}
          // Scenario moves 2 and 4 were side moves
          if(boardPerim[2].marker == " X " && boardPerim[1].marker == " O " && boardPerim[3].marker == " O "){
            boardPerim[6].marker = " X ";
            break;
          }
          // Scenario move 2 far side and move 4 center
          if(boardPerim[0].marker == " X " && boardPerim[3].marker == " O " && boardCenter.marker == " O "){
            boardPerim[6].marker = " X ";
            break;
          }
          if(boardPerim[0].marker == " X " && boardPerim[5].marker == " O " && boardCenter.marker == " O "){
            boardPerim[2].marker = " X ";
            break;
          }
          // Scenario 2nd move was far corner
          if(boardPerim[0].marker == " X " && boardPerim[4].marker == " O " && boardPerim[7] == " O "){
            boardPerim[2].marker = " X ";
            break;
          }
          if(boardPerim[0].marker == " X " && boardPerim[4].marker == " O " && boardPerim[1] == " O "){
            boardPerim[6].marker = " X ";
            break;
          }
        }
      }
      // resetAvailWinsToEmptyArray();
      // resetBoard();
      // updateBoard("Computer");
    }
    else if (moveCount > 4){
      console.log("In computer move 7 or more")
      // Rotate board 3 times to check for match and rotate 1 more time to reset to original position
      for (var i = 0; i < 5; i++){
        if(i > 0){rotateBoard();}
        checkForBlockOrWin();
      }  
      // Go for win
      if(availWinsComputer.length > 0){
        availWinsComputer[0].marker = " X ";
        winner = "Computer wins";
      }
      // Go for block if win not avail
      else if(availWinsUser.length > 0){  
        availWinsUser[0].marker = " X ";
      }
      else {
        console.log("In moveCount > 4 ...scenario not coded")
      }
      // resetAvailWinsToEmptyArray();
      // resetBoard();
      // updateBoard("Computer");
    }
    else {
      console.log("Scenario not coded yet")
    }
    resetAvailWinsToEmptyArray();
    resetBoard();
    updateBoard("Computer");
  },
}

// var user = {
//   move : function(){
//     console.log("User move...");
//     console.log("Select from available positions: ", availPositions.join(', '))
//     var position = prompt('User enter position ');
//     var moveValid = false;
//     for (var i = 0; i < boardPerim.length; i++){
//       if(position == boardPerim[i].position && boardPerim[i].marker == "[ ]"){
//         boardPerim[i].marker = " O ";
//         moveValid = true;
//         console.log("User move: " + boardPerim[i].position);
//         updateBoard("User");
//       }
//       if(position == boardCenter.position && boardCenter.marker == "[ ]"){
//         boardCenter.marker = " O ";
//         moveValid = true;
//         console.log("User move: " + boardCenter.position);
//         updateBoard("User");
//       }
//     }
//     if(moveValid == false){
//       var continueGame = prompt("Invalid move. Continue y or n?");
//       if(continueGame == "y"){
//         user.move();
//       }
//     }
//   }
// }

var user = {
  move : function(){
    console.log("User move...");
    var position = prompt("Select from available positions: " + availPositions.join(', '));
    var moveValid = false;
    for (var i = 0; i < boardAll.length; i++){
      if(position == boardAll[i].position && boardAll[i].marker == "[ ]"){
        boardAll[i].marker = " O ";
        moveValid = true;
        console.log("User move: " + boardPerim[i].position);
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
