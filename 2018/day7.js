var DAY = 7;

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
  var stepTree = {};

  (function buildStepTree(){
    input.forEach(function(step){
      var parentName = step.trim().split(' ')[1],
        childName = step.trim().split(' ')[7];
      
      if(!stepTree[parentName]) {
        stepTree[parentName] = {
          id: parentName,
          children: [],
          parents: []
        }
      }
      
      if(!stepTree[childName]) {
        stepTree[childName] = {
          id: childName,
          children: [],
          parents: []
        }
      }

      var parent = stepTree[parentName],
        child = stepTree[childName];
      parent.children.push(child);
      child.parents.push(parent);
    });
  })();

  var available = [];
  for(var step in stepTree) {
    if(!stepTree[step].parents.length) {
      available.push(stepTree[step]);
    }
  }

  var completionOrder = [];

  do {
    available.sort(sort);

    var step = available.splice(0, 1)[0];

    step.completed = true;
    completionOrder.push(step.id);

    for(var i = 0; i < step.children.length; i++) {
      var child = step.children[i],
        nowAvailable = true;

      for(var j = 0; j < child.parents.length; j++) {
        if(!child.parents[j].completed) {
          nowAvailable = false;
          break;
        }
      }

      if(nowAvailable) {
        available.push(child);
      }
    }

  } while(available.length);

  console.log('Part 1', 'STEPS', completionOrder.join(''));

  var available = [];
  for(var step in stepTree) {
    if(!stepTree[step].parents.length) {
      available.push(stepTree[step]);
    }
  }

  var completionOrder = [],
    workers = [],
    NUMWORKERS = 5,
    time = -1;

  do {
    time++;

    // has anything completed?
    for(var w = 0; w < workers.length; w++) {
      var worker = workers[w];

      if(worker.completesOn === time) {
        worker.step.completed2 = true;
        completionOrder.push(worker.step.id);
        workers.splice(w, 1);
        w--;

        for(var i = 0; i < worker.step.children.length; i++) {
          var child = worker.step.children[i],
            nowAvailable = true;

          for(var j = 0; j < child.parents.length; j++) {
            if(!child.parents[j].completed2) {
              nowAvailable = false;
              break;
            }
          }

          if(nowAvailable) {
            available.push(child);
          }
        }
      }
    }

    // try to keep our workers busy
    available.sort(sort);

    while(available.length > 0 && workers.length < NUMWORKERS) {
      var job = available.splice(0, 1)[0];
      workers.push({
        step: job,
        completesOn: getCompletionTime(time, job.id)
      });
    }

  } while(available.length || workers.length);

  console.log('Part 2', 'COMPLETED THE JOB IN '.concat(time, 's WITH ', NUMWORKERS, ' WORKERS'));

  function sort(a, b) {
    return a.id.localeCompare(b.id);
  }

  function getCompletionTime(currentTime, letter) {
    return currentTime + 60 + (letter.toLowerCase().charCodeAt(0) - 96);
  }
}