const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('');

const checkLowerCase = 'abcdefghijklmnopqrstuvwxyz';
const checkUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function runCheck(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < checkLowerCase.length; j++) {
      if (arr[i] === checkLowerCase[j] && arr[i + 1] === checkUpperCase[j]) {
        arr.splice(i, 2);
        removalsThisRound++;
      }
      if (arr[i] === checkUpperCase[j] && arr[i + 1] === checkLowerCase[j]) {
        arr.splice(i, 2);
        removalsThisRound++;
      }
    }
  }
}

let noMoreOptions = false;
let removalsThisRound = 0;

function part1() {
  while (noMoreOptions === false) {
    removalsThisRound = 0;

    runCheck(input);

    if (removalsThisRound === 0) {
      noMoreOptions = true;
      console.log(input.length);
    }
  }
}

// part1();

// PART 2
function part2() {
  let counts = [];

  for (let i = 0; i < checkLowerCase.length; i++) {
    let temp = input.filter(item => {
      if (item !== checkLowerCase[i] && item !== checkUpperCase[i]) {
        return true;
      }
    });
    noMoreOptions = false;

    while (noMoreOptions === false) {
      removalsThisRound = 0;

      runCheck(temp);

      if (removalsThisRound === 0) {
        noMoreOptions = true;
        counts.push(temp.length);
      }
    }
  }
  console.log(counts);
}
part2();
