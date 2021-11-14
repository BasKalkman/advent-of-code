const fs = require('fs');
const instructions = fs.readFileSync('./input.txt', 'utf-8').split('\r\n')


function part1(list) {
    let accumulator = 0
    let current = 0;
    const seen = new Map();


    while (!seen.has(current)) {
        seen.set(current, seen.size)

        let [command, num] = list[current].split(' ')
        
        switch (command) {
            case 'acc':
                accumulator += parseInt(num)
                current++
                break;
            case 'nop':
                current++
                break;
            case 'jmp':
                current += parseInt(num)
        
            default:
                break;
        }
        
    }

    return accumulator;
}

console.log('Part 1: ', part1(instructions))

// Part 2
let checkedIndices = []
let testList = [...instructions]

for (let i = 0; i < instructions.length; i++) {
    testList = [...instructions]

    if (testList[i].match(/jmp|nop/) && !checkedIndices.includes(i)) {
        if (testList[i].match(/jmp/)) {
            testList[i] = testList[i].replace(/jmp/, 'nop')
        } else if (testList[i].match(/nop/)) {
            testList[i] = testList[i].replace(/nop/, 'jmp')
        }
        checkedIndices.push(i)
    }

    let success = checkList(testList)

    if (success) {
        return;
    }
}

function checkList(list) {
    let accumulator = 0
    let current = 0;
    const seen = new Map();


    while (!seen.has(current) && current < list.length) {
        seen.set(current, seen.size)

        let [command, num] = list[current].split(' ')
        
        switch (command) {
            case 'acc':
                accumulator += parseInt(num)
                current++
                break;
            case 'nop':
                current++
                break;
            case 'jmp':
                current += parseInt(num)
        
            default:
                break;
        }
        
    }

    if (current >= list.length) {
        console.log('Part 2: ', accumulator)
        return true;
    }

    return false
    
}
