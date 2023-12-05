var DAY = 1,
    year = 2023;

(function getInput(day) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://adventofcode.com/' + year + '/day/' + day + '/input');
  xhr.onload = function(){ 
    var input = xhr.response.split('\n');
    solve(input);
  };

  xhr.send();
})(DAY);

function solve(input) {
  var numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  (function part1() {
    var total1 = 0;

    for(var i = 0; i < input.length; i++) {
      total1 += getCalibration(input[i]);
    }

    console.log('Answer 1:', total1);
  })();

  (function part2() {
    var total2 = 0;

    for(var i = 0; i < input.length; i++) {
      total2 += getCalibrationPart2(input[i]);
    }

    console.log('Answer 2:', total2);
  })();

  function getCalibration(line) {
    var a, b;

    if(!line.length) {
      return 0;
    }

    for(var i = 0; i < line.length; i++) {
      if(!isNaN(parseInt(line.charAt(i)))) {
        a = line.charAt(i);
        break;
      }
    }

    for(var i = line.length - 1; i >= 0; i--) {
      if(!isNaN(parseInt(line.charAt(i)))) {
        b = line.charAt(i);
        break;
      }
    }

    return parseInt(a + b);
  }

  function getCalibrationPart2(line) {
    var a, b;

    if(!line.length) {
      return 0;
    }

    for(var i = 0; i < line.length; i++) {
      if(!isNaN(parseInt(line.charAt(i)))) {
        a = line.charAt(i);
        break;
      }

      for(var j = 0; j < numbers.length; j++) {
        if(line.startsWith(numbers[j], i)) {
          a = (j + 1).toString();
          break;
        }
      }

      if(a) {
        break;
      }
    }

    for(var i = line.length - 1; i >= 0; i--) {
      if(!isNaN(parseInt(line.charAt(i)))) {
        b = line.charAt(i);
        break;
      }

      for(var j = 0; j < numbers.length; j++) {
        if(line.endsWith(numbers[j], i + 1)) {
          b = (j + 1).toString();
          break;
        }
      }

      if(b) {
        break;
      }
    }

    return parseInt(a + b);
  }
}