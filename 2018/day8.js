var DAY = 8;

(function getInput(day) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://adventofcode.com/2018/day/' + day + '/input');
  xhr.onload = function(){ 
    var input = xhr.response.trim().split(' ');
    solve(input);
  };

  xhr.send();
})(DAY);

function solve(input) {
  var nodeCount = 0,
    index = 0,
    metaCount = 0,
    tree = (function buildNode(){
      var node = {
        id: ++nodeCount,
        value: 0,
        children: []
      },
      numChildren = parseInt(input[index++]),
      numMetadata = parseInt(input[index++]);

      for(var i = 0; i < numChildren; i++) {
        node.children.push(buildNode());
      }

      node.metadata = input.slice(index, index += numMetadata);
      
      var metaSum = node.metadata.reduce(function(a, b){ return parseInt(a) + parseInt(b); }, 0);

      metaCount += metaSum;

      if(node.children.length) {
        for(var i = 0; i < node.metadata.length; i++) {
          node.value += (node.children[node.metadata[i] - 1] ? node.children[node.metadata[i] - 1].value : 0);
        }
      } else {
        node.value = metaSum;
      }

      return node;
    })();

  console.log(tree);
  console.log('Part 1', 'METADATA', metaCount);
  console.log('Part 2', 'TREE VALUE', tree.value);
}