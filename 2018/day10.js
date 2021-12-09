var DAY = 10;

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
  var points = input.map(function(line){
    var parsed = line.match(/[-]*[\d]+/g);

    return {
      position: {
        x: parseInt(parsed[0]),
        y: parseInt(parsed[1])
      },
      velocity: {
        x: parseInt(parsed[2]),
        y: parseInt(parsed[3])
      }
    };
  });

  var bounds = getBounds(),
    secondsElapsed = 0;
  do {
    points.forEach(function(point){
      point.position.x += point.velocity.x;
      point.position.y += point.velocity.y;
    });

    bounds = getBounds();
    secondsElapsed++;
  }while((bounds.yMax - bounds.yMin) > 9);

  print();

  function print() {
    bounds = getBounds();
    var msg = new Array(bounds.yMax - bounds.yMin + 1);

    points.forEach(function(point){
      var x = point.position.x - bounds.xMin,
        y = point.position.y - bounds.yMin;
      
      if(!msg[y]) {
        msg[y] = new Array(bounds.xMax - bounds.xMin + 1);
        for(var i = 0; i < msg[y].length; i++) {
          msg[y][i] = ' ';
        }
      }

      msg[y][x] = '#';
    });

    console.log('Part 1');

    msg.forEach(function(line, index){
      console.log(index, line.slice(0, line.length).join(''));
    });

    console.log('Part 2', secondsElapsed, 'SECONDS HAVE ELAPSED');
  }

  function getBounds() {
    var xMin, xMax, yMin, yMax;
    
    points.forEach(function(point){
      if(yMin === undefined || point.position.y < yMin) {
        yMin = point.position.y;
      }

      if(yMax === undefined || point.position.y > yMax) {
        yMax = point.position.y;
      }
      if(xMin === undefined || point.position.x < xMin) {
        xMin = point.position.x;
      }

      if(xMax === undefined || point.position.x > xMax) {
        xMax = point.position.x;
      }
    });

    return {
      xMin: xMin,
      xMax: xMax,
      yMin: yMin,
      yMax: yMax
    };
  }
}