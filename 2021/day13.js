var DAY = 13;

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
  var map = {},
    folds = [];

  for(var i = 0; i < input.length; i++) {
    var line = input[i];

    if(!line.length) {
      continue;
    }

    var split = line.split('fold along ');

    if(split.length === 2) {
      folds.push(split[1]);
    } else {
      map[split[0]] = '#';
      var x = parseInt(split[0].split(',')[0]),
        y = parseInt(split[0].split(',')[1]);

      if(!map.maxX || x > map.maxX) {
        map.maxX = x;
      }

      if(!map.maxY || y > map.maxY) {
        map.maxY = y;
      }
    }
  }

  for(var i = 0; i < folds.length; i++) {
    var foldAxis = folds[i].split('=')[0],
      foldLine = parseInt(folds[i].split('=')[1]);

    switch(foldAxis) {
      case 'x':
        foldX(foldLine, map);
        break;
      case 'y':
        foldY(foldLine, map);
        break;
    }

    if(i === 0) {
      console.log('Answer 1', Object.keys(map).length - 2);
    }
  }

  console.log('Answer 2');
  printMap(map);
}

function printMap(map) {
  for(var i = 0; i <= map.maxY; i++) {
    var line = '';
    for(var j = 0; j <= map.maxX; j++) {
      line += (map[j + ',' + i] || ' ');
    }
    console.log(line);
  }
}

function foldX(foldLine, map) {
  for(var i = foldLine + 1; i <= map.maxX; i++) {
    for(var j = 0; j <= map.maxY; j++) {
      if(map[i + ',' + j]) {
        var distanceFromFold = i - foldLine;

        map[(foldLine - distanceFromFold) + ',' + j] = '#';
        delete map[i + ',' + j];
      }
    }
  }

  map.maxX = foldLine - 1;
}

function foldY(foldLine, map) {

  for(var i = 0; i <= map.maxX; i++) {
    for(var j = foldLine + 1; j <= map.maxY; j++) {
      if(map[i + ',' + j]) {
        var distanceFromFold = j - foldLine;

        map[i + ',' + (foldLine - distanceFromFold)] = '#';
        delete map[i + ',' + j];
      }
    }
  }

  map.maxY = foldLine - 1;
}