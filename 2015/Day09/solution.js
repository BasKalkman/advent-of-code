const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

function permute(array) {
    Array.prototype.swap = function (index, otherIndex) {
        var valueAtIndex = this[index]

        this[index] = this[otherIndex]
        this[otherIndex] = valueAtIndex
    }

    var result = [array.slice()]

        , length = array.length

    for (var i = 1, heap = new Array(length).fill(0)
        ; i < length
        ;)
        if (heap[i] < i) {
            array.swap(i, i % 2 && heap[i])
            result.push(array.slice())
            heap[i]++
            i = 1
        } else {
            heap[i] = 0
            i++
        }

    return result
}

const dists = {}

for (const line of data) {
    const [p1, p2, dist] = line.split(/to|=/g).map(e => e.trim())
    if (!dists[p1]) { dists[p1] = {} }
    if (!dists[p2]) { dists[p2] = {} }

    dists[p1][p2] = parseInt(dist)
    dists[p2][p1] = parseInt(dist);
}

const places = Object.keys(dists)
const PlacesPermutations = permute(places)
const result = PlacesPermutations.map(e => {
    let totalDistance = 0
    for (let i = 0; i < e.length - 1; i++) {
        let p1 = e[i];
        let p2 = e[i + 1];
        totalDistance += dists[p1][p2]
    }
    return totalDistance
})
console.log(Math.min(...result))
console.log(Math.max(...result))

