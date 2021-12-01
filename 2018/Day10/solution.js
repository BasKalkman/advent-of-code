const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map(line => {
    let numbers = line.match(/[ -]+\d+,[ -]+\d+/g);
    let coordXY = numbers[0].trim().split(',');
    let velocityXY = numbers[1].trim().split(',');
    let obj = {
      x: parseInt(coordXY[0]),
      y: parseInt(coordXY[1]),
      vX: parseInt(velocityXY[0]),
      vY: parseInt(velocityXY[1])
    };
    return obj;
  });

// Manual test for where smallest area is: 10036
for (let i = 10020; i < 10040; i++) {
  let tmp = [];
  data.forEach(el => {
    tmp.push(el.y + i * el.vY);
  });
  console.log('----------------------');
  console.log('Time: ', i);
  console.log('Min value: ', Math.min(...tmp));
  console.log('Max value: ', Math.max(...tmp));
  console.log('Diff: ', Math.max(...tmp) - Math.min(...tmp));
  console.log('----------------------');
}
