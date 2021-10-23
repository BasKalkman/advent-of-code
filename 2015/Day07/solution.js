const fs = require('fs');
// const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const data = fs.readFileSync('./example.txt', 'utf-8').split('\n')

const wireValues = new Map()

// Populate wire values with null
for (line of data) {
  const names = line.match(/[a-z]+/g)
  for (let name of names) {
    if (!wireValues.has(name)) {
      wireValues.set(name, null)
    }
  }
}




// Replace written bitwise operator with actual one for eval
const fillOperation = (str) => {
  if (str.match(/AND/)) {return str.replace('AND', '&')}
  if (str.match(/OR/)) {return str.replace('OR', '|')}
  if (str.match(/LSHIFT/)) {return str.replace('LSHIFT', '<<')}
  if (str.match(/RSHIFT/)) {return str.replace('RSHIFT', '>>>')}
  if (str.match(/NOT/)) {return str.replace('NOT', '~')}
}


const runWires = () => {
  for (let line of data) {
    const names = line.match(/[a-z]+/g)
    const output = names.pop();
    const knownValues = names.map(e => wireValues.get(e))
    if (knownValues.includes(null)) {
      break;
    } else {

      // Prepare instruction for eval()
      let instruction = line.split('->')[0].trim();
      instruction = fillOperation(instruction);
      // Change wire names to wire values
      for (let i = 0; i < names.length; i++) {
        instruction = instruction.replace(names[i], knownValues[i])
      }
  
      // Run eval()
      console.log(instruction)
      let result = eval(instruction)
      if (typeof result !== 'number') {
        result = parseInt(result);
      }
  
      wireValues.set(output, result)
    }
    
  }
}

const findTargetWireValue = (target) => {
  while (wireValues.get(target) === null) {
    runWires();
  }
  return wireValues.get(target);
}

findTargetWireValue('a')
