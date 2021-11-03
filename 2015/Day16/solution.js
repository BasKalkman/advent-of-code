const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const known = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
}


const allSues = data.map(e => {

    const [input, sue, knownValues] = e.match(/(Sue \d+):(.+)/)
    const obj = {
        sue: sue,
    }
    for (const value of knownValues.split(',').map(e => e.trim())) {
        const [k, v] = value.split(':').map(el => el.trim())
        obj[k] = parseInt(v);
    }

    return obj;
})

const mySue = allSues.filter(e => {
    for (const key in e) {
        if (known[key] !== e[key] && !String(key).match(/sue/)) {
            return false;
        }
    }
    return true;
})

console.log('Part 1: ', mySue[0]['sue'])