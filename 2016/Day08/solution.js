const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\r\n');

const keypad = Array.from(Array(6), (a, b) => {
  return Array.from(Array(50), (x, y) => {
    return 0;
  });
});

// Functions
function doRect(x, y) {
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (keypad[j][i] === 0) {
        keypad[j][i] = 1;
      } else {
        keypad[j][i] = 0;
      }
    }
  }
}

function doRow(y, num) {
  for (let i = 0; i < num; i++) {
    keypad[y].unshift(keypad[y].pop());
  }
}

function doColumn(x, num) {
  let arr = [];
  for (let i = 0; i < keypad.length; i++) {
    arr.push(keypad[i][x]);
  }
  for (let i = 0; i < num; i++) {
    arr.unshift(arr.pop());
  }
  for (let i = 0; i < keypad.length; i++) {
    keypad[i][x] = arr[i];
  }
}

// Part 1
data.forEach(line => {
  let input = line.split(' ');

  if (input[0] === 'rect') {
    // parse for doRect
    let coords = input[1].match(/\d+/g);
    doRect(coords[0], coords[1]);
  } else if (input[1] === 'row') {
    // parse for doRow
    let arrY = line.match(/\d+/g)[0];
    let num = line.match(/\d+/g)[1];
    doRow(arrY, num);
  } else {
    //parse for doColumn
    let arrX = line.match(/\d+/g)[0];
    let num = line.match(/\d+/g)[1];
    doColumn(arrX, num);
  }
});

console.log('Part 1: ', keypad.join('').match(/1/g).length);

// Part 2
keypad.forEach(x => console.log(x.join('').replace(/0/g, '.')));
