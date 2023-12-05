const fs = require('fs');
const data = fs
    .readFileSync('./input.txt', 'utf-8')
    .replace(/Card \d+:/g, '')
    .split('\n')
    .map((e) => e.trim());

// Part 1
const double = (n) => {
    if (n === 0) return 0;
    let value = 1;
    let x = 0;
    while (x < n - 1) {
        value += value;
        x++;
    }
    return value;
};

const part1 = data
    .map((e) => {
        const [left, right] = e.split('|').map((el) =>
            el
                .trim()
                .split(' ')
                .filter((item) => item !== '')
        );
        console.log(left, right);
        const overlap = right.filter((el) => left.includes(el));
        return overlap.length;
    })
    .reduce((a, c) => {
        return a + double(c);
    }, 0);
console.log(part1);
