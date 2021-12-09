var DAY = 6;

(function getInput(day) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://adventofcode.com/2018/day/' + day + '/input');
  xhr.onload = function(){ 
    var input = xhr.response.trim().split('\n');
    solve(input);
  };

  xhr.send();
})(DAY);

function solve(input) {

  var leftBound,
    rightBound,
    topBound,
    bottomBound,
    coords = input.map(function(coord, index){
      var x = parseInt(coord.split(', ')[0]),
        y = parseInt(coord.split(', ')[1]);

      if(leftBound === undefined || (x < leftBound)) {
        leftBound = x;
      }

      if(rightBound === undefined || (x > rightBound)) {
        rightBound = x;
      }

      if(topBound === undefined || (y < topBound)) {
        topBound = y;
      }

      if(bottomBound === undefined || (y > bottomBound)) {
        bottomBound = y;
      }

      return {
        id: index,
        x: x,
        y: y,
        area: 0
      };
    });
  
  console.log('INPUT BOUNDS', '('.concat(leftBound, ',', topBound, ')'), '('.concat(rightBound, ',', bottomBound, ')'));
  
  var infinite = [];

  (function calculateAreas() {
    
    for(var x = leftBound; x <= rightBound; x++) {
      for(var y = topBound; y <= bottomBound; y++) {
        var closest = getClosestCoordTo({ x: x, y: y});

        if(closest.length !== 1) {
          continue;
        }

        closest[0].area++;

        if(isOnBorder({ x: x, y: y})) {
          if(infinite.indexOf(closest[0].id) === -1) {
            infinite.push(closest[0].id);
          }
        }
      }
    }

    function isOnBorder(point) {
      return point.x === leftBound || point.x === rightBound || point.y === topBound || point.y === bottomBound;
    }

    function getClosestCoordTo(point) {
      var closestCoords = [],
        closestDistance;

      coords.forEach(function(coord){
        if(!closestCoords.length) {
          closestCoords.push(coord);
          closestDistance = getDistance(coord, point);
          return;
        }
        
        var d = getDistance(coord, point);

        if(d === closestDistance) {
          closestCoords.push(coord);
        } else if (d < closestDistance) {
          closestCoords = [coord];
          closestDistance = d;
        }
      })

      return closestCoords;
    }
  })();

  var largestFiniteArea = (function(){
    var largest;

    coords.forEach(function(coord){
      if(infinite.indexOf(coord.id) !== -1) {
        return;
      }

      if(!largest || coord.area > largest.area) {
        largest = coord;
      }
    });

    return largest;
  })();

  console.log('Part 1', 'COORDINATE WITH LARGEST FINITE AREA', '('.concat(largestFiniteArea.x, ',', largestFiniteArea.y, ')'));
  console.log('Part 1', 'AREA', largestFiniteArea.area);

  var SUMMANHATTAN = 10000,
    regionSize = 0;

  for(var x = leftBound; x <= rightBound; x++) {
    for(var y = topBound; y <= bottomBound; y++) {
      var point = { x: x, y: y},
        distance = 0;

      for(var i = 0; i < coords.length; i++) {
        var coord = coords[i];

        distance += getDistance(coord, point);

        if(distance >= SUMMANHATTAN) {
          break;
        }
      }

      if(distance < SUMMANHATTAN) {
        regionSize++;
      }
    }
  }

  console.log('Part 2', 'REGION SIZE', regionSize);

  function getDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
}