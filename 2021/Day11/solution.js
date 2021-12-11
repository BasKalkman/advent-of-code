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
let allFlashed = false;
let i = 0;
while (!allFlashed) {
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

  i++

  const noFlashThisRound = octopi.filter(e => {
    return e.hasFlashed === false;
  })
  if (noFlashThisRound.length === 0) {
    allFlashed = true
    console.log(`Part 2: ${i}`)
  }


  // For part 1
  if (i === 100) {
    console.log(`Part 1: ${flashCount}`)
  }
}
