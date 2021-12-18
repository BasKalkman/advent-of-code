const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf-8')
// const data = fs.readFileSync('./example.txt', 'utf-8')
const binString = data.split('')
  .map(e => {
    let num = parseInt(e, 16)
    return num.toString(2).padStart(4, '0')
  }).join('')


  const parsePackets = (str) => {
  const packets = [];
  let current = 0;
  while (str[current+1]) {
    const version = parseInt(str.slice(current, current + 3), 2);
    current += 3;
  
    const type = parseInt(str.slice(current, current + 3), 2)
    current += 3;

    // Literal packet
    if (type === 4) {
      let value = '';
      let endpacket = false;
      while (endpacket === false) {
        let tmp = str.slice(current, current + 5)
        if (tmp[0] === '0') endpacket = true;
        current += 5
        value += tmp.slice(1);
      }
      packets.push({version: version, type: type, value: value})
    } else {
      // Otherwise operator packet
      const lengthType = parseInt(str.slice(current, current+1), 2);
      current += 1
      if (lengthType === 0) {
        const lengthValue = parseInt(str.slice(current, current+15), 2)
        current += 15;
        packets.push({version: version, type: type, lengthType: lengthType, lengthValue: lengthValue})
      } else {
        const lengthValue = parseInt(str.slice(current, current+11), 2)
        current += 11;
        packets.push({version: version, type: type, lengthType: lengthType, lengthValue: lengthValue})
      }
    }




  }
  return packets
}
const packets = parsePackets(binString)
const versionSum = packets.reduce((a,c) => a + c.version,0)
console.log(versionSum);