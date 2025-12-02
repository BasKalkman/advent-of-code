const fs = require('fs');
const data = fs.readFileSync("./input.txt", 'utf-8').split(",");


const part1 = data.reduce((a, c) => {

    const [start, end] = c.split("-").map(Number);

    for (let i = start; i <= end; i++) {
        const numString = i.toString();
        const strLength = numString.length;

        if (strLength % 2 != 0) {
            continue;
        }

        const left = numString.substring(0, strLength / 2);
        const right = numString.substring(strLength / 2, strLength);

        if (left === right) {
            a += i;
        }
    }
    return a;
}, 0);

console.log("Part 1: ", part1);



const part2 = data.reduce((a, c) => {

    const [start, end] = c.split("-").map(Number);

    for (let i = start; i <= end; i++) {
        const numString = i.toString();

        for (let n = 1; n <= numString.length / 2; n++) {
            const sub = numString.substring(0, n);
            const repeat = sub.repeat(numString.length / n);
            if (numString === repeat) {
                a += i;
                break;
            }
        }
    }
    return a;
}, 0)
console.log('Part 2: ', part2);