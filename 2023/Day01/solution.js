const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const part1 = (input) => {
    const nums = input.map((e) => {
        const arr = e.match(/[0-9]/g);
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
        const arr = e.match(/[1-9]|one|two|three|four|five|six|seven|eight|nine/g);
        const changed = arr.map((x) => {
            return subs[x] || x;
        });
        return `${changed[0]}${changed[changed.length - 1]}`;
    });
    return nums.reduce((a, c) => a + parseInt(c), 0);
};
console.log('Part 2: ', part2(data));
// NOT 54623
