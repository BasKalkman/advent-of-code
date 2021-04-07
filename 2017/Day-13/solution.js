const fs = require('fs');

const lasers = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map(item => {
    let temp = item.split(':');
    let obj = {};

    obj.currentPosition = 0;
    obj.returning = false;
    obj.depth = parseInt(temp[0]);
    obj.range = parseInt(temp[1]);
    obj.freq = obj.range * 2 - 2;

    return obj;
  });

const packet = {
  position: -1,
  caughtSeverity: 0,
  timesCaught: 0
};

// Part 1
for (let i = 0; i < 100; i++) {
  movePacket();
}
console.log('Part 1: ', packet.caughtSeverity);

// Part 2 -- Calculated
// Still takes a couple of minutes, but at least it's not years
let delay = 0;
let caught = false;
let completed = false;

while (completed === false) {
  lasers.forEach(laser => {
    // packet enters at
    let time = laser.depth + delay;
    // Determine laser position at that time
    let position = time % laser.freq;
    // If at 0
    if (position === 0) {
      caught = true;
    }
  });
  if (caught === true) {
    delay++;
    console.log(delay);
    caught = false;
  } else {
    completed = true;
    console.log('Part 2: ', delay);
  }
}

// Functions
function movePacket() {
  // Move packet
  packet.position++;

  // Check if packet runs into a laser
  let index = lasers.findIndex(laser => laser.depth === packet.position);
  if (index !== -1) {
    // If a laser is found
    if (lasers[index].currentPosition === 0) {
      let severity = lasers[index].depth * lasers[index].range;
      packet.timesCaught++;
      packet.caughtSeverity += severity;
    }
  }

  // Move lasers
  lasers.forEach(laser => {
    // End of range? Set returning true
    if (laser.currentPosition === laser.range - 1) {
      laser.returning = true;
    }
    // Position 0? Set returning false
    if (laser.currentPosition === 0) {
      laser.returning = false;
    }
    // leaving or returning?
    if (laser.returning === true) {
      laser.currentPosition--;
    } else {
      laser.currentPosition++;
    }
  });
}
