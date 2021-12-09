var DAY = 5;

(function getInput(day) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://adventofcode.com/2018/day/' + day + '/input');
  xhr.onload = function(){ 
    var input = xhr.response;
    solve(input.trim());
  };

  xhr.send();
})(DAY);

function solve(input) {

  function dissolve(polymer) {
    for(var i = 0; i < polymer.length - 1; i++) {
      if(Math.abs(polymer.charCodeAt(i) - polymer.charCodeAt(i + 1)) === 32) {
        polymer = (polymer.substr(0, i) + polymer.substr(i + 2));
        i-=2;
      }
    }

    return polymer;
  };

  var part1 = dissolve(input);

  console.log('Part 1', 'FINAL POLYMER', part1);
  console.log('Part 1', 'ANSWER', part1.length);

  var smallest,
    char;
  for(var i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    var removed = input.replace(new RegExp(String.fromCharCode(i), 'g'), '').replace(new RegExp(String.fromCharCode(i + 32), 'g'), ''),
      dissolved = dissolve(removed);

    if(!smallest || (dissolved.length < smallest.length)) {
      smallest = dissolved;
      char = i;
    }
  }

  console.log('Part 2', 'SMALLEST POLYMER', smallest);
  console.log('Part 2', 'UNIT REMOVED', String.fromCharCode(char) + '/' + String.fromCharCode(char + 32));
  console.log('Part 2', 'ANSWER', smallest.length);
}