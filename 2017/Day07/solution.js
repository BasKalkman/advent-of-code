const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map(item => {
    let obj = {};
    let arr = item.match(/([a-z]{3,})/g);
    let value = item.match(/\d+/g)[0];
    obj.name = arr.shift();
    obj.children = [...arr];
    obj.value = parseInt(value);

    return obj;
  });

// Part 1
data.forEach(item => {
  let index = data.findIndex(el => {
    if (el.children.includes(item.name)) {
      return el;
    }
  });

  index === -1 ? (item.parent = 'none') : (item.parent = data[index].name);
});

let resultIndex = data.findIndex(el => el.parent === 'none');
console.log('Result Part 1: ', data[resultIndex]);

// Part 2
