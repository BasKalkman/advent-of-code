const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split(',').map(Number)

const schoolOfFish = [...data];

for (let i=0; i < 80; i++) {
  const tempFish = [];
  for (let fish=0; fish < schoolOfFish.length; fish++) {
    schoolOfFish[fish]--

    if (schoolOfFish[fish] < 0) {
      schoolOfFish[fish] = 6;
      tempFish.push(8)
    }
  }

  schoolOfFish.push(...tempFish)
  tempFish.length = 0;
}

console.log(schoolOfFish.length)