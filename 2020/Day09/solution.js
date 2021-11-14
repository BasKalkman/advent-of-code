const { Console } = require('console');
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(Number);

// Part 1
function part1() {
    let invalidNum = false;
    let i = 0;

    while (invalidNum === false && i < data.length) {
        let arr = data.slice(i, i + 26);
        let checkNum = arr[arr.length - 1];
        let foundSum = false;

        for (let j = 0; j < arr.length - 2; j++) {
            let difference = Math.abs(arr[j] - checkNum);
            if (arr.includes(difference)) {
                foundSum = true;
                break;
            }
        }

        if (foundSum === false) {
            return checkNum;
        }

        i++;
    }
}

console.log('Part 1: ', part1());

// Part 2
function part2() {
    let invalidNum = part1();
    let sum = 0;
    let i = 0; 
    let j = 0;

    while (sum !== invalidNum) {
        while (sum < invalidNum) {
            sum += data[i]
            i++
        }
        
        while (sum > invalidNum) {
            sum -= data[j]
            j++
        }
    }

    let minmaxArray = data.slice(j,i).sort((a,b) => a - b);

    let min = Math.min(...minmaxArray)
    let max = Math.max(...minmaxArray)

    return min + max

}

console.log('Part 2: ', part2())

