const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n')
// const input = fs.readFileSync('./example.txt', 'utf-8').split('\n').map(e => e.split(''));

// Init map
let currentState = new Map();
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        const str = `${i}x${j}`;
        currentState.set(str, input[i][j]);
    }

}

// Part 2 - All corners always on
const turnCornersOn = () => {
    const [maxY, maxX] = [...currentState.keys()].reduce((a, c) => {
        const [y, x] = c.split('x').map(Number);
        if (y > a[0]) { a[0] = y };
        if (x > a[1]) { a[1] = x };

        return a;
    }, [0, 0])


    currentState.set(`0x0`, '#');
    currentState.set(`0x${maxX}`, '#');
    currentState.set(`${maxY}x0`, '#');
    currentState.set(`${maxY}x${maxX}`, '#');

}
turnCornersOn();

const getNeighborLights = (yPos, xPos) => {
    const diffs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    let numNeighbors = 0;

    for (let [yDiff, xDiff] of diffs) {
        let str = `${yPos + yDiff}x${xPos + xDiff}`;

        if (currentState.has(str)) {
            if (currentState.get(str) === '#') {
                numNeighbors++;
            }
        }
    }
    return numNeighbors
}

const getNewLightState = (yPos, xPos) => {
    const currentLightState = currentState.get(`${yPos}x${xPos}`);
    const numNeighbors = getNeighborLights(yPos, xPos);

    if (currentLightState === '#') {
        if (numNeighbors === 2 || numNeighbors === 3) {
            return '#';
        }
    }
    if (currentLightState === '.') {
        if (numNeighbors === 3) {
            return '#';
        }
    }
    return '.';
}

const runSim = () => {
    const newState = new Map()

    for (const key of currentState.keys()) {
        const [y, x] = key.split('x').map(Number);
        const newValue = getNewLightState(y, x);
        newState.set(key, newValue);
    }

    return newState
}

for (let i = 0; i < 100; i++) {
    const newState = runSim(currentState);
    currentState.clear();
    for (const [key, value] of newState.entries()) {
        currentState.set(key, value)
    }
    turnCornersOn(); // Part 2
}



let result = 0;
for (const value of currentState.values()) {
    if (value === '#') {
        result++;
    }
}
console.log(result);


// const test = () => {
//     const arr = new Array(6).fill(0).map(e => new Array(6).fill(0))
//     for (let [key, value] of currentState.entries()) {
//         const [y, x] = key.split('x').map(Number);
//         arr[y][x] = value;
//     }

//     arr.map(e => {
//         console.log(e.join(''))
//     })
// }
// test();