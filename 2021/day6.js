var DAY = 6;

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
  var fishList = input[0].split(',');

  console.log('Answer 1', getNumFishAfterDays(fishList, 80));
  console.log('Answer 2', getNumFishAfterDays(fishList, 256));
}

function getNumFishAfterDays(fishList, days) {
  var count = 0,
    ageMap = {}; // any given starting internal age will produce the same amount of descendents, so calculate it once and cache it

  for(var i = 0; i < fishList.length; i++) {
    var descendents = 0,
      fish = parseInt(fishList[i]);

    // count this fish
    count++;

    // if we've already calculated how many descendents a fish of this 
    // internal age will produce then use it. otherwise, calculate it
    if(ageMap[fish]) {
      descendents = ageMap[fish];
    } else {
      descendents = getNumDescendents(fish, days, ageMap);
      ageMap[fish] = descendents;
    }

    // add all of this fish's descendents to the count
    count += descendents;
  }

  return count;
}

function getNumDescendents(age, days, ageMap) {
  var firstBirth = age + 1,
    DAYSTOPRODUCE = 7,
    NEWBORNAGE = 9;

  // calculate the number of children this fish will produce within {days} days
  var numTotalChildren = parseInt((days - firstBirth) / DAYSTOPRODUCE) + 1,
    descendents = 0;

  // recursively determine how many children the new fishes will produce
  for(var i = 0; i < numTotalChildren; i++) {
    var newFishAge = firstBirth + (i * DAYSTOPRODUCE) + NEWBORNAGE - 1;

    if(newFishAge < days) {
      if(ageMap[newFishAge]) {
        descendents += ageMap[newFishAge];
      } else {
        var num = getNumDescendents(newFishAge, days, ageMap);
        ageMap[newFishAge] = num;
        descendents += num;
      }
    }
  }

  return numTotalChildren + descendents;
}