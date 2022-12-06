const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('')

for (let i = 4; i < data.length; i++) {
	let sub = data.slice(i-4, i) 
	if (sub.length === new Set(sub).size) {
		console.log(`Part 1: ${i}`);
		break;
	}
}

for (let i = 14; i < data.length; i++) {
	let sub = data.slice(i-14, i);
	if (sub.length === new Set(sub).size) {
		console.log(`Part 2: ${i}`)
		break;
	}
}