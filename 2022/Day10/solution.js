const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
// const data = fs.readFileSync('./test.txt', 'utf-8').split('\n');
const cycles = [20,60,100,140,180,220];

let register = 1;
let cycle = 0;
let values = [];
let lines = [];

const addCycle = () => {
    let tmpCycle = cycle % 40;
    if ([tmpCycle-1,tmpCycle,tmpCycle+1].includes(register)) {
        lines.push('#')
    } else {
        lines.push('.');
    }
    cycle++
    if (cycles.includes(cycle)) {
        values.push(register * cycle);
    }
}

for (const line of data) {
    addCycle();
    if (line !== 'noop') {
        const [_, num] = line.split(' ');
        addCycle();
        register += parseInt(num);
    } 

}
const part1 = values.reduce((a,c) => a + c, 0);
console.log(part1);

// Part 2
let resultLines = []
let tempLine = ''
for (let i = 0; i < lines.length; i++) {
    if (i > 0 && i % 40 === 0) {
        resultLines.push(tempLine);
        tempLine = '';
    }
    tempLine += lines[i]
}
resultLines.push(tempLine)

console.log('Part 2:')
resultLines.map(e => {
    let str = e.replace(/\./g, ' ');
    console.log(str);
})