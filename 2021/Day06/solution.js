const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split(',').map(Number)

const school = new Array(Math.max(...data)+1).fill(0);
data.map((e) => {
  school[e]++
})

for(let i = 0; i < 256; i++) {
  if (i === 80) {
    console.log(`Part 1: ${school.reduce((a,c) => a+c, 0)}`)
  }
  
  
  const tempSchool = new Array(9).fill(0)
  school.map((e,idx) => {
    if (idx-1 < 0) {
      tempSchool[6] += e;
      tempSchool[8] += e;
    } else {
      tempSchool[idx-1] += e;
    }
  })

  school.length = 0;
  school.push(...tempSchool)
}
console.log(`Part 2: ${school.reduce((a,c) => a+c, 0)}`)