const fs = require('fs')
let input = fs.readFileSync('./input.txt', 'utf-8')

// Part 1
let data = input;
data = data.replace(/\n/g, '');
data = data.replace(/\\\\|\\"/g, '__OK__')
data = data.replace(/"/g, '')
data = data.replace(/\\x../g, '__OK__');
data = data.replace(/__OK__/g, 'i')
console.log(`Part 1: ${input.length - data.length}`)

// Part 2
let data2 = input.split('\n');
const result = data2.reduce((a, c) => {
    let specialChars = c.match(/\\|"/g)
    return a + specialChars.length + 2
}, 0)

console.log(`Part 2: ${result}`);