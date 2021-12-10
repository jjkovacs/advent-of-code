var DAY = 5;

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
  var board = new Board();

  for(var i = 0; i < input.length; i++) {
    var line = parseLine(input[i]);

    if(!line) {
      continue;
    }

    board.addLine(line);
  }

  console.log('Answer 1', board.getOverlaps().length);
  console.log('Answer 2', board.getVertOverlaps().length);
}

function parseLine(line) {
  var parts = line.split('->');

  if(parts.length < 2) {
    return null;
  }

  return {
    a: [parseInt(parts[0].trim().split(',')[0]), parseInt(parts[0].trim().split(',')[1])],
    b: [parseInt(parts[1].trim().split(',')[0]), parseInt(parts[1].trim().split(',')[1])]
  };
}

function Board() {
  var vertHorizMap = {},
    diagMap = {};

  this.addLine = addLine;
  this.getOverlaps = getOverlaps;
  this.getVertOverlaps = getVertOverlaps;

  function addLine(line) {

    var points = getAllLinePoints(line);

    for(var i = 0; i < points.length; i++) {
      var point = points[i];

      if(!diagMap[point]) {
        diagMap[point] = 0;
      }

      diagMap[point]++;

      if(!isDiagonal(line)) {
        if(!vertHorizMap[point]) {
          vertHorizMap[point] = 0;
        }

        vertHorizMap[point]++;
      }
    }
  }

  function getOverlaps() {
    var overlaps = [];

    for(var key in vertHorizMap) {
      if(vertHorizMap[key] > 1) {
        overlaps.push(key);
      }
    }

    return overlaps;
  }

  function getVertOverlaps() {
    var overlaps = [];

    for(var key in diagMap) {
      if(diagMap[key] > 1) {
        overlaps.push(key);
      }
    }

    return overlaps;
  }

  function isDiagonal(line) {
    return (line.a[0] !== line.b[0]) && (line.a[1] !== line.b[1]);
  }

  function getAllLinePoints(line) {
    var points = [],
      i = line.a[0],
      j = line.a[1],
      xDirection = (line.b[0] - line.a[0]) / Math.max(Math.abs(line.b[0] - line.a[0]), 1),
      yDirection = (line.b[1] - line.a[1]) / Math.max(Math.abs(line.b[1] - line.a[1]), 1);

    points.push(i + ',' + j);

    while(!(i === line.b[0] && j === line.b[1])) {
      i += xDirection;
      j += yDirection;

      points.push(i + ',' + j);
    }

    return points;
  }
}