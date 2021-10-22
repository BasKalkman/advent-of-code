const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

// const lights = new Array(1000);
// for (let i = 0; i < lights.length; i++) {
//     lights[i] = new Array(1000).fill(0);
// }

const lights = new Array(1000).fill(0).map(() => Array(1000).fill(0))

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
                    lights[y][x] += 1;
                    break;
                case 'OFF':
                    const newValue = lights[y][x] > 0 ? lights[y][x] - 1 : 0;
                    lights[y][x] = newValue;
                    break;
                case 'TOGGLE':
                    lights[y][x] += 2;
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

const countLightsValues = () => {
    let counter = 0;
    for (let i = 0; i < lights.length; i++) {
        for (let j = 0; j < lights[i].length; j++) {
            counter += lights[i][j]
        }
    }
    return counter;
}

// console.log(`Part 1: ${countLights()}`)
console.log(`Part 2: ${countLightsValues()}`)