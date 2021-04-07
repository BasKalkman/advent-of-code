// Changed seen from Map() to Uint32Array(), which is apparently way faster
console.time('test')

const input = '16,1,0,18,12,14,19'.split(',').map(Number)
// const targetTurn = 2020 // Part 1
const targetTurn = 30000000 // Part 2

let currentValue = input[input.length - 1]
let currentTurn = input.length
let seen = new Uint32Array(targetTurn)

input.map((e,i) => seen[e] = i+1)

while (currentTurn < targetTurn) {
    if (seen[currentValue] !== 0) {
        let prevTurn = seen[currentValue]
        seen[currentValue] = currentTurn
        currentValue = currentTurn - prevTurn;
    } else {
        seen[currentValue] = currentTurn
        currentValue = 0
    }

    currentTurn++
}
console.log(currentValue)

console.timeEnd('test')