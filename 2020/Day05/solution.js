const fs = require('fs');
const tickets = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');


function getSeatID(str) {
    let firstPart = str.substr(0, 7).replace(/B/g, '1').replace(/F/g, '0');
    let secondPart = str.substr(7).replace(/R/g, '1').replace(/L/g, '0')

    let row = parseInt(firstPart, 2)
    let column = parseInt(secondPart, 2);

    return row * 8 + column    
}


// Part 1 - Highest ID
let highestID = tickets.reduce((a,c) => {
    let seatID = getSeatID(c)
     return seatID > a ? seatID : a
}, 0)

console.log('Part 1: ', highestID)

// Part 2
const seatIDs = tickets.map(e => {
    return getSeatID(e)
}).sort()

for (let id of seatIDs) {
    if (seatIDs.includes(id + 2) && !seatIDs.includes(id + 1)) {
        console.log('Part 2: ', id+1);
        return;
    }
}