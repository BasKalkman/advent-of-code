const fs = require('fs');
// const data = fs.readFileSync('./test.txt', 'utf-8').split('\n');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const head = {x: 0, y: 0}

class Tail {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.visited = new Set();
		this.visited.add(this.coordString())
	}

	coordString() {
		return `x${this.x}y${this.y}`;
	}

	coords() {
		return [this.x, this.y];
	}

	moveToHead(hx, hy) {
		if (Math.abs(hx - this.x) > 1 || Math.abs(hy - this.y) > 1) {
			if (this.x === hx) {
				hy > this.y ? this.y++ : this.y--;
			} else if (this.y === hy) {
				hx > this.x ? this.x++ : this.x--;
			} else {
				hx > this.x ? this.x++ : this.x--;
				hy > this.y ? this.y++ : this.y--;
			}
			this.visited.add(this.coordString());
		}
	}
}
const tail = new Tail();

for (const instruction of data) {
	const [dir, num] = instruction.split(/\W/g);
	for (let i = 0; i < parseInt(num); i++) {
		if (dir === 'U') head.y++
		if (dir === 'D') head.y--
		if (dir === 'L') head.x--
		if (dir === 'R') head.x++

		tail.moveToHead(head.x, head.y);
	}	
}
console.log('Part 1: ', tail.visited.size);

// Part 2
head.x = 0;
head.y = 0;
const tails = []
for (let i = 0; i < 9; i++) {
	tails.push(new Tail())
}

for (const instruction of data) {
	const [dir, num] = instruction.split(/\W/g);
	for (let i = 0; i < parseInt(num); i++) {
		if (dir === 'U') head.y++
		if (dir === 'D') head.y--
		if (dir === 'L') head.x--
		if (dir === 'R') head.x++
		tails[0].moveToHead(head.x, head.y);
		for (let j = 1; j < tails.length; j++) {
			const [tx, ty] = tails[j-1].coords();
			tails[j].moveToHead(tx, ty);
		}
	}	
}

const part2 = tails[tails.length - 1].visited.size;
console.log('Part 2: ', part2)