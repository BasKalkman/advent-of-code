const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const runInstructions = (p2 = false) => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0; // Part 2

    for (const line of data) {
        const [dir, num] = line.split(' ');

        switch (dir) {
            case 'forward':
                if (p2) {
                    horizontal += parseInt(num);
                    depth += aim * parseInt(num);
                } else {
                    horizontal += parseInt(num);
                }
                break;
            case 'up':
                p2 ? aim -= parseInt(num) : depth -= parseInt(num);
                break;
            case 'down':
                p2 ? aim += parseInt(num) : depth += parseInt(num);
                break;
            default:
                break;
        }
    }

    return horizontal * depth
}




console.log(`Part 1: ${runInstructions()}`)
console.log(`Part 2: ${runInstructions(true)}`)
