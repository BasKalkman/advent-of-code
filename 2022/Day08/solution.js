const fs = require('fs');
// const data = fs.readFileSync('./test.txt', 'utf-8');
const data = fs.readFileSync('./input.txt', 'utf-8');
const trees = data.split('\n').map((e) => e.trim().split('').map(Number));

const checkTree = (y, x) => {
    const height = trees[y][x];
    let tmpY = y;
    let tmpX = x;
    let visibleTop = true;
    let visibleLeft = true;
    let visibleRight = true;
    let visibleBottom = true;
    while (tmpY > 0) {
        tmpY--;
        if (trees[tmpY][tmpX] >= height) {
            visibleTop = false;
            break;
        }
    }

    tmpY = y;
    tmpX = x;
    // TODO: Why length-1 here but not on x axis?
    while (tmpY < trees.length - 1) {
        tmpY++;
        if (trees[tmpY][tmpX] >= height) {
            visibleBottom = false;
            break;
        }
    }

    tmpY = y;
    tmpX = x;
    while (tmpX > 0) {
        tmpX--;
        if (trees[tmpY][tmpX] >= height) {
            visibleLeft = false;
            break;
        }
    }

    tmpY = y;
    tmpX = x;
    while (tmpX < trees[y].length) {
        tmpX++;
        if (trees[tmpY][tmpX] >= height) {
            visibleRight = false;
            break;
        }
    }

    return visibleBottom || visibleLeft || visibleRight || visibleTop;
};

let visibleCount = 0;
for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees.length; x++) {
        if (checkTree(y, x)) visibleCount++;
    }
}
console.log(`Part 1: ${visibleCount}`);

// Part 2
const getScenicScore = (y, x) => {
    const height = trees[y][x];
    let up = 0;
    let down = 0;
    let left = 0;
    let right = 0;
    let tmpY = y;
    let tmpX = x;

    while (tmpY > 0) {
        up++;
        tmpY--;
        if (trees[tmpY][tmpX] >= height) break;
    }
    tmpY = y;
    while (tmpY < trees.length - 1) {
        down++;
        tmpY++;
        if (trees[tmpY][tmpX] >= height) break;
    }
    tmpY = y;
    while (tmpX > 0) {
        left++;
        tmpX--;
        if (trees[tmpY][tmpX] >= height) break;
    }
    tmpY = y;
    tmpX = x;
    while (tmpX < trees[tmpY].length) {
        right++;
        tmpX++;
        if (trees[tmpY][tmpX] >= height) break;
    }

    return up * down * left * right;
};

const counts = [];
for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees[y].length; x++) {
        counts.push(getScenicScore(y, x));
    }
}
console.log(`Part 2: ${Math.max(...counts)}`);
