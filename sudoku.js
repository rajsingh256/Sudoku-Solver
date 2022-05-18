//global variable
//accesible to all functions
var sol =
   [[0, 7, 0, 2, 3, 8, 0, 0, 0],
   [0, 0, 0, 7, 4, 0, 8, 0, 9],
   [0, 6, 8, 1, 0, 9, 0, 0, 2],
   [0, 3, 5, 4, 0, 0, 0, 0, 8],
   [6, 0, 7, 8, 0, 2, 5, 0, 1],
   [8, 0, 0, 0, 0, 5, 7, 6, 0],
   [2, 0, 0, 6, 0, 3, 1, 9, 0],
   [7, 0, 9, 0, 2, 1, 0, 0, 0],
   [0, 0, 0, 9, 7, 4, 0, 8, 0]];
 
//this function prints the board
var printBoard = function () {
   var i;
   var j;
   for(i=1; i<=9 ; i++){
       for(j=1; j<=9; j++) {
           document.getElementById('r' + i + j).innerHTML = sol[i-1][j-1];
       }
   }
};
 
 var solve = function() {
   for(var row = 0; row < sol.length; row++) {
       for(var column = 0; column < sol.length; column++) {
          if(sol[row][column] == 0){
               for (var num = 1; num <= 9; num++) {
                   if (!checkRow(row, num) && !checkCol(column, num) && !checkBox(row, column, num)) {
                       sol[row][column] = num;
                       if(solve()) {
                           return true;
                       } else {
                           sol[row][column] = 0;
                       }
                   }
               }
               return false;
           } 
       }
   }
   printBoard();
   return true;
};
 
printBoard();



var loadNewPuzzle = function() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://sugoku.herokuapp.com/board?difficulty=random", true);
    request.onload = function() {
        var data = JSON.parse(this.response);
        sol = data.board;
        printBoard();
    }
    request.send();
}

var checkRow = function(row, num) {
   for(var i = 0; i < 9; i++) {
       if(sol[row][i] == num) {
           return true;
       }
   }
   return false;
}
 var checkCol = function(column, num) {
   for(var j = 0; j < 9; j++) {
       if(sol[j][column] == num) {
           return true;
       }
   }
   return false;
}
 var checkBox = function(row, column, val) {
    var r, c;
    r = row - row % 3;
    c = column - column % 3;
    for(var i = r; i < r + 3; i++) {
        for(var j = c; j < c + 3; j++){
            if (sol[i][j] == val) {
                return true;
            }
        }
    }
    return false;
}

