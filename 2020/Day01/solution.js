// Find the two entries that sum to 2020; what do you get if you multiply them together?
const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(Number);

// Part 1
for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
        if (data[i] + data[j] === 2020) {
            console.log('Part 1: ', data[i] * data[j]);
            break;
        }
    }
}

// Part 2
for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
        let remainder = 2020 - data[i] - data[j];
        if (data.indexOf(remainder) !== -1) {
            console.log('Part 2: ', data[i] * data[j] * remainder);
            break;
        }
    }
}
