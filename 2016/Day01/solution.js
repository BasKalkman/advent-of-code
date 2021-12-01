const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split(',');

const dirs = {
  n: { L: 'w', R: 'e', axis: 'y', action: '+' },
  e: { L: 'n', R: 's', axis: 'x', action: '+' },
  s: { L: 'e', R: 'w', axis: 'y', action: '-' },
  w: { L: 's', R: 'n', axis: 'x', action: '-' }
};

let x = 0;
let y = 0;
currentDir = 'n';

data.forEach(item => {
  runInstruction(item);
});

function runInstruction(input) {
  let instructions = input.trim();
  let dirChange = instructions.match(/[LR]/)[0];
  let steps = parseInt(instructions.match(/\d+/)[0]);
  let newDir = dirs[currentDir][dirChange];

  if (newDir === 'n') {
    y += steps;
  }
  if (newDir === 's') {
    y -= steps;
  }
  if (newDir === 'e') {
    x += steps;
  }
  if (newDir === 'w') {
    x -= steps;
  }

  currentDir = newDir;
}

console.log('Position: ', x, y);
console.log('Blocks from HQ: ', Math.abs(x) + Math.abs(y));

// Part 2
// Reset inputs
x = 0;
y = 0;
currentDir = 'n';

let found = false;
let inputNum = 0;
let map = new Map();

while (found === false) {
  let inDir = data[inputNum].match(/[LR]/g)[0];
  let inNum = parseInt(data[inputNum].match(/\d+/g)[0]);
  let newDir = dirs[currentDir][inDir];
  let dir = dirs[newDir].axis;

  for (let i = 0; i < inNum; i++) {
    if (dir === 'x') {
      dirs[newDir].action === '+' ? x++ : x--;
    } else {
      dirs[newDir].action === '+' ? y++ : y--;
    }

    let currentPlace = `x${x}y${y}`;
    if (map.has(currentPlace)) {
      found = true;
      console.log('Part 2: ', Math.abs(x) + Math.abs(y));
    } else {
      map.set(currentPlace, map.size);
    }
  }

  // Next
  currentDir = newDir;
  inputNum++;
}
