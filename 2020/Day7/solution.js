const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n')

const bagRules = {}

for (let i = 0; i < data.length; i++) {
    let [bag1, ...bags] = data[i].split('contain');
    bag1 = bag1.replace(/[0-9.]|\sbags?.?[^a-zA-Z]/g, '')

    let contains = bags[0].split(',').map(e => {
        if (e.match(/no other bags/)) {
            return null
        } else {
            return {
                num: parseInt(e.match(/\d+/)),
                type: e.replace(/[0-9.]/g, '').replace(/bags?/g,'').trim()
            }
        }

    })



    bagRules[bag1] = contains[0] === null ? null : contains
}




function checkContains(rule, target) {
    if (bagRules[rule] === null) {
        return false
    }

    let typesInside = bagRules[rule].map(e => {
        return e.type
    })

    if (typesInside.includes(target)) {
        return true
    } else {
        let isAllowed = typesInside.filter(e => {
            return checkContains(e, target)
        })

        return isAllowed.length > 0 ? true : false
    }
}

let part1 = Object.keys(bagRules).filter(e => {
    return checkContains(e, 'shiny gold')
})
console.log('Part 1: ', part1.length);


// Part 2:
function checkNumber(type) {
    if (bagRules[type] === null) {
        return 0
    } 
    
    let count = 0
    for (bag of bagRules[type]) {
        count += bag.num
        count += bag.num * checkNumber(bag.type)
    }

    return count

}

console.log('Part 2: ', checkNumber('shiny gold'))
