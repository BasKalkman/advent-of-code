const fs = require('fs');
const data = fs
    .readFileSync('./input.txt', 'utf-8')
    .replace(/Card \d+:/g, '')
    .split('\n')
    .map((e) => e.trim());

class Card {
    constructor(left, right) {
        this.left = left;
        this.right = right;
        this.overlap = this.right.filter((e) => this.left.includes(e)).length;
        this.copies = 1;
    }
    addCopy(n) {
        this.copies += n;
    }
    getValue() {
        if (this.overlap === 0) return 0;
        let value = 1;
        let x = 0;
        while (x < this.overlap - 1) {
            value += value;
            x++;
        }
        return value;
    }
}

// Part 1

const cards = data.map((e) => {
    const [left, right] = e.split('|').map((el) =>
        el
            .trim()
            .split(' ')
            .filter((item) => item !== '')
    );
    return new Card(left, right);
});

const part1 = cards.reduce((a, c) => a + c.getValue(), 0);
console.log('Part 1: ', part1);

// Part 2
cards.map((e, idx) => {
    for (let x = 0; x < e.overlap; x++) {
        cards[idx + x + 1].addCopy(e.copies);
    }
});
const part2 = cards.reduce((a, c) => a + c.copies, 0);
console.log('Part 2: ', part2);
