const fs = require('fs');
const [data, dict] = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n\r?\n/)
// const [data, dict] = fs.readFileSync('./example.txt', 'utf-8').split(/\r?\n\r?\n/)

const polymers = dict.split(/\r?\n/).reduce((a,c) => {
  const [input, out] = c.split(' -> ')
  a[input] = out;
  return a;
}, {})


const polymerize = (str) => {
  let i = 0;
  while (i < str.length - 1) {
    const check = str.slice(i, i+2)
    if (polymers[check]) {
      str = str.slice(0,i+1) + polymers[check] + str.slice(i+1)
      i++
    } 

    i++
  }

  return str;
}

// Part 1
let template = data;
for (let i=0; i < 10; i++) {
  let newTemplate = polymerize(template)
  template = newTemplate
}

const count = (str) => {
  const obj = {}
  for (letter of str) {
    if (!obj[letter]) {
      obj[letter] = 0
    }

    obj[letter] += 1
  }
  return obj
}

const counts = count(template);
const min = Math.min(...Object.values(counts))
const max = Math.max(...Object.values(counts))
console.log(`Part 1: ${max - min}`)