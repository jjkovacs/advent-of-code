var DAY = 9;

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
  var riskLevelSum = 0,
    basins = [];

  for(var i = 0; i < input.length; i++) {
    for(var j = 0; j < input[i].length; j++) {
      if(isLowPoint(i, j, input)) {
        riskLevelSum += (parseInt(input[i].charAt(j)) + 1);
        basins.push(getBasinSize(i, j, input, {}));
      }
    }
  }

  console.log('Answer 1', riskLevelSum);

  basins.sort(function(a, b){ return b - a; });

  console.log('Answer 2', basins[0] * basins[1] * basins[2]);
}

function isLowPoint(x, y, input) {
  if(x > 0) {
    if(parseInt(input[x - 1].charAt(y)) <= parseInt(input[x].charAt(y))) {
      return false;
    }
  }

  if(x < input.length - 1) {
    if(parseInt(input[x + 1].charAt(y)) <= parseInt(input[x].charAt(y))) {
      return false;
    }
  }

  if(y > 0) {
    if(parseInt(input[x].charAt(y - 1)) <= parseInt(input[x].charAt(y))) {
      return false;
    }
  }

  if(y < input[x].length - 1) {
    if(parseInt(input[x].charAt(y + 1)) <= parseInt(input[x].charAt(y))) {
      return false;
    }
  }

  return true;
}

function getBasinSize(x, y, input, alreadyCounted) {
  if(x < 0 || x >= input.length || y < 0 || y >= input[x].length || input[x].charAt(y) === '9' || alreadyCounted[x + ',' + y]) {
    return 0;
  }
  
  alreadyCounted[x + ',' + y] = true;

  return 1 + 
    getBasinSize(x - 1, y, input, alreadyCounted) + 
    getBasinSize(x + 1, y, input, alreadyCounted) + 
    getBasinSize(x, y - 1, input, alreadyCounted) + 
    getBasinSize(x, y + 1, input, alreadyCounted);
}