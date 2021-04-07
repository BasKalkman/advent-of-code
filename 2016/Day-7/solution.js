const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\r\n');

let result = 0;

data.forEach(str => {
  let currentHypernet = false;
  let abbaHypernet = false;
  let abbaFound = false;

  for (let i = 0; i < str.length - 3; i++) {
    if (str[i] === '[') {
      currentHypernet = true;
    }
    if (str[i] === ']') {
      currentHypernet = false;
    }

    if (str[i] === str[i + 3] && str[i + 1] === str[i + 2] && str[i] != str[i + 1]) {
      if (currentHypernet === false) {
        abbaFound = true;
      } else {
        abbaHypernet = true;
      }
    }
  }
  if (abbaFound && !abbaHypernet) {
    result++;
  }
});

console.log('Part 1: ', result);

// Part 2 - aba and bab
let resultP2 = 0;

data.forEach(item => {
  let abas = [];
  let babs = [];
  let currentHypernet = false;

  for (let i = 0; i < item.length - 2; i++) {
    if (item[i] === '[') {
      currentHypernet = true;
    }
    if (item[i] === ']') {
      currentHypernet = false;
    }

    if (item[i] === item[i + 2] && item[i] !== item[i + 1] && item[i + 1] !== '[' && item[i + 1] !== ']') {
      let toPush = `${item[i]}${item[i + 1]}`;
      if (currentHypernet === false) {
        abas.push(toPush);
      } else {
        babs.push(toPush);
      }
    }
  }

  let valid = false;
  abas.forEach(aba => {
    let testStr = `${aba[1]}${aba[0]}`;
    if (babs.indexOf(testStr) !== -1) {
      valid = true;
    }
  });

  if (valid) {
    resultP2++;
  }
});
console.log('Part 2: ', resultP2);
