const input = 325489;
let values = { x0y0: 1 };
let result2 = 0;

// Part 1
function part1() {
  let dir = 'right';
  let steps = 1;
  let x = 0;
  let y = 0;
  let counter = 1;

  while (counter < input) {
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < steps; i++) {
        if (counter === input) {
          break;
        }
        switch (dir) {
          case 'right':
            x++;
            break;
          case 'up':
            y++;
            break;
          case 'left':
            x--;
            break;
          case 'down':
            y--;
            break;
          default:
            console.log('woops');
        }
        // Write to Obj
        let coord = `x${x}y${y}`;
        values[coord] = checkSurroundingValues(x, y);
        //Increase counter
        counter++;
      }
      // Change Direction
      switch (dir) {
        case 'right':
          dir = 'up';
          break;
        case 'up':
          dir = 'left';
          break;
        case 'left':
          dir = 'down';
          break;
        case 'down':
          dir = 'right';
          break;
        default:
          console.log('woops, dir not changed');
      }
    }
    steps++;
  }

  let diff = Math.abs(x) + Math.abs(y);
  console.log('Part 1: ', diff);
  console.log('Part 2: ', result2);
}
part1();

// Part 2
function checkSurroundingValues(x, y) {
  let value = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        value += 0;
      } else {
        let coord = `x${parseInt(x) + j}y${parseInt(y) + i}`;
        value += values[coord] || 0;
      }
    }
  }
  if (value > input && result2 === 0) {
    result2 = value;
  }
  return value;
}
