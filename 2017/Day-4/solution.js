const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\r\n');

let validCount = 0;

data.forEach(item => checkPassphrase(item));

function checkPassphrase(phrase) {
  let arr = phrase.split(' ');
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return false;
      }
      //Part 2
      if (isAnagram(arr[i], arr[j])) {
        return false;
      }
    }
  }
  validCount++;
  return true;
}

// Part 2
function isAnagram(str1, str2) {
  let checkOne = str1
    .split('')
    .sort((a, b) => (a > b ? 1 : -1))
    .join('');
  let checkTwo = str2
    .split('')
    .sort((a, b) => (a > b ? 1 : -1))
    .join('');

  if (checkOne === checkTwo) {
    return true;
  }
}

console.log(validCount);
