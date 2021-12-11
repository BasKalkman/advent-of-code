const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/);
// const data = fs.readFileSync('./example.txt', 'utf-8').split(/\r?\n/);
const OctopusClass = require('./Octopus');

// Make array of octopi
const octopi = []
data.map((e,y) => {
  e.split('').map((el, x) => {
      octopi.push(new OctopusClass(parseInt(el), parseInt(y), parseInt(x)))
  })
})

// Run rounds
let flashCount = 0;
for (let i = 0; i<100; i++) {
  const flashStack = [];
  for (octopus of octopi) {
    let flash = octopus.newStep();
    if (flash !== false) {
      flashStack.push(flash)
    }
  }

  while (flashStack.length > 0) {
    const {x,y} = flashStack.shift();
    flashCount++
    for (octopus of octopi) {
      const flash = octopus.receiveFlash(x,y)
      if (flash !== false) {
        flashStack.push(flash)
      };
    }
  }
}

console.log(flashCount)