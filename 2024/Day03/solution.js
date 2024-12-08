const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8');

const muls = data.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g)

// Part 1
const result = muls.filter(e => !e.match(/do\(\)|don't\(\)/g)).reduce((acc, c) => {
    const [a, b] = c.match(/\d+/g).map(Number);
    return acc + (a * b)
}, 0)
console.log('Part 1: ', result);

// Part 2
let counting = true;
const part2muls = muls.filter(e => {
    if (e === "don't()") {
        counting = false;
        return false;
    }
    if (e === "do()") {
        counting = true;
        return false;
    }
    return counting ? true : false;
}).reduce((acc, c) => {
    const [a, b] = c.match(/\d+/g).map(Number);
    return acc + (a * b)

}, 0)
console.log('Part 2: ', part2muls);