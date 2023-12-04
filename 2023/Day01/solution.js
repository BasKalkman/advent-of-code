const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const part1 = (input) => {
    const nums = input.map((e) => {
        const arr = e.match(/\d/g);
        return `${arr[0]}${arr[arr.length - 1]}`;
    });
    return nums.reduce((a, c) => a + parseInt(c), 0);
};

console.log('Part 1: ', part1(data));

// Part 2
const part2 = (input) => {
    const subs = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
    };
    const nums = input.map((e) => {
        const pattern = /\d|one|two|three|four|five|six|seven|eight|nine/g;
        const arr = [];
        let m;
        while ((m = pattern.exec(e))) {
            pattern.lastIndex -= m[0].length - 1;
            arr.push(m[0]);
        }
        const out = arr.map((el) => subs[el] || el);
        return `${out[0]}${out[out.length - 1]}`;
    });
    return nums.reduce((a, c) => a + parseInt(c), 0);
};
console.log('Part 2: ', part2(data));
