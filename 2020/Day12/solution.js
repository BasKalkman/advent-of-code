const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n')
const Ship = require('./Ship');

// Part 1
const part1 = new Ship()

for (instruction of data) {
    part1.execInstruction(instruction)
}

// Part 2
const part2 = new Ship(true)

for (instruction of data) {
    part2.execInstruction(instruction)
}

console.log('Part 1: ', part1.getManhattanDistance())
console.log('Part 2: ', part2.getManhattanDistance())
