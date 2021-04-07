const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');
const datap2 = [...data]

// Part 1
function numTo36BitString(num) {
    if (typeof num !== 'number') {
        num = parseInt(num)
    }
    let str = num.toString(2)

    while (str.length < 36) {
        str = '0' + str;
    }

    return str
}

function processMask(num, mask) {
    let str = numTo36BitString(num).split('')
    let msk = mask.split('')

    for (let i = 0; i < str.length; i++) {
        if (msk[i] !== 'X') {
            str[i] = msk[i]
        }
    }

    let newNum = parseInt(str.join(''), 2)

    return newNum
}

const registers = new Map()
let mask = ''
for (let i = 0; i < data.length; i++) {
    let [instruction, value] = data[i].split(' = ')
    
    if (instruction === 'mask') {
        mask = value
    } else {
        let register = instruction.match(/\d+/)[0];
        let num = processMask(value, mask)
        registers.set(register, num)
    }
}

let totalP1 = 0
registers.forEach((a) => totalP1 += a)
console.log('Part 1: ', totalP1)

// Part 2
const registersP2 = new Map()
mask = ''
for (let i = 0; i < datap2.length; i++) {
    let [instruction, value] = datap2[i].split(' = ')
    
    if (instruction === 'mask') {
        mask = value
    } else {
        let masks = generateMasks(mask);
        let register = instruction.match(/\d+/)[0];

        masks.forEach(m => {
            let r = processMask(register, m)
            registersP2.set(r, value)
        })
    }
}

let resultP2 = 0;
registersP2.forEach(a => resultP2 += parseInt(a))
console.log('Part 2: ', resultP2)

function generateStates(n){
  var states = [];

  // Convert to decimal
  var maxDecimal = parseInt("1".repeat(n),2);

  // For every number between 0->decimal
  for(var i = 0; i <= maxDecimal; i++){
    // Convert to binary, pad with 0, and add to final results
    states.push(i.toString(2).padStart(n,'0'));
  }

  return states;
}


function generateMasks(mask) {
    let numOfX = mask.match(/X/g).length
    let states = generateStates(numOfX).map(e => e.split(''))
    let results = []

    for (let i = 0; i < states.length; i++) {
        let temp = mask
        let arr = states[i]
        while (temp.match(/X/)) {
            temp = temp.replace('X', arr.pop())
        }
        results.push(temp)
    }
    
    return results
}

// 945115037994 incorrect for p2