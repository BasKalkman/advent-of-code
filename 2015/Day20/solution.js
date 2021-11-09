const target = 29000000;
// const target = 150;

const presents = new Array(target).fill(null);
const presents2 = new Array(target).fill(null);

for (let i = 1; i < target / 10; i++) {
    let count = 0;
    for (let j = i; j < target / 10; j = j + i) {
        if (!presents[i]) { presents[i] = 0 }
        presents[j] = presents[j] + (i * 10);
        // Part 2
        if (count < 50) {
            if (!presents2[i]) { presents2[i] = 0 }
            presents2[j] = presents2[j] + (i * 11);
            count++
        }
    }
}

const part1 = presents.reduce((a, c, i) => {
    return a === 0 && c >= target ? i : a;
}, 0)

const part2 = presents2.reduce((a, c, i) => {
    return a === 0 && c >= target ? i : a;
}, 0)

console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${part2}`)