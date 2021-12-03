const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')
// const data = fs.readFileSync('./test.txt', 'utf-8').split('\n')

const bits = data.reduce((a, c) => {
    c.split('').map((e, idx) => {
        a[idx] ? a[idx] += e : a[idx] = e;
    })
    return a;

}, new Array(data[0].length).fill(null))

const mostCommonBits = bits.reduce((a, c, i) => {
    c.match(/0/g).length > c.length / 2 ? a[i] = '0' : a[i] = '1';
    return a
}, [])

const leastCommonBits = mostCommonBits.map(e => {
    return e === '1' ? '0' : '1';
})

const part1 = parseInt(mostCommonBits.join(''), 2) * parseInt(leastCommonBits.join(''), 2);
console.log(`Part 1: ${part1}`)

// Part 2
const getCounts = (arr, idx) => {
    const nums = arr.reduce((a, c) => {
        a[parseInt(c[idx])]++
        return a;
    }, [0, 0])
    return nums;
}

let oxyRating = [...data]
let co2Rating = [...data]
let i = 0;
let running = true
while (running) {
    if (oxyRating.length === 1 && co2Rating.length === 1) {
        running = false;
    }

    if (oxyRating.length > 1) {
        const [zeroes, ones] = getCounts(oxyRating, i)
        const mostCommon = zeroes > ones ? '0' : '1'
        oxyRating = oxyRating.filter(e => {
            if (zeroes === ones) {
                return e[i] === '1' ? true : false
            }
            return e[i] === mostCommon ? true : false
        })
    }

    if (co2Rating.length > 1) {
        const [zeroes, ones] = getCounts(co2Rating, i)
        const mostCommon = zeroes > ones ? '0' : '1'
        co2Rating = co2Rating.filter(e => {
            if (zeroes === ones) {
                return e[i] === '0' ? true : false
            }
            return e[i] !== mostCommon ? true : false
        })
    }

    i++
}

const oxy = parseInt(oxyRating[0], 2)
const co2 = parseInt(co2Rating[0], 2)

console.log(`Part 2: ${oxy * co2}`)

