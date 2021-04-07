const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\r\n');

const ids = [];

data.forEach(item => {
  // Parse inputs
  let code = item.match(/.+-/g)[0].replace(/-/g, '');
  let sector = parseInt(item.match(/\d+/g)[0]);
  let checkSum = item.match(/\[.+\]/g)[0].replace(/[\[\]]/g, '');

  // Count values
  let obj = {};
  for (let i = 0; i < code.length; i++) {
    obj[code[i]] = (obj[code[i]] || 0) + 1;
  }

  // Sort counts - Tie breakers decided alphabetically
  let counts = Object.entries(obj).sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    }

    if (a[0] > b[0]) {
      return 1;
    } else if (a[0] < b[0]) {
      return -1;
    } else {
      return 0;
    }
  });

  // If string matches check, item is valid
  let toCheck = counts.splice(0, 5).reduce((a, c) => {
    return a + c[0];
  }, '');

  let valid = toCheck === checkSum;

  // If valid, write sectorId to ids
  if (valid) {
    ids.push(sector);
  }
});

let result = ids.reduce((a, c) => a + c);
console.log('Part 1: ', result);

// Part 2
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

data.forEach(item => {
  let input = item.match(/.+-/g)[0];
  let sector = parseInt(item.match(/\d+/g)[0]);

  let output = input.split('').map(letter => {
    if (letter === '-') {
      return ' ';
    }

    let index = alphabet.indexOf(letter);
    index = (index + sector) % alphabet.length;

    return alphabet[index];
  });

  if (output.join('').match(/north/g)) {
    console.log('Part 2: ', output.join(''), ' Sector ID: ', sector);
  }
});
