const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n\n');

const elfCalories = data.map((e) => {
    return e.split('\n').reduce((a, c) => a + parseInt(c), 0);
});

console.log(`Part 1: ${Math.max(...elfCalories)}`);

// Part 2

const r = [...elfCalories.sort((a, b) => b - a).slice(0, 3)].reduce((a, c) => a + c, 0);
console.log(`Part 2: ${r}`);
