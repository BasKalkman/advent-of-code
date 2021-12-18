const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8')
const [x1,x2,y1,y2] = data.match(/-?\d+/g).map(Number)

const checkInTarget = (x, y) => {
  const inX = x >= x1 && x <= x2
  const inY = y >= y1 && y <= y2

  return inX && inY
}

const checkTrajectory = (initialX,initialY) => {
  let x = y = 0;
  let dx = initialX
  let dy = initialY
  let hits = false
  let maxY = 0

  while (x <= x2 && y >= y1) {
    x += dx
    y += dy
    if (y > maxY) {
      maxY = y
    }

    if (checkInTarget(x,y) === true) {
      hits = true;
      break;
    }

    if (dx > 0) {
      dx--
    }
    dy--

  }

  return {hits: hits, maxY: maxY, x: initialX, y: initialY};
}

const trajectories = []
for (let x = 0; x < 250; x++) {
  for (let y = -50; y < 200; y++) {
    trajectories.push(checkTrajectory(x,y))
  }
}

const highestTrajectory = trajectories.filter(e => e.hits).reduce((a,c) => {
  if (a === null || c.maxY > a.maxY) return c;
  return a
}, null)
console.log(highestTrajectory)