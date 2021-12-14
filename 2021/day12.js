var DAY = 12;

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
  var nodes = {},
    paths;

  for(var i = 0; i < input.length; i++) {
    if(!input[i].length) {
      continue;
    }

    var nodeAId = input[i].split('-')[0],
      nodeBId = input[i].split('-')[1],
      nodeA = nodes[nodeAId] || new Node(nodeAId),
      nodeB = nodes[nodeBId] || new Node(nodeBId);

    nodeA.addNeighbor(nodeB);
    nodeB.addNeighbor(nodeA);

    if(!nodes[nodeAId]) {
      nodes[nodeAId] = nodeA;
    }

    if(!nodes[nodeBId]) {
      nodes[nodeBId] = nodeB;
    }
  }
  
  paths = getPaths(isEligiblePart1, nodes['start']);

  console.log('Answer 1', paths.length);
  
  paths = getPaths(isEligiblePart2, nodes['start']);

  console.log('Answer 2', paths.length);
}

function getPaths(isEligibleFn, currentNode, currentPath, paths) {
  if(!paths) {
    paths = [];
  }

  if(!currentPath) {
    currentPath = [];
  }

  currentPath = currentPath.concat([currentNode]);

  if(currentNode.isEnd()) {
    paths.push(currentPath);
    return;
  }

  var neighbors = currentNode.getNeighbors();

  for(var i = 0; i < neighbors.length; i++) {
    var neighbor = neighbors[i];

    if(isEligibleFn(neighbor, currentPath)) {
      getPaths(isEligibleFn, neighbor, currentPath, paths);
    }
  }

  return paths;
}

function isEligiblePart1(node, currentPath) {
  return node.isBigNode() || currentPath.indexOf(node) === -1;
}

function isEligiblePart2(node, currentPath) {
  if(node.isStart()) {
    return false;
  }

  if(node.isBigNode() || currentPath.indexOf(node) === -1) {
    return true;
  }

  for(var i = 0; i < currentPath.length; i++) {
    if(!currentPath[i].isBigNode() && (currentPath.indexOf(currentPath[i]) !== currentPath.lastIndexOf(currentPath[i]))) {
      return false;
    }
  }

  return true;
}

function  Node(id) {
  var neighbors = [];

  this.isBigNode = isBigNode;
  this.getNeighbors = getNeighbors;
  this.addNeighbor = addNeighbor;
  this.isStart = isStart;
  this.isEnd = isEnd;

  function getId() {
    return id;
  }

  function isBigNode() {
    return id.charCodeAt(0) >=65 && id.charCodeAt(0) <= 90;
  }

  function getNeighbors() {
    return neighbors;
  }

  function addNeighbor(node) {
    neighbors.push(node);
  }

  function isStart() {
    return id === 'start';
  }

  function isEnd() {
    return id === 'end';
  }
}