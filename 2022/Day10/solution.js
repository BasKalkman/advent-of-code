const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');
// const data = fs.readFileSync('./test.txt', 'utf-8').split('\n');
const cycles = [20,60,100,140,180,220];

let register = 1;
let cycle = 0;
let values = [];

const addCycle = () => {
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