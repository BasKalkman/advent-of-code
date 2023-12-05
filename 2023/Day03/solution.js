const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
// const data = fs.readFileSync('./test.txt', 'utf-8').split('\n');

// Part 1
const numPositions = data.map((e) => [...e.matchAll(/\d+/g)]);
const parts = numPositions.map((e, y) => {
    const partnums = e.map((el) => {
        const before = data[y].split('')?.[el.index - 1] || '.';
        const after = data[y].split('')?.[el.index + el[0].length] || '.';
        const over = data?.[y - 1]?.split('').slice(el.index, el.index + el[0].length) || '.';
        const under = data?.[y + 1]?.split('').slice(el.index, el.index + el[0].length) || '.';
        const overBefore = data?.[y - 1]?.[el.index - 1] || '.';
        const overAfter = data?.[y - 1]?.[el.index + el[0].length] || '.';
        const underBefore = data?.[y + 1]?.[el.index - 1] || '.';
        const underAfter = data?.[y + 1]?.[el.index + el[0].length] || '.';

        const checkString = [before, after, ...over, overBefore, overAfter, ...under, underBefore, underAfter].join('');
        console.log(checkString);
        if (checkString.match(/[^\.0-9]/gi)) {
            return parseInt(el);
        } else {
            return 0;
        }
    });
    return partnums;
});
const result = parts.reduce((a, c) => {
    return a + c.reduce((ac, cur) => ac + cur, 0);
}, 0);
console.log(result);
