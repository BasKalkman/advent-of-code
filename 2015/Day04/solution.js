const {createHash} = require('crypto');
const input = 'ckczppom';
let result = null;
let resultP2 = null;
let i = 0

while (resultP2 === null) {
  let newstr = `${input}${i}`

  let hash = createHash('md5').update(newstr).digest('hex')

  if (hash.substr(0,5) === '00000' && result === null) {
    result = i
  }
  if (hash.substr(0,6) === '000000') {
    resultP2 = i
  }
  i++
}
console.log('Part 1: ', result)
console.log('Part 2: ', resultP2)