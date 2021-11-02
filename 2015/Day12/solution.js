const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8');

const nums = data.match(/-?\d+/g).reduce((a, c) => {
    return a + parseInt(c)
}, 0)

console.log(nums);

// Part 2
const parsed = JSON.parse(data);

let result = 0;

const checkJSON = (value) => {
    if (typeof value === 'number') {
        result += value;
        return;
    }

    if (Array.isArray(value)) {
        value.map(e => checkJSON(e));
        return;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
        let valuesInObject = Object.values(value);
        if (!valuesInObject.includes('red')) {
            valuesInObject.map(e => checkJSON(e));
        }
    }
}

Object.values(parsed).map(e => checkJSON(e));

console.log(result);