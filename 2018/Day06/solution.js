const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map(item => {
    let coords = item.split(',').map(Number);
    return coords;
  });

const maxY = data.reduce((a, c) => {
  return c[1] > a ? c[1] : a;
}, 0);
const maxX = data.reduce((a, c) => {
  return c[0] > a ? c[0] : a;
}, 0);

const map = Array(maxY).fill(Array(maxX).fill('.'));
