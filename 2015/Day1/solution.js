const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf-8').split('')

// Part 1
let currentFloor = 0
for (instruction of data) {
    instruction === '(' ? currentFloor++ : currentFloor--
}

console.log("Part 1: ", currentFloor)

// Part 2
currentFloor = 0
let i = 0;

while (currentFloor != -1) {
    if (data[i] === '(') {
        currentFloor++
    } else {
        currentFloor--
    }

    i++
}

console.log('Part 2: ', i)