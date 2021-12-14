const fs = require('fs');
const [data, dict] = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n\r?\n/)
// const [data, dict] = fs.readFileSync('./example.txt', 'utf-8').split(/\r?\n\r?\n/)

// Setup polymer store
const polymers = dict.split(/\r?\n/).reduce((a,c) => {
  const [input, out] = c.split(' -> ')
  a[input] = out;
  return a;
}, {})

const getResult = (store) => {
  const countp2 = {}
  for (let [k,v] of Object.entries(store)) {
    countp2[k[0]] ? countp2[k[0]] += v : countp2[k[0]] = v;
  }
  countp2[data[data.length -1]] += 1 // Last letter of input would otherwise not be counted
  const maxp2 = Math.max(...Object.values(countp2))
  const minp2 = Math.min(...Object.values(countp2))
  // console.log(`Part 2: ${maxp2 - minp2} `)

  return maxp2 - minp2
}

let store = {}
// Setupt initial state
for (let i = 0; i < data.length - 1; i++ ) {
  let check = data.slice(i, i+2)
  if (!store[check]) store[check] = 0
  store[check]++
}

// Run polymerization
for (let i = 0; i < 40; i++) {
  if (i === 10) {
    console.log(`Part 1: ${getResult(store)}`)
  }

  for ([k,v] of Object.entries(store)) {
    if (polymers[k]) {
      let str1 = k[0] + polymers[k]
      store[str1] ? store[str1] += v : store[str1] = v;
      let str2 = polymers[k] + k[1]
      store[str2] ? store[str2] += v : store[str2] = v;
      store[k] -= v;
    }
  }
}
console.log(`Part 2: ${getResult(store)}`)