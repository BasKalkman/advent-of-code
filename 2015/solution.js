const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const niceStrings = data.filter(e => {
  const vowelCount = e.match(/[aeiou]/g) || [];
  const hasRepeatingLetter = e.match(/([a-zA-Z])\1/g)
  const hasNoNaughtyCombinations = !e.match(/(ab|cd|pq|xy)/g)


  return vowelCount.length >= 3 && hasRepeatingLetter && hasNoNaughtyCombinations
})

console.log('Part 1: ', niceStrings.length)