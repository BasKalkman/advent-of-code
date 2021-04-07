const fs = require('fs')
const gifts = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(e => {
    return e.split('x').map(Number)
})

// Part 1
let part1 = gifts.reduce((a,c) => {
    let nums = []
    nums.push(c[0]*c[1], c[0]*c[2], c[1]*c[2])
    let smallest = Math.min(...nums)
    let sum = nums.reduce((acc,curr) => {
        return acc + (curr * 2)
    }, 0)

    return a + sum + smallest
}, 0)

console.log('Part 1: ', part1)


// Part 2
let part2 = gifts.reduce((a,c) => {
    let [num1, num2] = c.sort((a,b) => a > b)
    let ribbon = (2 * num1) + (2 * num2)
    let bow = c.reduce((acc, curr) => {
        return acc * curr
    }, 1)

    return a + ribbon + bow
}, 0)

console.log("Part 2: ", part2)