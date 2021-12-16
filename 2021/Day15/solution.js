const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/);
// const data = fs.readFileSync('./example.txt', 'utf-8').split(/\r?\n/);
const { Graph } = require('./dijkstra')
const [maxY, maxX] = [data.length - 1, data[0].length - 1]

const nodes = {}
data.map((e, y) => {
    e.split('').map((el, x) => {
        nodes[`${y}x${x}`] = parseInt(el);
    })
})

const nodes2 = {}
for (let y = 0; y < (maxY+1) * 5; y++) {
    for (let x = 0; x < (maxX+1) * 5; x++) {
        let value = parseInt(data[y%(maxY+1)][x%(maxX+1)])
        nodes2[`${y}x${x}`] = value;
    }
}
for (const node in nodes2) {
    const [x,y] = node.split('x').map(Number)
    let multiplierY = Math.floor(y / (maxY+1))
    let multiplierX = Math.floor(x / (maxX+1))
    let multiplier = multiplierX + multiplierY
    let value = nodes2[node];
    value = value + multiplier
    while (value > 9) {
        value = value - 9;
    }
    nodes2[node] = value;
}

const makeMap = (nodes) => {
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
    return map;
}
const map = makeMap(nodes);

const p1 = new Graph(map)
const shortest = p1.findShortestPath('0x0', `${maxY}x${maxX}`);
const part1 = shortest.reduce((a, c) => c !== '0x0' ? a + nodes[c] : a, 0)
console.log(part1);

// Part 2
const map2 = makeMap(nodes2);
const p2 = new Graph(map2);
const shortestp2 = p2.findShortestPath('0x0', `${(maxY+1) * 5 -1}x${(maxX+1)*5-1}`)
shortestp2.shift();
const part2 = shortestp2.reduce((a,c) => a + nodes2[c], 0);
console.log(part2);