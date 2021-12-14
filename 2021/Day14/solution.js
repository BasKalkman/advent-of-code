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


// Part 1
let template = data;
for (let i=0; i < 10; i++) {
  let newTemplate = polymerize(template)
  template = newTemplate
}

const counts = count(template);
const min = Math.min(...Object.values(counts))
const max = Math.max(...Object.values(counts))
console.log(`Part 1: ${max - min}`)

// Part 2
let store = {}
for (let i = 0; i < data.length - 1; i++ ) {
  let check = data.slice(i, i+2)
  if (!store[check]) store[check] = 0
  store[check]++
}

for (let i = 0; i < 40; i++) {
  for ([k,v] of Object.entries(store)) {
    if (polymers[k]) {
      let str1 = k[0] + polymers[k]
      store[str1] ? store[str1] += v : store[str1] = v;
      let str2 = polymers[k] + k[1]
      store[str2] ? store[str2] += v : store[str2] = v;
      store[k] -= v;
    }
  }

  // console.log(store);
}

const countp2 = {}
for (let [k,v] of Object.entries(store)) {
  countp2[k[0]] ? countp2[k[0]] += v : countp2[k[0]] = v;
  countp2[k[1]] ? countp2[k[1]] += v : countp2[k[1]] = v;
}
const maxp2 = Math.max(...Object.values(countp2))
const minp2 = Math.min(...Object.values(countp2))
console.log('Part 2: ', Math.floor((maxp2 - minp2) / 2)) // TODO: Find why counting double