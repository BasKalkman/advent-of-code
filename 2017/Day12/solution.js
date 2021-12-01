const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map(item => {
    let arr = item
      .replace('<->', ',')
      .split(',')
      .map(item => item.trim());

    let obj = {};
    obj.name = arr.splice(0, 1)[0];
    obj.children = [...arr];

    return obj;
  });

let result = [];

data[0].children.forEach(child => {
  writeChild(child);
});

function writeChild(nameChild) {
  result.push(nameChild);
  let index = data.findIndex(obj => obj.name === nameChild);

  for (let i = 0; i < data[index].children.length; i++) {
    let checkRepeatIndex = result.indexOf(data[index].children[i]);
    if (checkRepeatIndex === -1) {
      writeChild(data[index].children[i]);
    }
  }
}

console.log(result.length - 1); // Because it writes 0 to array as well;

// Part 2
