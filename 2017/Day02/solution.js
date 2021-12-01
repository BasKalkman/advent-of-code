const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\r\n');

// Part 1
let checkSum = 0;

input.forEach(arr => {
  let check = arr.split('\t').map(item => {
    let num = Number(item);
    return num;
  });

  let min = Math.min(...check);
  let max = Math.max(...check);

  checkSum += max - min;
});

console.log('Answer part 1: ', checkSum);

// Part 2
let checkDivisible = 0;
input.forEach(arr => {
  let check = arr
    .split('\t')
    .map(item => {
      let num = Number(item);
      return num;
    })
    .sort((a, b) => (a > b ? 1 : -1));

  for (let i = 0; i < check.length; i++) {
    for (let j = 0; j < check.length; j++) {
      if (i !== j) {
        let num1 = check[i];
        let num2 = check[j];

        if ((num1 / num2) % 1 === 0) {
          checkDivisible += num1 / num2;
          break;
        }
      }
    }
  }
});

console.log('Answer part 2: ', checkDivisible);
