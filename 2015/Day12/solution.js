const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8');

const nums = data.match(/-?\d+/g).reduce((a, c) => {
    return a + parseInt(c)
}, 0)

console.log(nums);