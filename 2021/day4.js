var DAY = 4;

(function getInput(day) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://adventofcode.com/2021/day/' + day + '/input');
  xhr.onload = function(){ 
    var input = xhr.response.split('\n');
    solve(input);
  };

  xhr.send();
})(DAY);

function solve(input) {
  var numbers = input[0].split(','),
    boards = [];

  for(var i = 2; i < input.length; i += 6) {
    boards.push(new Board(input.slice(i, i + 5)));
  }

  var lastWinningBoard,
    lastWinningNum;

  for(var i = 0; i < numbers.length; i++) {

    for(var j = 0; j < boards.length; j++) {
      var board = boards[j];

      var bingo = board.markNumber(numbers[i]);

      if(bingo) {
        var sum = board.getUnmarkedSum();

        if(!lastWinningBoard) {
          console.log('Answer 1', sum * numbers[i]);
        }

        lastWinningBoard = boards.splice(j, 1)[0];
        lastWinningNum = numbers[i];
        j--;
      }
    }
  }

  console.log('Answer 2', lastWinningBoard.getUnmarkedSum() * lastWinningNum);
}

function Board(numbers) {
  var marks = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  this.numbers = numbers;
  this.marks = marks;
  this.markNumber = markNumber;
  this.getUnmarkedSum = getUnmarkedSum;

  function markNumber(num) {
    var index = findIndex(num);

    if(!index) {
      return false;
    }

    marks[index[0]][index[1]] = 1;

    return checkForBingo(index[0], index[1]);
  }

  function findIndex(num) {
    for(var i = 0; i < numbers.length; i++) {
      var row = numbers[i].trim().split(/\s+/);

      for(var j = 0; j < row.length; j++) {
        if(row[j] == num) {
          return [i, j];
        }
      }
    }

    return null;
  }

  function checkForBingo(x, y) {
    var bingo = true;

    for(var i = 0; i < 5; i++) {
      bingo = bingo && marks[x][i];
    }

    if(bingo) {
      return true;
    }

    bingo = true;
    for(var i = 0; i < 5; i++) {
      bingo = bingo && marks[i][y];
    }

    return bingo;
  }

  function getUnmarkedSum() {
    var sum = 0;

    for(var i = 0; i < 5; i++) {
      for(var j = 0; j < 5; j++) {
        if(!marks[i][j]) {
          sum += parseInt(numbers[i].trim().split(/\s+/)[j]);
        }
      }
    }

    return sum;
  }
}