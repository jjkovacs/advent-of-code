var DAY = 3;

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
  var counts = []

  for(var i = 0; i < input.length; i++) {
    var line = input[i];

    if(isNaN(parseInt(line, 2))) {
      continue;
    }

    for(var j = 0; j < line.length; j++) {
      if(!counts[j]) {
        counts.push({
          num0: 0,
          num1: 0
        });
      }

      line.charAt(j) === '1' ? counts[j].num1++ : counts[j].num0++;
    }
  }

  var gammaRate = '',
    epsilonRate = '';

  for(var i = 0; i < counts.length; i++) {
    if(counts[i].num1 > counts[i].num0) {
      gammaRate += '1';
      epsilonRate += '0';
    } else {
      gammaRate += '0';
      epsilonRate += '1';
    }
  }

  console.log('Answer 1', parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

  var list = [...input],
    position = 0,
    oxGenRating,
    co2ScrubRating;

  // get oxygen generator rating
  do {
    var lists = splitList(list, position);

    lists.arr0.length > lists.arr1.length ? list = lists.arr0 : list = lists.arr1;

    position++;
  }while(list.length > 1);

  oxGenRating = parseInt(list[0], 2);

  //get co2 scrubber rating
  list = [...input];
  position = 0;

  do {
    var lists = splitList(list, position);

    lists.arr1.length < lists.arr0.length ? list = lists.arr1 : list = lists.arr0;

    position++;
  }while(list.length > 1);

  co2ScrubRating = parseInt(list[0], 2);

  console.log('Answer 2', oxGenRating * co2ScrubRating);

  function splitList(list, position) {
    var lists = {
      arr0: [],
      arr1: []
    };
    for(var i = 0; i < list.length; i++) {
      if(isNaN(parseInt(list[i], 2))) {
        continue;
      }

      list[i].charAt(position) === '0' ? lists.arr0.push(list[i]) : lists.arr1.push(list[i]);
    }

    return lists;
  }
}