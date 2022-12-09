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
        console.log(tmpY);
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
console.log(visibleCount);
