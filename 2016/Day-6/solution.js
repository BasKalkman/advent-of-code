const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\r\n');

let obj = {};

// Columns, not rows
data.forEach(line => {
  for (let i = 0; i < line.length; i++) {
    if (!obj[i]) {
      obj[i] = [];
    }
    obj[i].push(line[i]);
  }
});

// Count values
let result = '';
let resultLeast = '';
const alpha = 'abcdefghijklmnopqrstuvwxyz';

Object.values(obj).forEach(arr => {
  let str = arr.join('');
  let letter = 'a';
  let count = 0;
  let letterLeast = 'a';
  let countLeast = str.length;

  for (let i = 0; i < alpha.length; i++) {
    let found = str.match(new RegExp(alpha[i], 'g')) || [];

    if (found.length > count) {
      count = found.length;
      letter = alpha[i];
    }

    if (found.length < countLeast) {
      countLeast = found.length;
      letterLeast = alpha[i];
    }
  }

  result += letter;
  resultLeast += letterLeast;
});

console.log('Part 1: ', result);
console.log('Part 2: ', resultLeast);

// Part 2
