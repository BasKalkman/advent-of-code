const input = ['1321131112'];

const makeSequence = (input) => {
    const arr = input.split('');
    let result = []
    let currentNum = null
    let currentCount = null

    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            currentNum = arr[i]
            currentCount = 0
        }

        if (arr[i] === currentNum) {
            currentCount++
        } else {
            result.push(currentCount, currentNum);
            currentNum = arr[i]
            currentCount = 1;
        }

        if (i === arr.length - 1) {
            result.push(currentCount, currentNum);
        }
    }

    return result.join('');
}

for (let i = 0; i < 40; i++) {
    input.push(makeSequence(input[i]))
}

let lastItem = input[input.length - 1];
console.log(`Part 1: ${lastItem.length}`)

// Part 2
for (let i = 40; i < 50; i++) {
    input.push(makeSequence(input[i]))
}

let part2Item = input[input.length - 1];
console.log(`Part 2: ${part2Item.length}`);