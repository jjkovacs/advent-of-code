var DAY = 10;

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
  var illegalChars = [],
    part1Score = 0,
    part2Scores = [],
    scores = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137
    };

  for(var i = 0; i < input.length; i++) {
    if(!input[i].length) {
      continue;
    }

    var char = verifyLine(input[i]);

    if(char) {
      illegalChars.push(char);
    } else {
      part2Scores.push(completeLine(input[i]));
    }
  }

  for(var i = 0; i < illegalChars.length; i++) {
    part1Score += scores[illegalChars[i]];
  }

  console.log('Answer 1', part1Score);

  part2Scores.sort(function(a, b){ return a - b;});

  console.log('Answer 2', part2Scores[Math.floor(part2Scores.length / 2)]);
}

function verifyLine(line) {
  var stack = [];

  for(var i = 0; i < line.length; i++) {
    switch(line.charAt(i)) {
      case '(':
      case '[':
      case '{':
      case '<':
        stack.push(line.charAt(i));
        break;
      case ')':
      case ']':
      case '}':
      case '>':
        var openChar = stack.pop();
        if(!verifyChunk(openChar, line.charAt(i))) {
          return line.charAt(i);
        }
    }
  }
}

function verifyChunk(open, close) {
  switch(open) {
    case '(':
      return close === ')';
    case '[':
      return close === ']';
    case '{':
      return close === '}';
    case '<':
      return close === '>';
  }
}

function completeLine(line) {
  var score = 0;

  var stack = [];

  for(var i = 0; i < line.length; i++) {
    switch(line.charAt(i)) {
      case '(':
      case '[':
      case '{':
      case '<':
        stack.push(line.charAt(i));
        break;
      case ')':
      case ']':
      case '}':
      case '>':
        stack.pop();
        break;
    }
  }

  while(stack.length) {
    var item = stack.pop();

    score *= 5;

    switch(item) {
      case '(':
        score += 1;
        break;
      case '[':
        score += 2;
        break;
      case '{':
        score += 3;
        break;
      case '<':
        score += 4;
        break;
    }
  }

  return score;
}