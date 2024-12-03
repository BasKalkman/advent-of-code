const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const result = data.filter(e => {
    const arr = e.split(" ").map(Number);
    const direction = arr[1] > arr[0] ? 'up' : 'down';
    const result = arr.reduce((a,c,i) => {
        if (i === 0) return true;
        if (a ===  false) return a;
        const sum = c - arr[i-1];
        if (direction === 'up') {
            if (sum < 1 || sum > 3) return false;
        }
        if (direction === 'down') {
            if (sum < -3 || sum > -1) return false;
        }
        return a;
    }, true)
    return result;
})
console.log('Part 1: ', result.length);
// Part 2