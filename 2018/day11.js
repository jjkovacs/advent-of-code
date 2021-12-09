var DAY = 11;

(function getInput(day) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://adventofcode.com/2018/day/' + day + '/input');
  xhr.onload = function(){ 
    var input = xhr.response.trim();
    solve(parseInt(input));
  };

  xhr.send();
})(DAY);

function solve(input) {
  var serial = input;

  var part1 = findLargestPowerCluster(300, 300, 3);

  console.log('Part 1', 'LARGEST', part1.coordinate, part1.clusterSize, part1.powerLevel);

  var part2 = findLargestPowerCluster(300, 300);

  console.log('Part 2', 'LARGEST', part2.coordinate, part2.clusterSize, part2.powerLevel);

  function findLargestPowerCluster(gridSizeX, gridSizeY, clusterSize) {
    var largest = {};

    clusterSize = clusterSize || 0;

    for(var x = 1; x <= gridSizeX - clusterSize; x++) {
      for(var y = 1; y <= gridSizeY - clusterSize; y++) {
        if(clusterSize) {
          var clusterValue = calculateCluster(x, y, clusterSize);

          if(!largest.powerLevel || clusterValue > largest.powerLevel) {
            largest.powerLevel = clusterValue;
            largest.coordinate = x + ',' + y;
            largest.clusterSize = clusterSize;
          }
        } else {
          for(var i = 1; i < Math.min(gridSizeX - x + 1, gridSizeY - y + 1); i++) {
            var clusterValue = calculateCluster(x, y, i);
  
            if(!largest.powerLevel || clusterValue > largest.powerLevel) {
              largest.powerLevel = clusterValue;
              largest.coordinate = x + ',' + y;
              largest.clusterSize = i;
            }
          }
        }
      }
    }

    return largest;
  }

  function calculateCluster(x, y, clusterSize) {
    var total = 0;

    for(var i = x; i < x + clusterSize; i++) {
      for(var j = y; j < y + clusterSize; j++) {
        total += calculatePowerLevel(i, j);
      }
    }

    return total;
  }

  function calculatePowerLevel(x, y) {
    var rackId = x + 10,
      powerLevel = rackId * y;

    powerLevel += serial;
    powerLevel *= rackId;
    powerLevel = parseInt((powerLevel / 100) % 10);
    powerLevel -= 5;

    return powerLevel;
  }
}