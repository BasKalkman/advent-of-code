const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n')

// Part 1
const part1 = data.reduce((acc, group) => {
    let answers = new Set()
    let people = group.split('\r\n')

    for (person of people) {
        for (letter of person.split('')) {
            answers.add(letter)
        }
    }

    return acc + answers.size
}, 0)

console.log('Part 1: ', part1)

// Part 2
const part2 = data.reduce((acc, group) => {
    let people = group.split('\r\n')
    let groupSize = people.length;

    let counts = {}

    for (person of people) {
        let answers = person.split('');
        for (answer of answers) {
            counts[answer] = counts[answer] + 1 || 1
        }
    }
    
    let checkEntries = Object.entries(counts)
    let allAnswered = checkEntries.filter(e => {
        return e[1] === groupSize ? true : false
    })

    return acc + allAnswered.length

}, 0)

console.log('Part 2: ', part2)