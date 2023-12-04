const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8').split('\n');

// Part 1
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;
const games = data.map((e) => {
    // console.log(/(\d+) red/gi.exec(e));
    const reds = [...e.matchAll(/(\d+) red/gi)].reduce((a, c) => {
        return a === null || parseInt(c[1]) > a ? parseInt(c[1]) : a;
    }, null);
    const blues = [...e.matchAll(/(\d+) blue/gi)].reduce((a, c) => {
        return a === null || parseInt(c[1]) > a ? parseInt(c[1]) : a;
    }, null);
    const greens = [...e.matchAll(/(\d+) green/gi)].reduce((a, c) => {
        return a === null || parseInt(c[1]) > a ? parseInt(c[1]) : a;
    }, null);

    return {
        red: reds,
        blue: blues,
        green: greens,
        game: parseInt(/Game (\d+)/gi.exec(e)[1]),
    };
});
const part1 = games.reduce((a, c) => {
    if (c.red <= maxRed && c.blue <= maxBlue && c.green <= maxGreen) {
        return a + c.game;
    }
    return a;
}, 0);
console.log('Part 1: ', part1);

// Part 2
const part2 = games.reduce((a, c) => {
    const power = c.red * c.green * c.blue;
    return a + power;
}, 0);
console.log('Part 2: ', part2);
