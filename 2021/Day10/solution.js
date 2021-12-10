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

const getCorruptLineChar = (line, returnCompletion = false) => {
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

    if (returnCompletion === true) {
        const returnStack = stack.map(e => {
            if (e === '(') return ')'
            if (e === '{') return '}'
            if (e === '[') return ']'
            if (e === '<') return '>'
        })
        return returnStack.reverse().join('')
    }

    return 0;
}

const part1 = data.map(e => getCorruptLineChar(e)).reduce((a, c) => a + c, 0)
console.log(`Part 1: ${part1}`)

// Part 2
const incompleteLines = data.filter(e => getCorruptLineChar(e) === 0)
const completionScores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

const scoreCompletion = (line) => {
    const stringToComplete = getCorruptLineChar(line, true);
    const result = stringToComplete.split('').reduce((a, c) => {
        return a * 5 + completionScores[c];
    }, 0)
    return result;
}

const lineScores = incompleteLines.map(e => scoreCompletion(e))
const middleIndex = Math.floor(lineScores.length / 2)
console.log(`Part 2: ${lineScores[middleIndex]}`)