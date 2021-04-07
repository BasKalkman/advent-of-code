const initialState =
  '###.#..#..##.##.###.#.....#.#.###.#.####....#.##..#.#.#..#....##..#.##...#.###.#.#..#..####.#.##.#';

const fs = require('fs');

// Create Hash Table of instructions
const hash = new Map();
fs.readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .forEach(item => {
    let arr = item.split(' => ');
    hash.set(arr[0], arr[1]);
  });

let currentState = initialState.split('');
let negSize = 0;

for (let j = 0; j < 20; j++) {
  // Add empty pots
  while (currentState.slice(0, 3).join('') !== '...') {
    currentState.unshift('.');
    negSize++;
  }
  while (currentState.slice(currentState.length - 3).join('') !== '...') {
    currentState.push('.');
  }

  let newState = [];
  //Run instruction
  for (let i = 0; i < currentState.length; i++) {
    let potState =
      (currentState[i - 2] || '.') +
      (currentState[i - 1] || '.') +
      currentState[i] +
      (currentState[i + 1] || 0) +
      (currentState[i + 2] || 0);

    if (hash.has(potState)) {
      newState.push(hash.get(potState));
    } else {
      newState.push(currentState[i]);
    }
  }
  currentState = newState;
}

let count = 0;
for (let i = 0; i < currentState.length; i++) {
  if (currentState[i] === '#') {
    count += i - negSize;
  }
}

console.log('Part 1: ', count);

// Part 2
// Reset
currentState = initialState.split('');
negSize = 0;

for (let j = 0; j < 500; j++) {
  // Add empty pots
  while (currentState.slice(0, 3).join('') !== '...') {
    currentState.unshift('.');
    negSize++;
  }
  while (currentState.slice(currentState.length - 3).join('') !== '...') {
    currentState.push('.');
  }

  let newState = [];
  //Run instruction
  for (let i = 0; i < currentState.length; i++) {
    let potState =
      (currentState[i - 2] || '.') +
      (currentState[i - 1] || '.') +
      currentState[i] +
      (currentState[i + 1] || 0) +
      (currentState[i + 2] || 0);

    if (hash.has(potState)) {
      newState.push(hash.get(potState));
    } else {
      newState.push(currentState[i]);
    }
  }
  currentState = newState;

  // Check
  let countP2 = 0;
  for (let i = 0; i < currentState.length; i++) {
    if (currentState[i] === '#') {
      countP2 += i - negSize;
    }
  }
  console.log(countP2);
}

// Count increases by 50 every generation at 500generations
// Just calculating
console.log(26175 + 50 * (5e10 - 500));
