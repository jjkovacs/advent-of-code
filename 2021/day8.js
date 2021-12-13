var DAY = 8;

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
  var parsed = [],
    appearances = 0,
    totalCount = 0;

  for(var i = 0; i < input.length; i++) {
    var outputValue = input[i].split('|');

    if(outputValue.length === 2) {
      parsed = parsed.concat(outputValue[1].trim().split(/\s+/));
    }
  }

  for(var i = 0; i < parsed.length; i++) {
    var item = parsed[i];

    if(item.length === 2 || item.length === 3 || item.length === 4 || item.length === 7) {
      appearances++;
    }
  }

  console.log('Answer 1', appearances);

  for(var i = 0; i < input.length; i++) {
    var line = input[i];
    
    if(line.length) {
      totalCount += decode(line);
    }
  }

  console.log('Answer 2', totalCount);
}

function decode(line) {
  var map = {},
    numbers = line.split('|')[0].trim().split(/\s+/),
    outputValue = line.split('|')[1].trim().split(/\s+/),
    decodedOutput = '';

  do {
    for(var i = 0; i < numbers.length; i++) {
      var number = numbers[i],
        decoded = getNumber(number, map);

        //console.log('Evaluating', number, map);
      if(decoded !== null) {
        map[decoded] = number;
      }
    }

  }while(Object.keys(map).length !== 10);

  for(var i = 0; i < outputValue.length; i++) {
    for(var j = 0; j < 10; j++) {
      if(outputValue[i].length === map[j].length && 
        getNumSharedSegments(outputValue[i], map[j]) === outputValue[i].length) {
        decodedOutput += j;
      }
    }
  }

  return parseInt(decodedOutput);
}

function getNumber(value, map) {
  switch(value.length) {
    case 2:
      return 1;
    case 3:
      return 7;
    case 4:
      return 4;
    case 7:
      return 8;
  }

  // this must be 2, 3, or 5
  if(value.length === 5) {
    // if 7 fits inside, then it's 3
    if(map[7] && getNumSharedSegments(value, map[7]) === 3) {
      return 3;
    }

    // if 3/4 of 4 fits inside, then it's 5
    else if(map[4] && getNumSharedSegments(value, map[4]) === 3) {
      return 5;
    }

    // else it's 2
    else if(map[7] && map[4]) {
      return 2;
    }
  }

  // this must be 0, 6, or 9
  if(value.length === 6) {
    // if 4 fits inside, then it's 9
    if(map[4] && getNumSharedSegments(value, map[4]) === 4) {
      return 9;
    }

    // if 7 fits inside, then it's 0
    else if(map[7] && getNumSharedSegments(value, map[7]) === 3) {
      return 0;
    }

    // else it's 6
    else if(map[4] && map[7]) {
      return 6;
    }
  }

  return null;
}

function getNumSharedSegments(segment1, segment2) {
  var count = 0;

  for(var i = 0; i < segment2.length; i++) {
    var char = segment2.charAt(i);

    if(segment1.indexOf(char) > -1) {
      count++;
    }
  }

  return count;
}