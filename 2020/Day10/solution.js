const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(Number).sort((a,b) => a - b)
data.unshift(0)
data.push(data[data.length-1] + 3)

// Part 1
function part1() {
    let diff1 = 0
    let diff3 = 0

    for (let i = 0; i < data.length - 1; i++) {
        if (data[i+1] - data[i] === 3) {
            diff3++
        } else if (data[i+1] - data[i] === 1) {
            diff1++
        }
    }

    return diff1 * diff3
}

console.log(part1())



// Part 2
const DP = new Map()
function check(i) {
    if (i === data.length - 1) {
        return 1
    }
    if (DP.has(i)) {
        return DP.get(i)
    }

    let ans = 0;
    for (let j = i+1; j < data.length; j++) {
        if(data[j] - data[i] <=3) {
            ans += check(j)
        }
    }
    DP.set(i, ans)
    return ans
}

console.log(check(0))