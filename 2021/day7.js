var DAY = 7;

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
  var list = input[0]
    .split(',')
    .map(function(item){ return parseInt(item);})
    .sort(function(a, b){ return a - b; }),
    leastFuel;

  for(var i = list[0]; i <= list[list.length - 1]; i++) {
    var cost = calculateTotalFuel(list, i);

    if(!leastFuel || leastFuel.cost > cost) {
      leastFuel = {
        cost: cost,
        position: i
      };
    }
  }

  console.log('Answer 1', leastFuel);

  var leastFuel2;

  for(var i = list[0]; i <= list[list.length - 1]; i++) {
    var cost = calculatePart2TotalFuel(list, i);

    if(!leastFuel2 || leastFuel2.cost > cost) {
      leastFuel2 = {
        cost: cost,
        position: i
      };
    }
  }

  console.log('Answer 2', leastFuel2);

  function calculateTotalFuel(list, position) {
    var fuelCost = 0;

    for(var i = 0; i < list.length; i++) {
      fuelCost += Math.abs(position - list[i]);
    }

    return fuelCost;
  }

  function calculatePart2TotalFuel(list, position) {
    var fuelCost = 0;

    for(var i = 0; i < list.length; i++) {
      var numMoves = Math.abs(position - list[i]);

      for(var j = 1; j <= numMoves; j++) {
        fuelCost += j;
      }
    }

    return fuelCost;
  }
}