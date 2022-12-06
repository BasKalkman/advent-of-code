const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split("\n")

class Stack {
	constructor(str) {
		this.stack = [...str.split('')];
	}

	put(arr) {
		if (Array.isArray(arr)) {
			this.stack.push(...arr)
		} else {
			this.stack.push(arr);
		}
	}

	take(n) {
		return this.stack.splice(this.stack.length  - n);
	}
}

const stacks = [
	new Stack('NDMQBPZ'),
	new Stack('CLZQMDHV'),
	new Stack('QHRDVFZG'),
	new Stack('HGDFN'),
	new Stack('NFQ'),
	new Stack('DQVZFBT'),
	new Stack('QMTZDVSH'),
	new Stack('MGFPNQ'),
	new Stack('BWRM')
]


for (const line of data) {
	if (line.match(/^move/)) {
		const nums = line.match(/\d+/g).map(Number);
		const removed = stacks[nums[1] - 1].take(nums[0]).reverse(); // Part 1
		// const removed = stacks[nums[1] - 1].take(nums[0]) // Part 2
		stacks[nums[2] - 1].put(removed);
	}
}

const result = stacks.map(e => {
	return e.stack[e.stack.length - 1]
})
console.log(result.join(''));