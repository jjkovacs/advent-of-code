var DAY = 9;

(function getInput(day) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://adventofcode.com/2018/day/' + day + '/input');
  xhr.onload = function(){ 
    var numPlayers = parseInt(xhr.response.trim().split(' ')[0]),
      numMarbles = parseInt(xhr.response.trim().split(' ')[6]);
    solve(1, numPlayers, numMarbles);
  };

  xhr.send();
})(DAY);

function solve(part, numPlayers, numMarbles) {
  var CW = 1,
    CCW = -1,
    currentMarble = {
      id: 0
    },
    currentPlayer = 1,
    players = {};
  
  currentMarble.next = currentMarble;
  currentMarble.prev = currentMarble;
  
  (function play(){
    for(var nextMarble = 1; nextMarble <= numMarbles; nextMarble++) {
      if(!(nextMarble % 23)) {
        if(!players[currentPlayer]) {
          players[currentPlayer] = { score: 0 };
        }

        var marbleToRemove = getNode(currentMarble, 7 * CCW),
          prev = marbleToRemove.prev,
          next = marbleToRemove.next;
          
        prev.next = next;
        next.prev = prev;

        players[currentPlayer].score += (nextMarble + marbleToRemove.id);

        currentMarble = next;
      } else {
        var insertAt = getNode(currentMarble, 1 * CW),
          next = insertAt.next,
          marble = {
            id: nextMarble,
            next: next,
            prev: insertAt
          };

        insertAt.next = marble;
        next.prev = marble;

        currentMarble = marble;
      }

      currentPlayer = (currentPlayer % numPlayers) + 1;
    }
  })();

  var winner = (function findWinner(){
    var highest;
    for(var player in players) {
      if(!highest) {
        highest = player;
        continue;
      }

      if(players[player].score > players[highest].score) {
        highest = player;
      }
    }

    return highest;
  })();

  console.log('Part ' + part, 'WINNING ELF IS', winner, 'SCORE', players[winner].score);

  if(part === 1) {
    return solve(2, numPlayers, numMarbles * 100);
  }

  function getNode(node, steps) {
    for(var i = 0; i < Math.abs(steps); i++) {
      node = (steps > 0 ? node.next : node.prev);
    }
    
    return node;
  }
}