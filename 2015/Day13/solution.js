const fs = require('fs');
const { permuteArray } = require('../../shared/permute');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(e => {
    let str = e.replace('lose ', '-').replace(/would|gain|happiness units by sitting next to|\.$/g, '')
    return str;
})

const matrix = {}

for (const line of data) {
    const [name1, units, name2] = line.split(/\s+/g);
    if (!matrix[name1]) {
        matrix[name1] = {}
    }

    matrix[name1][name2] = parseInt(units)
}

const permutations = permuteArray(Object.keys(matrix));
const seatingResult = permutations.map(e => {
    let result = 0;
    for (let i = 0; i < e.length; i++) {
        const [person1, person2] = [e[i], e[(i + 1) % e.length]]

        result += matrix[person1][person2];
        result += matrix[person2][person1];
    }
    return result;
})

console.log(Math.max(...seatingResult))

// Part 2
for (let person of Object.keys(matrix)) {
    if (!matrix['self']) {
        matrix['self'] = {}
    }

    matrix['self'][person] = 0;
    matrix[person]['self'] = 0;
}

const permutationsP2 = permuteArray(Object.keys(matrix));
const seatingResultP2 = permutationsP2.map(e => {
    let result = 0;
    for (let i = 0; i < e.length; i++) {
        const [person1, person2] = [e[i], e[(i + 1) % e.length]]

        result += matrix[person1][person2];
        result += matrix[person2][person1];
    }
    return result;
})

let max = 0;
for (let result of seatingResultP2) {
    if (result > max) {
        max = result
    }
}
console.log(max)