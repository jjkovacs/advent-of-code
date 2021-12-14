var DAY = 11;

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
  var octopi = [],
    numTotalFlashes = 0,
    stepWhereAllFlashed,
    STEPS = 100;

  for(var i = 0; i < input.length; i++) {
    if(!input[i].length) {
      continue;
    }

    octopi.push([]);
    for(var j = 0; j < input[i].length; j++) {
      octopi[i].push(new Octopus(parseInt(input[i].charAt(j)), i, j));
    }
  }

  for(var i = 0; i < STEPS ; i++) {
    var flashesThisStep = 0;

    for(var j = 0; j < octopi.length; j++) {
      for(var k = 0; k < octopi[j].length; k++) {
        flashesThisStep += octopi[j][k].increment(i, octopi);
      }
    }

    if(flashesThisStep === (octopi.length * octopi[0].length)) {
      stepWhereAllFlashed = i + 1;
    }
  }

  for(var i = 0; i < octopi.length; i++) {
    for(var j = 0; j < octopi[i].length; j++) {
      numTotalFlashes += octopi[i][j].getNumFlashes();
    }
  }

  console.log('Answer 1', numTotalFlashes);

  var step = STEPS;
  while(!stepWhereAllFlashed) {
    step++;
    flashesThisStep = 0;
    for(var i = 0; i < octopi.length; i++) {
      for(var j = 0; j < octopi[i].length; j++) {
        flashesThisStep += octopi[i][j].increment(step, octopi);
      }
    }

    if(flashesThisStep === octopi.length * octopi[0].length) {
      stepWhereAllFlashed = step;
    }
  }

  stepWhereAllFlashed = step;

  console.log('Answer 2', stepWhereAllFlashed);
}

function Octopus(initialEnergy, x, y) {
  var energyLevel,
    numFlashes = 0,
    lastFlashStep = -1;

  this.increment = increment;
  this.getNumFlashes = getNumFlashes;

  (function init() {
    energyLevel = initialEnergy;
  })();

  function increment(currentStep, map) {
    var numFlashesThisStep = 0;

    if(energyLevel === 0 && lastFlashStep === currentStep) {
      return numFlashesThisStep;
    }

    energyLevel++;

    if(energyLevel > 9) {
      energyLevel = 0;
      numFlashes++;
      numFlashesThisStep++;
      lastFlashStep = currentStep;

      // increment neighbors
      for(var i = Math.max(0, x - 1); i <= Math.min(map.length - 1, x + 1); i++) {
        for(var j = Math.max(0, y - 1); j <= Math.min(map[x].length - 1, y + 1); j++) {
          if(i === x && j === y) {
            continue;
          }

          numFlashesThisStep += map[i][j].increment(currentStep, map);
        }
      }
    }

    return numFlashesThisStep;
  }

  function getNumFlashes() {
    return numFlashes;
  }
}