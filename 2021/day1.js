var DAY = 1;

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
  var part1Increases = 0,
    part2Increases = 0;

  for(var i = 1; i < input.length; i++) {
    if(!parseInt(input[i]) || !parseInt(input[i-1])) {
      continue;
    }

    if(parseInt(input[i]) > parseInt(input[i-1])) {
      part1Increases++;
    }
  }

  console.log('Answer 1:', part1Increases);

  var windowSize = 3;

  for(var i = 1; i <= input.length - windowSize; i++) {
    if(getWindowSum(input, i, windowSize) > getWindowSum(input, i-1, windowSize)) {
      part2Increases++;
    }
  }

  console.log('Answer 2:', part2Increases);

  function getWindowSum(input, index, windowSize) {
    var sum = 0;

    for(var i = index; i < (index + windowSize); i++) {
      sum += parseInt(input[i]);
    }

    return sum;
  }
}