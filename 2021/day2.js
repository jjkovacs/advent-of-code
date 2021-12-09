var DAY = 2;

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
  var position1 = {
    x: 0,
    y: 0
  }, position2 = {
    x: 0,
    y: 0,
    aim: 0
  };

  for(var i = 0; i < input.length; i++) {
    calculateMovePart1(input[i].split(' '), position1);
  }

  console.log('Answer 1', position1.x * position1.y);

  for(var i = 0; i < input.length; i++) {
    calculateMovePart2(input[i].split(' '), position2);
  }

  console.log('Answer 2', position2.x * position2.y);

  function calculateMovePart1(move, position) {
    switch(move[0]) {
      case 'forward':
        position.x += parseInt(move[1]);
        break;
      case 'up':
        position.y -= parseInt(move[1]);
        break;
      case 'down':
        position.y += parseInt(move[1])
        break;
      default:
        break;
    }
  }

  function calculateMovePart2(move, position) {
    switch(move[0]) {
      case 'forward':
        position.x += parseInt(move[1]);
        position.y += position.aim * parseInt(move[1]);
        break;
      case 'up':
        position.aim -= parseInt(move[1]);
        break;
      case 'down':
        position.aim += parseInt(move[1])
        break;
      default:
        break;
    }
  }
}