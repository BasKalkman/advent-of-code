const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let validPasswords = 0;
let validPasswordsPart2 = 0;

for (let i = 0; i < data.length; i++) {
    let split = data[i].split(' ');
    let [min, max] = split[0].split('-').map(Number);
    let letter = split[1][0];
    let pw = split[2];

    // Part 1
    let occurences = pw.split('').filter((e) => e === letter);
    let numOccurences = occurences.length;
    if (min <= numOccurences && numOccurences <= max) {
        validPasswords++;
    }

    // Part 2
    if (pw[min - 1] === letter && pw[max - 1] !== pw[min - 1]) {
        validPasswordsPart2++;
    }
    if (pw[max - 1] === letter && pw[max - 1] !== pw[min - 1]) {
        validPasswordsPart2++;
    }
}

console.log('Part 1: ', validPasswords);
console.log('Part 2: ', validPasswordsPart2);
