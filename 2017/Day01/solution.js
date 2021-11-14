const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' });

let result = 0;
for (let i = 0; i < data.length; i++) {
  let num = Number(data[i]);
  //PART 1
  // let next = Number(data[i + 1]);
  // if (i + 1 === data.length) {
  //   next = Number(data[0]);
  // }
  //PART 2
  let next = Number(data[i + data.length / 2]);
  if (i + data.length / 2 >= data.length) {
    let num = i + data.length / 2 - data.length;
    next = Number(data[num]);
  }

  if (num === next) {
    result += num;
  }
}

console.log(result);
