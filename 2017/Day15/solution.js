const genAfactor = 16807;
const genBfactor = 48271;
const genAstart = 516;
const genBstart = 190;
const divider = 2147483647;

// Example
// const genAstart = 65;
// const genBstart = 8921;

// Results
let count = 0;

// Intermediate values
let valueA = genAstart;
let valueB = genBstart;

// Run
for (let i = 0; i < 4e7; i++) {
  valueA = (valueA * genAfactor) % divider;
  valueB = (valueB * genBfactor) % divider;

  if ((valueA & 0xffff) === (valueB & 0xffff)) {
    count++;
  }
}

console.log('Part 1: ', count);

// Part 2
valueA = genAstart;
valueB = genBstart;

let score = 0;
for (let i = 0; i < 5e6; i++) {
  do {
    valueA = (valueA * genAfactor) % divider;
  } while (valueA % 4 != 0);
  do {
    valueB = (valueB * genBfactor) % divider;
  } while (valueB % 8 != 0);

  // Bitwise - Treats number as 32 bit int, 0xffff compares with 16bit int and tosses the rest.
  if ((valueA & 0xffff) === (valueB & 0xffff)) {
    score++;
  }
}

console.log(score);
