const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');


const checker = (input) => {
    const arr = input.split(" ").map(Number);
    const direction = arr[1] > arr[0] ? 'up' : 'down';
    const result = arr.reduce((a, c, i) => {
        if (i === 0) return true;
        if (a === false) return a;
        const sum = c - arr[i - 1];
        if (direction === 'up') {
            if (sum < 1 || sum > 3) return false;
        }
        if (direction === 'down') {
            if (sum < -3 || sum > -1) return false;
        }
        return a;
    }, true)
    return result;
}

const result = data.filter(e => checker(e))
console.log('Part 1: ', result.length);
// Part 2
const result2 = data.filter(e => {
    if (checker(e)) return true;
    const arr = e.split(' ').map(Number);
    for (let i = 0; i < arr.length; i++) {
        const testArr = arr.filter((num, idx) => {
            if (idx === i) return false;
            return true;
        })
        const testResult = checker(testArr.join(' '))
        if (testResult) return true;
    }
    return false;
})
console.log('Part 2: ', result2.length);