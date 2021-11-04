// function combineArray(chars) {
//     var result = [];
//     var f = function (prefix, chars) {
//         for (var i = 0; i < chars.length; i++) {
//             result.push(prefix + chars[i]);
//             f(prefix + chars[i], chars.slice(i + 1));
//         }
//     }
//     f('', chars);
//     return result;
// }

function combineArray(array) {
    var result = [];
    var f = function (prefix = [], array) {
        for (var i = 0; i < array.length; i++) {
            result.push([...prefix, array[i]]);
            f([...prefix, array[i]], array.slice(i + 1));
        }
    }
    f('', array);
    return result;
}

module.exports = {
    combineArray
}