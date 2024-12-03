const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const arrs = data.reduce((a,c) => {
    const [left, right] = c.split('  ').map(Number);
    a['left'].push(left);
    a['right'].push(right);
    return a;

}, {'left': [], 'right': []})
arrs.left.sort((a,b) => a - b);
arrs.right.sort((a,b) => a - b);

const diffs = arrs.left.map((e,i) => Math.abs(e - arrs.right[i]));
const result = diffs.reduce((a,c) => a + c, 0);
console.log('Part 1: ', result);
// Part 2
const result2 = arrs.left.reduce((a,c) => {
    return a + (c * arrs.right.filter(num => num === c).length);
}, 0)
console.log(result2);