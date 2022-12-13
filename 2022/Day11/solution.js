const fs = require('fs');
const data = fs.readFileSync('./test.txt', 'utf-8').split('\n\n')
// const data = fs.readFileSync('./input.txt', 'utf-8').split('\n\n')

class Monkey {
    constructor(monkey) {
        this.name = monkey.match(/Monkey \d+/g)[0]
        this.items = monkey.match(/Starting items: (.+)/g)[0].match(/\d+/g).map(Number);
        this.op = monkey.match(/Operation: new = (.+)/)[1]
        this.test = parseInt(monkey.match(/Test: .+ (\d+)/)[1]);
        this.trueMonkey = parseInt(monkey.match(/If true: .+ (\d+)/)[1])
        this.falseMonkey = parseInt(monkey.match(/If false: .+ (\d+)/)[1])
        this.inspectionCount = 0;
    }

    inspect() {
        this.inspectionCount++;
        let object = this.items.shift();
        object = this.testObject(object);
        object = Math.floor(object / 3);
        

        
        if (object % this.test === 0) {
            monkeys[this.trueMonkey].grab(object);
        } else {
            monkeys[this.falseMonkey].grab(object);
        }
    }

    testObject(object) {
        let op = this.op.replace(/old/g, object);
        let value = eval(op);
        return value;
        let result = value % this.test === 0;
        return result;
    }

    grab(object) {
        this.items.push(object);
    }

    runTurn() {
        while (this.items.length > 0) {
            this.inspect();
        }
    }
}



const monkeys = data.map(e => new Monkey(e))

for (let i = 0; i < 20; i++) {
    monkeys.map(e => e.runTurn())
}
const inspectionCounts = monkeys.map(e => e.inspectionCount).sort((a,b) => a - b)
console.log(inspectionCounts[0] * inspectionCounts[1]);