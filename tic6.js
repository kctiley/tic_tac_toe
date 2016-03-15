var board = [ {position: "topLeft", marker: "[ ]"},
              {position: "topCenter", marker: "[ ]"},
              {position: "topRight", marker: "[ ]"},
              {position: "middleRight", marker: "[ ]"},
              {position: "bottomRight", marker: "[ ]"},
              {position: "bottomCenter", marker: "[ ]"},
              {position: "bottomLeft", marker: "[ ]"},
              {position: "middleCenter", marker: "[ ]"},
              {position: "center", marker: "[ ]" }
];

var rotateBoard = function(){
  var newFirst = board.slice(6,8);
  var newLast = board.slice(0,6);
  var center = board[8];
  var newArr = newFirst;
  newLast.forEach(function(each){
    newArr.push(each);
  })
  newArr.push(center);
  board = newArr;
}

var resetBoard = function(){
  while(board[0].position !== "topLeft"){
    rotateBoard();
  }
}

var showBoard = function(){
  console.log("***********");
  console.log(board[0].marker, board[1].marker, board[2].marker);
  console.log(board[7].marker, board[8].marker, board[3].marker);
  console.log(board[6].marker, board[5].marker, board[4].marker);
  console.log("***********");

  for(var i = 0; i < board.length; i++){
    if(board[i].marker !== "[ ]"){
      var element = document.getElementById("" + i + "");
      element.innerHTML(board[i].marker)
    }
  }
}

var updateBoard = function(lastPlayer){
  resetBoard();
  console.log("Move count: " + moveCount);
  moveCount++;
  showBoard();
  availPositions = [];
  board.forEach(function(boardSlot){
    if(boardSlot.marker == "[ ]"){
      availPositions.push(boardSlot.position);
    }
  })
  if(winner){
    console.log(winner);
  }
  else if (availPositions.length == 0){
    console.log("Tie");
  }
  else {
    (moveCount == 1 || lastPlayer == "User")? computer.move() : user.move();
  }
}

var computer = {
  move: function() {
    
    var availWinsUser = [];
    var availWinsComputer = [];

    var checkForBlockOrWin = function(){
      var mrkrs = [" X ", " O "];
      for (var i = 0; i < 2; i++){
        var mrkr = mrkrs[i];
        if(availWinsComputer.length == 0){
          // Perimeter win scenarios
          // nside avail top row
          if(board[0].marker == mrkr && board[1].marker == "[ ]" && board[2].marker == mrkr){
            mrkr == " X "? availWinsComputer.push(board[1]) : availWinsUser.push(board[1]);
          }
          // nw avail top row
          if(board[0].marker == "[ ]" && board[1].marker == mrkr && board[2].marker == mrkr){
            mrkr == " X "? availWinsComputer.push(board[0]) : availWinsUser.push(board[0]);
          }
          // ne avail top row
          if(board[0].marker == mrkr && board[1].marker == mrkr && board[2].marker == "[ ]"){
            mrkr == " X "? availWinsComputer.push(board[2]) : availWinsUser.push(board[2]);
          }
          // Center row win scenarios
          // middle avail center row
          if(board[7].marker == mrkr && board[8].marker == "[ ]" && board[3].marker == mrkr){
            mrkr == " X "? availWinsComputer.push(board[8]) : availWinsUser.push(board[8]);
          }
          // wside avail center row
          if(board[7].marker == "[ ]" && board[8].marker == mrkr && board[3].marker == mrkr){
            mrkr == " X "? availWinsComputer.push(board[7]) : availWinsUser.push(board[7]);
          }
          // eside avail center row
          if(board[7].marker == mrkr && board[8].marker == mrkr && board[3].marker == "[ ]"){
            mrkr == " X "? availWinsComputer.push(board[3]) : availWinsUser.push(board[3]);
          }
          // Diagonal scenarios
          // center avail
          if(board[0].marker == mrkr && board[8].marker == "[ ]" && board[4].marker == mrkr){
            mrkr == " X "? availWinsComputer.push(board[8]) : availWinsUser.push(board[8]);
          }
          // ne avail
          if(board[0].marker == "[ ]" && board[8].marker == mrkr && board[4].marker == mrkr){
            mrkr == " X "? availWinsComputer.push(board[0]) : availWinsUser.push(board[0]);
          }
          // se avail
          if(board[0].marker == mrkr && board[8].marker == mrkr && board[4].marker == "[ ]"){
            mrkr == " X "? availWinsComputer.push(board[4]) : availWinsUser.push(board[4]);
          }
        }
      }
    }// End checkForBlockOrWin function

    // Begin Computer check for scenarios
    console.log("Computer move...");
    if (moveCount == 1){
      board[0].marker = " X ";
      // or go to board[6].marker = " X " or 2 or 4 for random ux
      updateBoard("Computer");
    }
    else if (moveCount == 3){
      console.log("In computer 3rd move");
      // Rotate board 3 times to check for match and rotate 1 more time to reset to original position
      for (var i = 0; i < 5; i++){
        if(i > 0){rotateBoard();}
        if(board[0].marker == " X "){
          // Scenario 2nd move was center
          if(board[8].marker == " O "){board[4].marker = " X ";
            break;
          }
          // Scenario 2nd move was near side
          if(board[1].marker == " O "){board[6].marker = " X ";
            break;
          }
          if(board[7].marker == " O "){board[4].marker = " X ";
            break;
          }
          // Scenario 2nd move was near corner
          if(board[2].marker == " O " || board[6].marker == " O "){board[4].marker = " X ";
            break;
          }
          // Scenario 2nd move was far side
          if(board[3].marker == " O "){board[6].marker = " X ";
            break;
          }
          if(board[5].marker == " O "){board[2].marker = " X ";
            break;
          }
          // Scenario 2nd move was a far corner. This scenario could be included with 2nd move far side scenario IF NOT doing random ux
          if(board[0].marker == " X " && board[4].marker == " O "){
            board[2].marker = " X ";
            // or go to board[6].marker = " X " for random ux
            break;
          }
        }
      }
    }
    else if (moveCount == 5){
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
          if(board[0].marker == " X "){
            // Scenario moves 2 and 4 were side moves
            if(board[1].marker == " O " && board[7].marker == " O "){board[4].marker = " X ";
              break;
            }
            // Scenario move 2 far side and move 4 center
            if(board[3].marker == " O " && board[8].marker == " O "){board[6].marker = " X ";
              break;
            }
            if(board[5].marker == " O " && board[8].marker == " O "){board[2].marker = " X ";
              break;
            }
            // Scenario 2nd move was far corner
            if(board[4].marker == " O " && board[7] == " O "){board[2].marker = " X ";
              break;
            }
            if(board[4].marker == " O " && board[1] == " O "){board[6].marker = " X ";
              break;
            }
          }
        }
      }
    }
    else if (moveCount > 5){
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
    // resetBoard();
    updateBoard("Computer");
  },
}

var user = {
  move : function(){
    console.log("User move...");
    var position = prompt("Select from available positions: " + availPositions.join(', '));
    var moveValid = false;
    for (var i = 0; i < board.length; i++){
      if(position == board[i].position && board[i].marker == "[ ]"){
        board[i].marker = " O ";
        moveValid = true;
        console.log("User move: " + board[i].position);
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


// Initial values and game start
var winner = false;
var moveCount = 0;
var availPositions;

updateBoard()
