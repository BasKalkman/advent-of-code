const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(e => {
    return e.split('')
})


// Part 1
let currentSeats = JSON.parse(JSON.stringify(data))
let newSeats = JSON.parse(JSON.stringify(data))

let seatingFinished = false
while (!seatingFinished) {
    let changes = simulateRound(true)
    if (changes === 0) {
        seatingFinished = true;
    }
    currentSeats = JSON.parse(JSON.stringify(newSeats))
}

let totalSeatsOccupied = 0
for (let i = 0; i < currentSeats.length; i++) {
    for (j = 0; j < currentSeats[i].length; j++) {
        if (currentSeats[i][j] === '#') {
            totalSeatsOccupied++
        }
    }
}

console.log('Part 1: ', totalSeatsOccupied)


// Part 2
currentSeats = JSON.parse(JSON.stringify(data))
newSeats = JSON.parse(JSON.stringify(data))
seatingFinished = false

while(!seatingFinished) {
    let changes = simulateRound(false)
    if (changes === 0) {
        seatingFinished = true;
    }
    currentSeats = JSON.parse(JSON.stringify(newSeats))
}

let totalSeatsOccupiedP2 = 0
for (let i = 0; i < currentSeats.length; i++) {
    for (j = 0; j < currentSeats[i].length; j++) {
        if (currentSeats[i][j] === '#') {
            totalSeatsOccupiedP2++
        }
    }
}
console.log('Part 2: ', totalSeatsOccupiedP2)


function checkAdjacentSeats(y,x) {
    const checks = [[y-1, x-1], [y-1, x], [y-1, x+1], [y, x-1], [y, x+1], [y+1, x-1], [y+1, x], [y+1, x+1]]

    let numOccupied = 0
    for (check of checks) {
        [yCoord, xCoord] = check;
        if (currentSeats[yCoord] && currentSeats[yCoord][xCoord]) {
            if (currentSeats[yCoord][xCoord] === '#') {
                numOccupied++
            }
        }
    }

    return numOccupied
}

function checkSeatsByLoS(y,x) {
    const checks = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]

    let numOccupied = 0;
    for(check of checks) {
        [yInc, xInc] = check;
        let yCoord = y + yInc;
        let xCoord = x + xInc;    
        let endSearch = false

        while (currentSeats[yCoord] && currentSeats[yCoord][xCoord] && endSearch === false) {
            if (currentSeats[yCoord][xCoord] === '#') {
                numOccupied++
                endSearch = true
            } else if (currentSeats[yCoord][xCoord] === 'L') {
                endSearch = true
            }

            yCoord += yInc
            xCoord += xInc
        }
    }

    return numOccupied
}

function simulateRound(part1) {
    let seatsChanged = 0 

    if (part1 === true) {
        for (let i = 0; i < currentSeats.length; i++) {
            for (let j = 0; j < currentSeats[i].length; j++) {
                let num = checkAdjacentSeats(i, j)
                if (currentSeats[i][j] === 'L' && num === 0) {
                    newSeats[i][j] = '#'
                    seatsChanged++
                } else if (currentSeats[i][j] === '#' && num >= 4) {
                    newSeats[i][j] = 'L'
                    seatsChanged++
                }

            }
        }
    } else {
        for (let i = 0; i < currentSeats.length; i++) {
            for (let j = 0; j < currentSeats[i].length; j++) {
                let num = checkSeatsByLoS(i, j)
                if (currentSeats[i][j] === 'L' && num === 0) {
                    newSeats[i][j] = '#'
                    seatsChanged++
                } else if (currentSeats[i][j] === '#' && num >= 5) {
                    newSeats[i][j] = 'L'
                    seatsChanged++
                }
            }
        }
    }

    return seatsChanged;
}
