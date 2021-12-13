const fs = require('fs')
const [pointsData, foldsData] = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n\r?\n/);
// const [pointsData, foldsData] = fs.readFileSync('./example.txt', 'utf-8').split(/\r?\n\r?\n/).map(e => e.trim());

// Grid setup
const points = pointsData.split(/\r?\n/).map(e => {
    const [x, y] = e.split(',').map(Number)
    return [x, y]
})

const [maxX, maxY] = points.reduce((a, c) => {
    const [x, y] = c;
    if (x > a[0]) a[0] = x;
    if (y > a[1]) a[1] = y;
    return a;
}, [0, 0])

const grid = new Array(maxY + 1).fill(0).map(e => {
    return new Array(maxX + 1).fill('.');
})

points.map(e => {
    const [x, y] = e;
    grid[y][x] = '#';
})

// List of folds
const folds = foldsData.split(/\r?\n/).map(e => {
    const instruction = e.match(/[yx]=\d+/g)[0]
    return instruction;
})


// Folds functions
const foldUp = (num) => {
    const fold = grid.splice(num + 1)
    grid.pop()

    for (let y = 0; y < fold.length; y++) {
        fold[y].map((e, i) => {
            if (e === '#') {
                grid[grid.length - 1 - y][i] = '#';
            }
        })
    }
}

const foldLeft = (num) => {
    for (line of grid) {
        const fold = line.splice(num + 1)
        line.pop()

        for (let x = 0; x < fold.length; x++) {
            if (fold[x] === '#') {
                line[line.length - 1 - x] = '#'
            }
        }
    }
}
const runFold = (instruction) => {
    const [axis, idx] = instruction.split('=')
    if (axis === 'y') {
        foldUp(parseInt(idx))
    }
    if (axis === 'x') {
        foldLeft(parseInt(idx))
    }
}

// Part 1
runFold(folds[0])
const part1 = grid.flat(2).reduce((a, c) => c === '#' ? a + 1 : a, 0)
console.log(part1);