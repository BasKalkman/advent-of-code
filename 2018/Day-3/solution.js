const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  // Split data to usable array of objects
  const claims = data.split('\r\n').map(line => {
    let obj = {};

    obj.id = line.match(/#([0-9]{1,})/g)[0].replace('#', '');
    obj.coords = line
      .match(/([0-9]{1,3},[0-9]{1,3})/g)[0]
      .split(',')
      .map(item => parseInt(item));
    obj.size = line
      .match(/([0-9]{1,}x[0-9]{1,})/g)[0]
      .split('x')
      .map(item => parseInt(item));

    return obj;
  });

  // Create map
  const map = createMap();

  // Fill the map with claims
  claims.forEach(obj => {
    let x = obj.coords[0];
    let y = obj.coords[1];
    let w = obj.size[0];
    let h = obj.size[1];

    for (let i = y; i <= y + h - 1; i++) {
      for (let j = x; j <= x + w - 1; j++) {
        map[i][j]++;
      }
    }
  });

  // count coords with more than 1 claim
  let count = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] > 1) {
        count++;
      }
    }
  }
  console.log(count);

  // PART 2
  // Check the map for one claim that never overlaps

  claims.forEach(claim => {
    let x = claim.coords[0];
    let y = claim.coords[1];
    let w = claim.size[0];
    let h = claim.size[1];
    let countOverlap = 0;

    for (let i = y; i <= y + h - 1; i++) {
      for (let j = x; j <= x + w - 1; j++) {
        if (map[i][j] != 1) {
          countOverlap++;
        }
      }
    }

    if (countOverlap === 0) {
      console.log(claim.id);
    }
  });
});

function createMap() {
  let map = [];

  for (let i = 0; i < 1000; i++) {
    let tempArr = new Array(1000).fill(0);
    map.push(tempArr);
  }

  return map;
}
