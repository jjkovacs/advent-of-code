var DAY = 4;

(function getInput(day) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://adventofcode.com/2018/day/' + day + '/input');
  xhr.onload = function(){ 
    var input = xhr.response.split('\n');
    solve(input);
  };

  xhr.send();
})(DAY);

function solve(input) {
  var parsedInput = input.map(function(i){
    var date = new Date(i.substr(1, 16)),
      event = i.substr(19),
      guard = event.match(/\d+/g) ? event.match(/\d+/g)[0] : null;

    
    return {
      date: date,
      event: event,
      guard: guard
    };
  });

  var sortedInput = parsedInput.sort(function(a, b){
    return a.date - b.date;
  });

  var currentGuard,
    fellAsleepAt,
    log = {},
    sleepiestGuard,
    sleepiestMinute;

  for(var i = 0; i < sortedInput.length; i++) {
    var e = sortedInput[i];

    if(e.event.endsWith('begins shift')) {
      currentGuard = e.guard;
    } else if(e.event.endsWith('falls asleep')) {
      fellAsleepAt = e.date;
    } else if(e.event.endsWith('wakes up')) {

      if(!log[currentGuard]) {
        log[currentGuard] = {
          totalMinsAsleep: 0,
          timesAsleepPerMin: {}
        };
      }

      var minsAsleep = (e.date - fellAsleepAt) / 60000;

      log[currentGuard].totalMinsAsleep += minsAsleep;

      for(var j = fellAsleepAt.getMinutes(); j < (fellAsleepAt.getMinutes() + minsAsleep); j++) {

        if(!log[currentGuard].timesAsleepPerMin[j]) {
          log[currentGuard].timesAsleepPerMin[j] = 0;
        }

        log[currentGuard].timesAsleepPerMin[j]++;
      }
    }
  }

  for(var guard in log) {
    if(!sleepiestGuard || 
      (log[guard].totalMinsAsleep > log[sleepiestGuard].totalMinsAsleep)) {
      sleepiestGuard = guard;
    }
  }

  console.log('Part 1', 'SLEEPIEST GUARD', sleepiestGuard);

  for(var minute in log[sleepiestGuard].timesAsleepPerMin) {
    if(!sleepiestMinute ||
      (log[sleepiestGuard].timesAsleepPerMin[minute] > log[sleepiestGuard].timesAsleepPerMin[sleepiestMinute])) {
      sleepiestMinute = minute;
    }
  }

  console.log('Part 1', 'SLEEPIEST MINUTE', sleepiestMinute);
  console.log('Part 1', 'ANSWER', sleepiestGuard * sleepiestMinute);

  var habitualMinute = null,
    habitualGuard = null;
  for(var guard in log) {
    if(habitualGuard === null) {
      habitualGuard = guard;
    }

    for(var minute in log[guard].timesAsleepPerMin) {
      if(habitualMinute === null) {
        habitualMinute = minute;
      }

      if(log[guard].timesAsleepPerMin[minute] > log[habitualGuard].timesAsleepPerMin[habitualMinute]) {
        habitualGuard = guard;
        habitualMinute = minute;
      }
    }
  }

  console.log('Part 2', 'HABITUAL GUARD', habitualGuard);
  console.log('Part 2', 'HABITUAL MINUTE', habitualMinute);
  console.log('Part 2', 'ANSWER', habitualGuard * habitualMinute);
}