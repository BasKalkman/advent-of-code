const fs = require('fs');
// const data = fs.readFileSync('./input.txt', 'utf-8');
const data = fs.readFileSync('./example.txt', 'utf-8').split(/\r?\n/)
// const data = fs.readFileSync('./example2.txt', 'utf-8').split(/\r?\n/)
// const data = fs.readFileSync('./partialinput.txt', 'utf-8').split(/\r?\n/)


class Cube {
    constructor(state, x1, x2, y1, y2, z1, z2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.z1 = z1;
        this.z2 = z2;
        this.xlen = Math.abs(x2-x1) + 1
        this.ylen = Math.abs(y2-y1) + 1
        this.zlen = Math.abs(z2-z1) + 1
        this.volume = this.xlen * this.ylen * this.zlen;
        this.state = state;
        this.subcubes = []
    }

    checkIntersection(cube) {
        if (
            ((cube.x1 >= this.x1 && cube.x1 <= this.x2) || (cube.x2 >= this.x1 && cube.x2 <= this.x2)) 
            && ((cube.y1 >= this.y1 && cube.y1 <= this.y2) || (cube.y2 >= this.y1 && cube.y2 <= this.y2)) 
            && ((cube.z1 >= this.z1 && cube.z1 <= this.z2) || (cube.z2 >= this.z1 && cube.z2 <= this.z2)) 
        ) {
            // Naive test
            const newCube = this.getIntersectionVolume(cube);
            this.volume -= newCube.volume
            this.subcubes.push(newCube);
        }
    }

    getIntersectionVolume(cube) {
        // Check which edge of cube is within values of this for x,y,z
        const cubeX = cube.x1 >= this.x1 && cube.x1 <= this.x2 ? cube.x1 : cube.x2
        const cubeY = cube.y1 >= this.y1 && cube.y1 <= this.y2 ? cube.y1 : cube.y2
        const cubeZ = cube.z1 >= this.z1 && cube.z1 <= this.z2 ? cube.z1 : cube.z2

        // Check which direction to for diff for x,y,z
        // Find value of edge of cube to edge of this for x,y,z
        const thisX = cubeX > cube.x1 ? this.x1 : this.x2
        const thisY = cubeY > cube.y1 ? this.y1 : this.y2
        const thisZ = cubeZ > cube.z1 ? this.z1 : this.z2

        // generate subcube
        const [x1,x2] = [thisX, cubeX].sort((a,b) => a - b)
        const [y1,y2] = [thisY, cubeY].sort((a,b) => a - b)
        const [z1,z2] = [thisZ, cubeZ].sort((a,b) => a - b)
        const newCube = new Cube(cube.state, x1, x2, y1, y2, z1, z2)

        return newCube
    }

    getVolume() {
        return this.state === 'on' ? this.volume : 0;
    }
}

// List of cubes
const cubes = []
for (const e of data) {
    const [state, xstr, ystr, zstr] = e.split(/ |,/g)
    const [x1, x2] = xstr.match(/\d+/g).map(Number).sort((a,b) => a-b)
    const [y1, y2] = ystr.match(/\d+/g).map(Number).sort((a,b) => a-b)
    const [z1, z2] = zstr.match(/\d+/g).map(Number).sort((a,b) => a-b)
    const newCube = new Cube(state, x1, x2, y1, y2, z1, z2);

    for (const cube of cubes) {
        newCube.checkIntersection(cube);
    }

    cubes.push(newCube)
}
// const cubes = data.map(e => {
//     const [state, xstr, ystr, zstr] = e.split(/ |,/g)
//     const [x1, x2] = xstr.match(/\d+/g).map(Number).sort((a,b) => a-b)
//     const [y1, y2] = ystr.match(/\d+/g).map(Number).sort((a,b) => a-b)
//     const [z1, z2] = zstr.match(/\d+/g).map(Number).sort((a,b) => a-b)
//     return new Cube(state, x1,x2,y1,y2,z1,z2)
// })

console.log(cubes.reduce((a,c) => a + c.getVolume(), 0))

// for (const [idx, cube] of cubes.entries()) {
//     if (idx === cubes.length-1) {
//         break
//     }
//     for (let i = idx + 1; i < cubes.length; i++) {
//         cube.checkIntersection(cubes[i])
//     }
// }
console.log(cubes)