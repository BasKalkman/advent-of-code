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
console.log(tail.visited.size);