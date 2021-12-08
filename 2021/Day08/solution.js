const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/)

// Part 1
let part1Counter = 0;
for (const line of data) {
  const [input, output] = line.split(' | ');
  const uniqueLengths = [2, 3, 4, 7]
  for (const digit of output.split(' ')) {
    if (uniqueLengths.includes(digit.length)) {
      part1Counter++
    }
  }
}
console.log(`Part 1: ${part1Counter}`)


// Part 2
const edgesInCommon = (num1, num2) => {
  let counter = 0;
  let input = num1.split('')
  let check = num2.split('')
  for (const letter of input) {
    if (check.includes(letter)) {
      counter++;
    }
  }

  return counter;
}

const isZero = (input, seven, four) => {
  let sevenInCommon = edgesInCommon(input, seven);
  let fourInCommon = edgesInCommon(input, four);

  return input.length === 6 && sevenInCommon === 3 && fourInCommon === 3;
}

const isTwo = (input, seven, four) => {
  let sevenInCommon = edgesInCommon(input, seven);
  let fourInCommon = edgesInCommon(input, four);

  return input.length === 5 && sevenInCommon === 2 && fourInCommon === 2;
}

const isThree = (input, seven, four) => {
  let sevenInCommon = edgesInCommon(input, seven);
  let fourInCommon = edgesInCommon(input, four);

  return input.length === 5 && sevenInCommon === 3 && fourInCommon === 3;
}

const isFive = (input, seven, four) => {
  let sevenInCommon = edgesInCommon(input, seven);
  let fourInCommon = edgesInCommon(input, four);

  return input.length === 5 && sevenInCommon === 2 && fourInCommon === 3;
}

const isSix = (input, seven, four) => {
  let sevenInCommon = edgesInCommon(input, seven);
  let fourInCommon = edgesInCommon(input, four);

  return input.length === 6 && sevenInCommon === 2 && fourInCommon === 3;
}

const isNine = (input, seven, four) => {
  let sevenInCommon = edgesInCommon(input, seven);
  let fourInCommon = edgesInCommon(input, four);

  return input.length === 6 && sevenInCommon === 3 && fourInCommon === 4;
}

const sorted = (str) => {
  let returnStr = str.split('').sort().join('');
  return returnStr
}

const getSignalMapping = (input) => {
  const arr = input.split(' ')
  const one = arr.filter(e => e.length === 2)[0];
  const four = arr.filter(e => e.length === 4)[0];
  const seven = arr.filter(e => e.length === 3)[0];
  const eight = arr.filter(e => e.length === 7)[0];
  const zero = arr.filter(e => isZero(e, seven, four))[0];
  const two = arr.filter(e => isTwo(e, seven, four))[0];
  const three = arr.filter(e => isThree(e, seven, four))[0];
  const five = arr.filter(e => isFive(e, seven, four))[0];
  const six = arr.filter(e => isSix(e, seven, four))[0];
  const nine = arr.filter(e => isNine(e, seven, four))[0];

  const result = {}
  result[sorted(zero)] = '0';
  result[sorted(one)] = '1';
  result[sorted(two)] = '2';
  result[sorted(three)] = '3';
  result[sorted(four)] = '4';
  result[sorted(five)] = '5';
  result[sorted(six)] = '6';
  result[sorted(seven)] = '7';
  result[sorted(eight)] = '8';
  result[sorted(nine)] = '9';

  return result;
}

const outputValues = []
for (const line of data) {
  const [input, output] = line.split(' | ');

  const obj = getSignalMapping(input);
  const outputString = output.split(' ').reduce((a, c) => {
    a += obj[sorted(c)]
    return a;
  }, '')
  outputValues.push(outputString);
}

const part2 = outputValues.reduce((a, c) => a + parseInt(c), 0)
console.log(`Part 2: ${part2}`);
