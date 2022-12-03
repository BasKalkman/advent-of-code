const fs = require("fs");
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const instructions = data.filter(e => e.match(/^value \d+/))
const bots = data
    .filter(e => e.match(/^bot|output \d+/))
    .reduce((a,c) => {
        const nums = c.match(/(bot|output) \d+/g).map(e => e.replace(' ', ''));
        a[nums[0]] = {
            name: nums[0],
            chips: [],
            low: nums[1],
            high: nums[2],
        }
        return a;
    }, {})


const addToBot = (botname, value) => {
    if (!bots[botname]) {
        bots[botname] = {
            name: botname,
            chips: [],
            low: null,
            high: null,
        }
    }
    bots[botname].chips.push(parseInt(value))
    bots[botname].chips.sort((a,b) => a - b);

    if (bots[botname].chips.length === 2 && !botname.match(/output/)) {
        if (bots[botname].chips[0] === 17 && bots[botname].chips[1] === 61) {
            console.log(bots[botname].name);
        }

        const [low, high] = bots[botname].chips
        bots[botname].chips = [];

        addToBot(bots[botname].low, low)
        addToBot(bots[botname].high, high)
    }
    
}    

for (const i of instructions) {
    const nums = i.match(/\d+/g);
    const botname = `bot${nums[1]}`
    addToBot(botname, nums[0])
}

const outputs = ['output0', 'output1', 'output2']
const part2 = Object.values(bots).reduce((a,c) => { 
    if (outputs.includes(c.name)) console.log(c.chips);
    if (outputs.includes(c.name)) {
        return a * c.chips[0]
    }
    return a;
}, 1)
console.log(part2);