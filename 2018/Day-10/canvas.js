let data = fetch('./input.txt')
  .then(response => response.text())
  .then(data => {
    let tmp = data.split('\r\n').map(line => {
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
    return tmp;
  })
  .then(data => {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    let time = 10036;
    data.forEach(el => {
      ctx.fillRect(el.x + time * el.vX, el.y + time * el.vY, 2, 2);
    });
  });

// Canvas
