const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const fullyInside = (assigned) => {
    const [area1, area2] = assigned.split(',');
    const [low1, high1] = area1.split('-').map(Number);
    const [low2, high2] = area2.split('-').map(Number);

    if (low1 >= low2 && high1 <= high2) return true;
    if (low2 >= low1 && high2 <= high1) return true;
    return false;
}

const partlyInside = (assigned) => {
    const [area1, area2] = assigned.split(',');
    const [low1, high1] = area1.split('-').map(Number);
    const [low2, high2] = area2.split('-').map(Number);

    if (low1 <= high2 && low1 >= low2) return true;
    if (low2 <= high1 && low2 >= low1) return true;
    if (high1 >= low2 && high1 <= high2) return true;
    if (high2 >= low1 && high2 <= high1) return true;
    if (low1 >= low2 && high1 <= high2) return true;
    if (low2 >= low1 && high2 <= high1) return true;
    return false;
}

const part1 = data.filter(e => fullyInside(e))
console.log(`Part 1: ${part1.length}`)

const part2 = data.filter(e => partlyInside(e));
console.log(`Part 2: ${part2.length}`)