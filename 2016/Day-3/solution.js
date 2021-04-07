const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\r\n');

let countValid = 0;

data.forEach(triangle => {
  let [a, b, c] = triangle.match(/\d+/g).map(Number);

  let valid = a + b > c && b + c > a && c + a > b;

  if (valid === true) {
    countValid++;
  }
});

console.log('Part 1: ', countValid);

// Part 2 -- Read triangles vertically
let countPart2 = 0;

let ones = [],
  twos = [];
threes = [];

data.forEach(line => {
  let [a, b, c] = line.match(/\d+/g);
  ones.push(a);
  twos.push(b);
  threes.push(c);
});

let lines = [...ones, ...twos, ...threes];

while (lines.length > 0) {
  let [a, b, c] = lines.splice(0, 3).map(Number);

  let valid = a + b > c && b + c > a && c + a > b;

  if (valid === true) {
    countPart2++;
  }
}

console.log('Part 2: ', countPart2);
