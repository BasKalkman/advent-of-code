const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/);
const legalChars = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
}
const corruptCharScores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

const getCorruptLineChar = (line) => {
    const stack = []

    for (char of line.split('')) {
        if (Object.keys(legalChars).includes(char)) {
            stack.push(char);
        }

        if (Object.values(legalChars).includes(char)) {
            if (stack.length === 0) {
                throw new Error('No stack')
            }

            const checkChar = stack.pop();
            if (char !== legalChars[checkChar]) {
                return corruptCharScores[char];
            }
        }
    }
    return 0;
}

const part1 = data.map(e => getCorruptLineChar(e)).reduce((a, c) => a + c, 0)
console.log(`Part 1: ${part1}`)

