const fs = require('fs')
// const data = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/);
const data = fs.readFileSync('./example.txt', 'utf-8').split(/\r?\n/);
const { Graph } = require('./dijkstra')
const [maxY, maxX] = [data.length - 1, data[0].length - 1]

const nodes = {}
data.map((e, y) => {
    e.split('').map((el, x) => {
        nodes[`${y}x${x}`] = parseInt(el);
    })
})

const map = {}
Object.keys(nodes).map(e => {
    const [y, x] = e.split('x').map(Number)
    const diffs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    const node = {}
    for (const diff of diffs) {
        const [dy, dx] = diff;
        if (nodes[`${y + dy}x${x + dx}`]) {
            node[`${y + dy}x${x + dx}`] = nodes[`${y + dy}x${x + dx}`]
        }
    }
    map[`${y}x${x}`] = node;
})

const p1 = new Graph(map)
const shortest = p1.findShortestPath('0x0', `${maxY}x${maxX}`);
console.log(p1.findShortestPath('0x0', `${maxY}x${maxX}`))
const part1 = shortest.reduce((a, c) => c !== '0x0' ? a + nodes[c] : a, 0)
console.log(part1);

// Part 2
