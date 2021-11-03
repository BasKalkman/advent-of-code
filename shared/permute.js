function permuteArray(array) {
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

module.exports = {
    permuteArray
}