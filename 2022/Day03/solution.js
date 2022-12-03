const fs = require('fs');
const data = fs.readFileSync("./input.txt", 'utf-8').split('\n')

const getPriority = (letter) => {
    const alpha = 'abcdefghijklmnopqrstuvwxyz'
    let value = alpha.indexOf(letter.toLowerCase()) + 1
    if (letter !== letter.toLowerCase()) value += 26;
    return value;
}

const part1 = data.reduce((a,c) => {
    const left = c.slice(0, c.length / 2)
    const right = c.slice(c.length / 2)
    for (const letter of left) {
        if (right.indexOf(letter) > -1) {
            return a + getPriority(letter)
        }
    }
}, 0)

console.log(part1);

// Part 2
const badges = []
for (let i = 0; i < data.length; i += 3) {
    for (const letter of data[i]) {
        if (data[i+1].indexOf(letter) > -1 && data[i+2].indexOf(letter) > -1) {
            badges.push(letter);
            break;
        }
    }
}
const part2 = badges.reduce((a,c) => a + getPriority(c), 0);
console.log(part2);