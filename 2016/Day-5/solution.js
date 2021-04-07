const crypto = require('crypto');
const input = 'wtnhxymk';

// Hash function
function hashIt(str) {
  let test = crypto
    .createHash('md5')
    .update(str)
    .digest('hex');

  return test;
}

let result = [];
let i = 0;

while (result.length < 8) {
  let str = hashIt(`${input}${i}`);

  if (str.substr(0, 5) == '00000') {
    result.push(str.substr(5, 1));
  }
  i++;
}

console.log('Part 1: ', result.join(''));

// Part 2
let resultP2 = [];

let foundNum = 0;
i = 0;

while (foundNum < 8) {
  let str = hashIt(`${input}${i}`);

  if (str.substr(0, 5) == '00000') {
    let num = parseInt(str.substr(5, 1));
    if (num < 8 && resultP2[num] === undefined) {
      resultP2[num] = str.substr(6, 1);
      foundNum++;
    }
  }

  i++;
}

console.log('Part 2: ', resultP2.join(''));
