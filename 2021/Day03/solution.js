const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const bits = data.reduce((a, c) => {
    c.split('').map((e, idx) => {
        a[idx] ? a[idx] += e : a[idx] = e;
    })
    return a;

}, new Array(data[0].length).fill(null))

const mostCommonBits = bits.reduce((a, c, i) => {
    c.match(/0/g).length > c.length / 2 ? a[i] = '0' : a[i] = '1';
    return a
}, [])

const leastCommonBits = mostCommonBits.map(e => {
    return e === '1' ? '0' : '1';
})

const part1 = parseInt(mostCommonBits.join(''), 2) * parseInt(leastCommonBits.join(''), 2);
console.log(`Part 1: ${part1}`)