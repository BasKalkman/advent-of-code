const input = 3999;

function getPower(x, y) {
  let rackID = x + 10;
  let power = rackID * y + input;
  power = power * rackID;
  power = Math.floor((power / 100) % 10);
  power = power - 5;

  return power;
}

// Part 1
let maxPower = 0;
let coords = '';

for (let x = 1; x <= 298; x++) {
  for (let y = 1; y <= 298; y++) {
    let num = 0;

    for (let dx = 0; dx < 3; dx++) {
      for (let dy = 0; dy < 3; dy++) {
        num += getPower(x + dx, y + dy);
      }
    }

    if (num > maxPower) {
      maxPower = num;
      coords = `${x},${y}`;
    }
  }
}

console.log('Part 1: ', coords);

// Part 2
let size = 1;
let maxPart2 = 0;
let coordsPart2 = '';

while (size <= 300) {
  for (let x = 1; x <= 301 - size; x++) {
    for (let y = 1; y <= 301 - size; y++) {
      let num = 0;

      for (let dx = 0; dx < size; dx++) {
        for (let dy = 0; dy < size; dy++) {
          num += getPower(x + dx, y + dy);
        }
      }

      if (num > maxPart2) {
        maxPart2 = num;
        coordsPart2 = `${x},${y},${size}`;
        console.log(maxPart2, coordsPart2);
      }
    }
  }
  size++;
}

console.log('Part 2: ', coordsPart2);
