const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const lights = new Array(1000);
for (let i = 0; i < lights.length; i++) {
    lights[i] = new Array(1000).fill(false);
}

// Part 1
const getInstructionType = (str) => {
    if (str.match(/^turn on/)) { return 'ON' }
    if (str.match(/^turn off/)) { return 'OFF' }
    if (str.match(/^toggle/)) { return 'TOGGLE' }
}

const getGridNums = (str) => {
    nums = str.match(/\d+,\d+/g);
    const [yStart, xStart] = nums[0].split(',').map(Number);
    const [yEnd, xEnd] = nums[1].split(',').map(Number);

    return { yStart, yEnd, xStart, xEnd }
}

for (let instruction of data) {
    const instructionType = getInstructionType(instruction)
    const { yStart, yEnd, xStart, xEnd } = getGridNums(instruction)

    for (let y = yStart; y <= yEnd; y++) {
        for (let x = xStart; x <= xEnd; x++) {
            switch (instructionType) {
                case 'ON':
                    lights[y][x] = true;
                    break;
                case 'OFF':
                    lights[y][x] = false;
                    break;
                case 'TOGGLE':
                    lights[y][x] = !lights[y][x];
                    break;
                default:
                    break;
            }
        }
    }
}


const countLights = () => {
    let counter = 0;
    for (let i = 0; i < lights.length; i++) {
        for (let j = 0; j < lights[i].length; j++) {
            if (lights[i][j] === true) {
                counter++
            }
        }
    }
    return counter;
}

console.log(`Part 1: ${countLights()}`)