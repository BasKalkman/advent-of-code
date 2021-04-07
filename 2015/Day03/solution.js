const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('')

// Part 1
const coord = {
  x: 0,
  y: 0,
}
const visitedHomes = new Map()
visitedHomes.set(`${coord.x},${coord.y}`, visitedHomes.get(coord)+1 || 1)

for (dir of data) {
  switch (dir) {
    case '>':
      coord.x++
      break;
      case '<':
      coord.x--
      break;
      case '^':
        coord.y++
        break;
    case 'v':
      coord.y--
      break;  
      default:
        break;
      }
      visitedHomes.set(`${coord.x},${coord.y}`, visitedHomes.get(coord)+1 || 1)
    }
    
    console.log('Part 1: ', visitedHomes.size)
    