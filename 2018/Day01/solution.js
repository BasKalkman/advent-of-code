const fs = require('fs');
const data = fs
    .readFileSync('./input.txt', 'utf8')
    .split('\r\n')
    .map(Number);

// Part 1
const resultPart1 = data.reduce((a, c) => a + c);
console.log(resultPart1);

// Part 2
const list = new Map();
let freq = 0;
let i = 0;

while (!list.has(freq)) {
    list.set(freq);
    freq += data[i % data.length];
    i++;
}

console.log(freq);
