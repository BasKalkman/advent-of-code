const fs = require('fs');
const data = fs.readFileSync('./test.txt', 'utf-8').split('\n');
// const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

class Head {
	constructor() {
		this.x = 0;
		this.y = 0;
	}

	move(dir) {
		if (dir === 'U') this.y++;
		if (dir === 'D') this.y--;
		if (dir === 'L') this.x--;
		if (dir === 'R') this.x++;
	}

	coords() {
		return `x${this.x}y${this.y}`;
	}
}

class Tail {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.visited = new Set();
		this.visited.add(this.coords());
	}

	coords() {
		return `x${this.x}y${this.y}`;
	}

	isNextToHead(headCoords) {
		const neighbors = [[-1,-1], [-1,0], [-1,1], [0, -1], [0,1], [1,-1], [1,0], [1,1]];
		const neighborCoords = neighbors.map(e => {
			const [x,y] = e;
			return `x${this.x + x}y${this.y + y}`
		})
		return neighborCoords.includes(headCoords);
	}

	moveToHead(headCoords) {
		const [x,y] = headCoords.match(/\d+/g).map(Number);

		if (this.x === x) {
			// Same row
			x > this.x ? this.x++ : this.x--;
		}
		if (this.y === y) {
			// same column
			y > this.y ? this.y++ : this.y--;
		}
		// Diagonal logic
		if (x > this.x && y > this.y) {
			this.x++;
			this.y++;
		}
		if (x < this.x && y > this.y) {
			this.x--;
			this.y++;
		}
		if (x > this.x && y < this.y) {
			this.x++;
			this.y--;
		}
		if (x < this.x && y < this.y) {
			this.x--;
			this.y--;
		}

		this.visited.add(this.coords());
	}
}

const head = new Head;
const tail = new Tail;

for (const instruction of data) {
	const [dir, num] = instruction.split(' ');
	for (let i = 0; i < parseInt(num); i++) {
		head.move(dir);
		if (!tail.isNextToHead(head.coords())) {
			tail.moveToHead(head.coords());
		}
	}
}
console.log(tail.visited.size);