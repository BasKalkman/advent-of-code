const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .trim()
  .split('\r\n');

const keypad = {
  x0y0: 1,
  x1y0: 2,
  x2y0: 3,
  x0y1: 4,
  x1y1: 5,
  x2y1: 6,
  x0y2: 7,
  x1y2: 8,
  x2y2: 9
};

const code = [];

data.forEach(input => {
  let x = 1;
  let y = 1;

  for (char of input) {
    if (char === 'U' && y > 0) {
      y--;
    }
    if (char === 'D' && y < 2) {
      y++;
    }
    if (char === 'L' && x > 0) {
      x--;
    }
    if (char === 'R' && x < 2) {
      x++;
    }
  }

  let coords = `x${x}y${y}`;
  let keyNumber = keypad[coords];
  code.push(keyNumber);
});

console.log('Part 1: ', code.join(''));

// Part 2
const keysP2 = {
  x0y0: 7,
  x0y2: 1,
  x0y1: 3,
  'x0y-1': 'B',
  'x0y-2': 'D',
  'x-2y0': 5,
  'x-1y1': 2,
  'x-1y0': 6,
  'x-1y-1': 'A',
  x1y1: 4,
  x1y0: 8,
  'x1y-1': 'C',
  x2y0: 9
};

const codeP2 = [];

data.forEach(input => {
  let x = -2;
  let y = 0;

  for (char of input) {
    let tempX = x;
    let tempY = y;

    if (char === 'U') {
      tempY++;
    }
    if (char === 'D') {
      tempY--;
    }
    if (char === 'L') {
      tempX--;
    }
    if (char === 'R') {
      tempX++;
    }

    let coord = `x${tempX}y${tempY}`;
    if (keysP2[coord]) {
      x = tempX;
      y = tempY;
    }
  }

  let coord = `x${x}y${y}`;
  codeP2.push(keysP2[coord]);
});

console.log('Part 2: ', codeP2.join(''));
