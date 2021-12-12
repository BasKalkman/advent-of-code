const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/);
// const data = fs.readFileSync('./example.txt', 'utf-8').split(/\r?\n/);
// const data = fs.readFileSync('./example2.txt', 'utf-8').split(/\r?\n/);

// Map connections
const connections = {}
data.map(e => {
  const [from, to] = e.split('-')

  if (!connections[from]) {
    connections[from] = []
  }

  if (!connections[to]) {
    connections[to] = []
  }

  connections[from].push(to)
  connections[to].push(from);
})

// Check number of routes from start
const findRoutesFrom = (node, seen, mayDouble) => {
  if (node === 'end') {
    return 1;
  }
  let double = mayDouble;


  if ((node.toLowerCase() === node) && seen.has(node)) {
    if (!mayDouble) {
      return 0;
    } else if (node === 'start') {
      return 0;
    } else {
      double = false
    }
  }
  
  seen.add(node)
  let result = 0;
  for (nextNode of connections[node]) {
      result += findRoutesFrom(nextNode, new Set([...seen]), double) // New set so visited down one path, does not preclude another unvisited one.
  }

  return result;
}

const routesFromStart = findRoutesFrom('start', new Set(), false)
console.log(routesFromStart)
const routesWithDuplicate = findRoutesFrom('start', new Set(), true);
console.log(routesWithDuplicate)
