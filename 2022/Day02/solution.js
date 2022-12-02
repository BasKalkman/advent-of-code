const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const throws = {
    A: {
        win: 'Y',
        draw: 'X',
        lose: 'Z',
        X: 3,
        Y: 6,
        Z: 0,
    },
    B: {
        win: 'Z',
        draw: 'Y',
        lose: 'X',
        X: 0,
        Y: 3,
        Z: 6,
    },
    C: {
        win: 'X',
        draw: 'Z',
        lose: 'Y',
        X: 6,
        Y: 0,
        Z: 3,
    },
};

const shapeScores = {
    X: 1,
    Y: 2,
    Z: 3,
};

const part1 = data.reduce((a, round) => {
    const [opp, me] = round.split(' ');
    return a + shapeScores[me] + throws[opp][me];
}, 0);
console.log(`Part 1: ${part1}`);

const resultNeeded = {
    X: 0,
    Y: 3,
    Z: 6,
};

const part2 = data.reduce((a, round) => {
    const [opp, me] = round.split(' ');
    let myThrow;
    switch (me) {
        case 'X':
            myThrow = throws[opp].lose;
            return a + shapeScores[myThrow];
        case 'Y':
            myThrow = throws[opp].draw;
            return a + 3 + shapeScores[myThrow];
        case 'Z':
            myThrow = throws[opp].win;
            return a + 6 + shapeScores[myThrow];
    }
}, 0);
console.log(`Part 2: ${part2}`);
