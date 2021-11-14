const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split(' ')
  .map(item => parseInt(item));

// Write values for part 1 to array
let metadata = [];

function parseTree() {
  let obj = {};
  // Set the header for the node
  obj.header = data.splice(0, 2);
  // Write children to array recursively, if there are any
  obj.child = [];
  for (let i = 0; i < obj.header[0]; i++) {
    obj.child.push(parseTree());
  }
  // Set metadata for node
  obj.metadata = data.splice(0, obj.header[1]);

  // Part 1: Write metadata values to array
  obj.metadata.forEach(item => metadata.push(item));

  // Part 2: Assign a value to the node, based on children.
  // If there are no children. Sum of metadata
  // If there are: Metadata are indexes, value is the value of children at those indexes
  obj.value = 0;
  if (obj.child.length === 0) {
    obj.value = obj.metadata.reduce((a, c) => {
      return a + c;
    });
  } else {
    obj.metadata.forEach(index => {
      if (obj.child[index - 1]) {
        obj.value += obj.child[index - 1].value;
      }
    });
  }

  return obj;
}

const tree = parseTree();

let result = metadata.reduce((acc, current) => {
  return acc + current;
});

console.log('Result for part 1: ', result);
console.log('Result for part 2: ', tree.value);
