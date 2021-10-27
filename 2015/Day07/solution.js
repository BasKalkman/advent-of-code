const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
// const data = fs.readFileSync('./example.txt', 'utf-8').split('\n')

// Replace written bitwise operator with actual one for eval
const fillOperation = (str) => {
  if (str.match(/AND/)) { return str.replace('AND', '&') }
  if (str.match(/OR/)) { return str.replace('OR', '|') }
  if (str.match(/LSHIFT/)) { return str.replace('LSHIFT', '<<') }
  if (str.match(/RSHIFT/)) { return str.replace('RSHIFT', '>>>') }
  if (str.match(/NOT/)) { return str.replace('NOT', '~') }
  return str;
}

// Setup wireValues store
let wireValues = new Map();
const fillWireValues = () => {
  for (const line of data) {
    const [input, target] = line.split('->').map(e => e.trim());
    if (!input.match(/AND|OR|LSHIFT|RSHIFT|NOT/g) && !input.match(/[a-z]+/)) { // If input is a number, set target to number
      wireValues.set(target, parseInt(input))
    } else {
      wireValues.set(target, input);
    }
  }
}
fillWireValues();


const findWireValue = (wire) => {
  let currentWireValue = wireValues.get(wire)
  if (typeof currentWireValue === 'number') {
    return currentWireValue;
  }

  // Prepare to eval operation
  currentWireValue = fillOperation(currentWireValue);
  const wiresInOperation = currentWireValue.match(/[a-z]+/g);

  for (let i = 0; i < wiresInOperation.length; i++) {
    currentWireValue = currentWireValue.replace(wiresInOperation[i], findWireValue(wiresInOperation[i]))
  }

  const result = eval(currentWireValue);
  wireValues.set(wire, result);

  return result;
}

const part1 = findWireValue('a');
console.log(`Part 1: ${part1}`);

// Part 2
wireValues.clear();
fillWireValues();
wireValues.set('b', part1);

const part2 = findWireValue('a');
console.log(`Part 2: ${part2}`);