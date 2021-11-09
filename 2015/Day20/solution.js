const target = 29000000;
// const target = 150;

const presents = new Array(target).fill(null);

for (let i = 1; i < target / 10; i++) {
    for (let j = i; j < target / 10; j = j + i) {
        if (!presents[i]) { presents[i] = 0 }
        presents[j] = presents[j] + (i * 10);
    }
}

const part1 = presents.reduce((a, c, i) => {
    return a === 0 && c >= target ? i : a;
}, 0)
console.log(`Part 1: ${part1}`)


// Part 2
const presents2 = new Array(target).fill(null);

for (let i = 1; i < target / 10; i++) {
    let count = 0;
    for (let j = i; j < target / 10; j = j + i) {
        if (!presents2[i]) { presents2[i] = 0 }
        presents2[j] = presents2[j] + (i * 11);
        count++
        if (count === 50) {
            count = 0;
            break;
        }
    }
}

const part2 = presents2.reduce((a, c, i) => {
    return a === 0 && c >= target ? i : a;
}, 0)
console.log(`Part 2: ${part2}`)
