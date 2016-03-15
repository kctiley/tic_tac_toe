var boardSlots = [ {position: "nwcorner", marker: "[ ]"},
              {position: "nside", marker: "[ ]"},
              {position: "necorner", marker: "[ ]"},
              {position: "eside", marker: "[ ]"},
              {position: "secorner", marker: "[ ]"},
              {position: "sside", marker: "[ ]"},
              {position: "swcorner", marker: "[ ]"},
              {position: "wside", marker: "[ ]"},
              {position: "center", marker: "[ ]" }
]

var winner = false;
var moveCount = -1;
var availPositions;

var showBoard = function(){
  console.log("***********");
  console.log(boardSlots[0].marker, boardSlots[1].marker, boardSlots[2].marker);
  console.log(boardSlots[7].marker, boardSlots[8].marker, boardSlots[3].marker);
  console.log(boardSlots[6].marker, boardSlots[5].marker, boardSlots[4].marker);
  console.log("***********");
}

var updateBoard = function(lastPlayer){
  moveCount++;
  console.log("Move count: " + moveCount);
  showBoard();
  var tie = true;
  availPositions = [];
  boardSlots.forEach(function(boardSlot){
    if(boardSlot.marker == "[ ]"){
      tie = false;
      availPositions.push(boardSlot.position);
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
      var newFirst = boardSlots.slice(6,8);
      var newLast = boardSlots.slice(0,6);
      var center = boardSlots[8];
      var newArr = newFirst;
      newLast.forEach(function(each){
        newArr.push(each);
      })
      newArr.push(center);
      boardSlots = newArr;
    }

    var resetBoard = function(){
      while(boardSlots[0].position !== "nwcorner"){
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
          if(boardSlots[0].marker == mrkr && boardSlots[1].marker == "[ ]" && boardSlots[2].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardSlots[1]); }
            if(mrkr == " O "){availWinsUser.push(boardSlots[1]); }
          }
          // nw avail top row
          if(boardSlots[0].marker == "[ ]" && boardSlots[1].marker == mrkr && boardSlots[2].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardSlots[0]); }
            if(mrkr == " O "){availWinsUser.push(boardSlots[0]); }
          }
          // ne avail top row
          if(boardSlots[0].marker == mrkr && boardSlots[1].marker == mrkr && boardSlots[2].marker == "[ ]"){
            if(mrkr == " X "){availWinsComputer.push(boardSlots[2]); }
            if(mrkr == " O "){availWinsUser.push(boardSlots[2]); }
          }
          // Center row win scenarios
          // middle avail center row
          if(boardSlots[7].marker == mrkr && boardSlots[8].marker == "[ ]" && boardSlots[3].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardSlots[8]);}
            if(mrkr == " O "){availWinsUser.push(boardSlots[8])}
          }
          // wside avail center row
          if(boardSlots[7].marker == "[ ]" && boardSlots[8].marker == mrkr && boardSlots[3].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardSlots[7]);}
            if(mrkr == " O "){availWinsUser.push(boardSlots[7]);}
          }
          // eside avail center row
          if(boardSlots[7].marker == mrkr && boardSlots[8].marker == mrkr && boardSlots[3].marker == "[ ]"){
            if(mrkr == " X "){availWinsComputer.push(boardSlots[3]);}
            if(mrkr == " O "){availWinsUser.push(boardSlots[3]);}
          }
          // Diagonal scenarios
          // center avail
          if(boardSlots[0].marker == mrkr && boardSlots[8].marker == "[ ]" && boardSlots[4].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardSlots[8]);}
            if(mrkr == " O "){availWinsUser.push(boardSlots[8]);}
          }
          // ne avail
          if(boardSlots[0].marker == "[ ]" && boardSlots[8].marker == mrkr && boardSlots[4].marker == mrkr){
            if(mrkr == " X "){availWinsComputer.push(boardSlots[0]);}
            if(mrkr == " O "){availWinsUser.push(boardSlots[0]);}
          }
          // se avail
          if(boardSlots[0].marker == mrkr && boardSlots[8].marker == mrkr && boardSlots[4].marker == "[ ]"){
            if(mrkr == " X "){availWinsComputer.push(boardSlots[4]);}
            if(mrkr == " O "){availWinsUser.push(boardSlots[4]);}
          }
        }
      }
    }// End checkForBlockOrWin

    console.log("Computer move...");
    if (moveCount == 0){
      boardSlots[0].marker = " X ";
      // or go to boardSlots[6].marker = " X " or 2 or 4 for random ux
      updateBoard("Computer");
    }
    else if (moveCount == 2){
      console.log("In computer 3rd move");
      // Rotate board 3 times to check for match and rotate 1 more time to reset to original position
      for (var i = 0; i < 5; i++){
        if(i > 0){rotateBoard();}
        // Scenario 2nd move was center
        if(boardSlots[0].marker == " X " && boardSlots[8].marker == " O "){
          boardSlots[4].marker = " X ";
          break;
        }
        // Scenario 2nd move was near side
        if(boardSlots[0].marker == " X " && boardSlots[1].marker == " O "){
          boardSlots[6].marker = " X ";
          break;
        }
        if(boardSlots[2].marker == " X " && boardSlots[1].marker == " O "){
          boardSlots[4].marker = " X ";
          break;
        }
        // Scenario 2nd move was close corner
        if(boardSlots[0].marker == " X " && (boardSlots[2].marker == " O " || boardSlots[6].marker == " O ")){
          boardSlots[4].marker = " X ";
          break;
        }
        // Scenario 2nd move was far side
        if(boardSlots[0].marker == " X " && boardSlots[3].marker == " O "){
          boardSlots[6].marker = " X ";
          break;
        }
        if(boardSlots[0].marker == " X " && boardSlots[5].marker == " O "){
          boardSlots[2].marker = " X ";
          break;
        }
        // Scenario 2nd move was a far corner. This scenario could be included with 2nd move far side scenario IF NOT doing random ux
        if(boardSlots[0].marker == " X " && boardSlots[4].marker == " O "){
          boardSlots[2].marker = " X ";
          // or go to boardSlots[6].marker = " X " for random ux
          break;
        }
      }
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
          if(boardSlots[2].marker == " X " && boardSlots[1].marker == " O " && boardSlots[3].marker == " O "){
            boardSlots[6].marker = " X ";
            break;
          }
          // Scenario move 2 far side and move 4 center
          if(boardSlots[0].marker == " X " && boardSlots[3].marker == " O " && boardSlots[8].marker == " O "){
            boardSlots[6].marker = " X ";
            break;
          }
          if(boardSlots[0].marker == " X " && boardSlots[5].marker == " O " && boardSlots[8].marker == " O "){
            boardSlots[2].marker = " X ";
            break;
          }
          // Scenario 2nd move was far corner
          if(boardSlots[0].marker == " X " && boardSlots[4].marker == " O " && boardSlots[7] == " O "){
            boardSlots[2].marker = " X ";
            break;
          }
          if(boardSlots[0].marker == " X " && boardSlots[4].marker == " O " && boardSlots[1] == " O "){
            boardSlots[6].marker = " X ";
            break;
          }
        }
      }
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
    }
    else {
      console.log("Scenario not coded yet")
    }
    resetAvailWinsToEmptyArray();
    resetBoard();
    updateBoard("Computer");
  },
}

var user = {
  move : function(){
    console.log("User move...");
    var position = prompt("Select from available positions: " + availPositions.join(', '));
    var moveValid = false;
    for (var i = 0; i < boardSlots.length; i++){
      if(position == boardSlots[i].position && boardSlots[i].marker == "[ ]"){
        boardSlots[i].marker = " O ";
        moveValid = true;
        console.log("User move: " + boardSlots[i].position);
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
