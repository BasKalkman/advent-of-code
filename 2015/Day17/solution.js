const { combineArray } = require('../../shared/combine')
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const bucketCombinations = combineArray(data);
const canFitEggnog = bucketCombinations.filter(e => {
    const result = e.reduce((a, c) => {
        return a + parseInt(c)
    }, 0)
    return result === 150;
})
console.log('Part 1: ', canFitEggnog.length)

// Part 2
const minNumber = Math.min(...canFitEggnog.map(e => e.length))
const combinationsOfMinNumber = canFitEggnog.filter(e => e.length === minNumber);
console.log('Part 2: ', combinationsOfMinNumber.length)