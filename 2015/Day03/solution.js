const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('')

// Part 1

class SantaWorker {
  constructor() {
    this.x = 0;
    this.y = 0;
  } 

  move(dir) {
    switch(dir) {
    case '>':
      this.x++
      break;
    case '<':
      this.x--
      break;
    case '^':
        this.y++
        break;
    case 'v':
      this.y--
      break;  
    default:
        break;
      }
    }

  strCoord() {
    return `${this.x},${this.y}`;
  }
}


const visitedHomes = new Map();
const santa = new SantaWorker();
visitedHomes.set(santa.strCoord(), 1)

for (dir of data) {
  santa.move(dir)
  visitedHomes.set(santa.strCoord(), 1)
}
    
console.log('Part 1: ', visitedHomes.size)

// Part 2
const homesP2 = new Map()
const robo = new SantaWorker()
const santap2 = new SantaWorker()
homesP2.set(robo.strCoord(), 1)
homesP2.set(santap2.strCoord(), 1)

data.map((dir,i) => {
  if (i % 2 === 0) {
    santap2.move(dir)
    homesP2.set(santap2.strCoord(), 1)
  } else {
    robo.move(dir)
    homesP2.set(robo.strCoord(), 1)
  }
})

console.log('Part 2: ', homesP2.size)