const fs = require("fs");
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const instructions = data.filter(e => e.match(/^value \d+/))
const bots = data
    .filter(e => e.match(/^bot \d+/))
    .reduce((a,c) => {
        const nums = c.match(/\d+/g);
        a[`bot${nums[0]}`] = {
            name: `bot ${nums[0]}`,
            chips: [],
            low: `bot${nums[1]}`,
            high: `bot${nums[2]}`
        }
        return a;
    }, {})


const addToBot = (botname, value) => {
    bots[botname].chips.push(parseInt(value))
    bots[botname].chips.sort((a,b) => a - b);

    if (bots[botname].chips.length === 2) {
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