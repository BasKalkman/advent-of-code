const fs = require('fs');

const instructions = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map(item => {
    let obj = {};
    let temp = item.split(' ');

    obj.checkRegister = temp[4];
    obj.checkOperation = temp[5];
    obj.checkValue = parseInt(temp[6]);
    obj.register = temp[0];
    obj.increment = parseInt(temp[2]);
    obj.action = temp[1];

    return obj;
  });

let results = {};
let highestEver = 0;
instructions.forEach(item => {
  // Prepare registers
  if (!results[item.checkRegister]) {
    results[item.checkRegister] = 0;
  }
  if (!results[item.register]) {
    results[item.register] = 0;
  }

  // Prepare conditional statment
  let registerToCheck = results[item.checkRegister];
  let condition = `${registerToCheck} ${item.checkOperation} ${item.checkValue}`;

  // Run check
  if (eval(condition)) {
    // Act on register
    item.action === 'inc' ? (results[item.register] += item.increment) : (results[item.register] -= item.increment);
  }

  // Part 2: Check new values. Set as highest ever if needed
  if (results[item.register] > highestEver) {
    highestEver = results[item.register];
  }
});

let highestValue = Object.entries(results).sort((a, b) => {
  return a[1] > b[1] ? -1 : 1;
});
console.log('Part 1: ', highestValue[0]);
console.log('Part 2: ', highestEver);
