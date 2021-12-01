const fs = require('fs');
const { posix } = require('path');

const forrest = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\r\n')
    .map((e) => e.split(''));

function checkSlope(xIncrement, yIncrement) {
    let pos = {
        x: 0,
        y: 0,
    };
    let treesEncountered = 0;
    forrestWidth = forrest[0].length;

    while (pos.y < forrest.length) {
        if (forrest[pos.y][pos.x % forrestWidth] === '#') {
            treesEncountered++;
        }
        pos.x += xIncrement;
        pos.y += yIncrement;
    }

    return treesEncountered;
}

// Part 1
console.log('Part 1: ', checkSlope(3, 1));

// Part 2
const slopesToCheck = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];
const result = slopesToCheck.reduce((a, c) => {
    let [x, y] = c;
    return a * checkSlope(x,y);
}, 1);
console.log('Part 2: ', result);
