// Test with the example from the problem
const testData = [
    'L68', 'L30', 'R48', 'L5', 'R60', 'L55', 'L1', 'L99', 'R14', 'L82'
];

const result = testData.reduce((acc, line) => {
    const dir = line[0];
    const distance = parseInt(line.slice(1));
    const currentPos = acc.position;

    let newPos;
    let timesAt0 = 0;

    if (dir === 'L') {
        newPos = (currentPos - (distance % 100) + 100) % 100;

        timesAt0 = Math.floor(distance / 100);

        const remainder = distance % 100;
        if (currentPos > 0 && remainder >= currentPos) {
            timesAt0++;
        }
    } else {
        newPos = (currentPos + distance) % 100;

        const start = currentPos + 1;
        const end = currentPos + distance;

        const firstMultiple = Math.ceil(start / 100) * 100;
        if (firstMultiple <= end) {
            timesAt0 = Math.floor((end - firstMultiple) / 100) + 1;
        }
    }

    console.log(`${line}: ${currentPos} -> ${newPos} (at 0: ${timesAt0} times)`);

    if (newPos === 0) {
        acc.part1++;
    }

    acc.part2 += timesAt0;

    acc.position = newPos;
    return acc;
}, { position: 50, part1: 0, part2: 0 });

console.log("\nPart 1 (ends at 0):", result.part1, "(expected: 3)");
console.log("Part 2 (all times at 0):", result.part2, "(expected: 6)");
