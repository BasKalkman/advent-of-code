const timestamp = 1008713
const data = '13,x,x,41,x,x,x,x,x,x,x,x,x,467,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,353,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23'.split(',')
// Test
// const timestamp = 939;
// const data = '1789,37,47,1889'.split(',')

// Part 1
const datap1 = data.reduce((a,c) => {
    if (c !== 'x') {
        a.push(parseInt(c))
    }

    return a
}, [])


const part1 = datap1.map(e => {
    let num = 0
    while (num < timestamp) {
        num += e
    }

    let obj = {
        busId: e,
        timeToWait: num - timestamp 
    }

    return obj
}).sort((a,b) => a.timeToWait - b.timeToWait)
console.log('Part 1: ', part1[0].timeToWait * part1[0].busId)

// Part 2
// Please don't ask me how this works. I worked backward from given answers, tried testcases until it gave the correct answer...

const datap2 = data.map((e,i) => {
    if (e !== 'x') {
        return [parseInt(e), i]
    }
}).filter(e => e)

let solved = false
let i = 2
let stepsize = 1
let matched = new Map()

while(!solved) {
    let match = true
    for (let j = 0 ; j < datap2.length; j++) {
        let [id, offset] = datap2[j]

        if ((i + offset) % id !== 0) {
            match = false
        } else {
            if (!matched.has(id)) {
                matched.set(id, matched.size)
                stepsize *= id
            }
        }
    }

    if (match === true) {
        console.log(i)
        solved = true
    }

    i += stepsize
}

