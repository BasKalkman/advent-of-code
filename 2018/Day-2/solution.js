const fs = require('fs');

// PART ONE
fs.readFile('./input.txt', 'utf8', (err, data) => {
  const arr = data.split('\r\n');

  // Check each entry in the array for letters that occur only 2 or 3 times
  // Count into object
  let checkedArray = arr.map(str => {
    let obj = {};
    str.split('').forEach(letter => {
      if (!obj[letter]) {
        obj[letter] = 0;
      }
      obj[letter]++;
    });
    return obj;
  });

  // Push entries with at least once exactly 2 letters into array twos
  // Entries with at least once exactly 3 letters into threes
  let two = [];
  let three = [];

  checkedArray.forEach(obj => {
    let temp = Object.values(obj);

    if (temp.includes(2)) {
      two.push(obj);
    }
    if (temp.includes(3)) {
      three.push(obj);
    }
  });

  // Multiply array lengths
  let result = two.length * three.length;

  // Log result
  console.log(result);
});

// PART TWO
fs.readFile('./input.txt', 'utf8', (err, data2) => {
  var arr2 = data2.split('\r\n');

  arr2.forEach(item => {
    let positionDiff = 0;

    arr2.forEach(check => {
      let countDiff = 0;
      for (let i = 0; i < item.length; i++) {
        if (item[i] !== check[i]) {
          positionDiff = i;
          countDiff++;
        }
      }
      if (countDiff === 1) {
        let result = item.split('');
        result.splice(positionDiff, 1);
        console.log('item: ', result.join(''));
      }
    });
  });
});
