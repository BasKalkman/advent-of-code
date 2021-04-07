const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).split('\r\n');

let i = 0;
let completed = false;
let registers = {};
let sounded = [];

while (completed === false) {
  let instruction = data[i % data.length].split(' ');

  // Check register
  if (!registers[instruction[1]]) {
    registers[instruction[1]] = 0;
  }

  // set, add, mul, mod, snd, jgz, rcv
  if (instruction[0] === 'set') {
    let num = getValue(instruction[2]);
    registers[instruction[1]] = num;
  }
  if (instruction[0] === 'add') {
    let num = getValue(instruction[2]);
    registers[instruction[1]] += num;
  }
  if (instruction[0] === 'mul') {
    let num = getValue(instruction[2]);
    registers[instruction[1]] *= num;
  }
  if (instruction[0] === 'mod') {
    let num = getValue(instruction[2]);
    registers[instruction[1]] = registers[instruction[1]] % num;
  }
  if (instruction[0] === 'snd') {
    sounded.push(registers[instruction[1]]);
  }
  if (instruction[0] === 'jgz') {
    if (registers[instruction[1]] > 0) {
      i--;
      i += getValue(instruction[2]);
    }
  }
  if (instruction[0] === 'rcv') {
    if (registers[instruction[1]] !== 0) {
      console.log(sounded[sounded.length - 1]);
      completed = true;
    }
  }

  i++;
}

function getValue(input) {
  let num = parseInt(input) || registers[input];
  return num;
}
