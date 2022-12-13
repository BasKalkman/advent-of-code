const fs = require('fs');
// const data = fs.readFileSync('./test.txt', 'utf-8').split('\n\n');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n\n');

class Monkey {
    constructor(monkey) {
        this.name = monkey.match(/Monkey \d+/g)[0];
        this.items = monkey
            .match(/Starting items: (.+)/g)[0]
            .match(/\d+/g)
            .map(Number);
        this.op = monkey.match(/Operation: new = (.+)/)[1];
        this.test = parseInt(monkey.match(/Test: .+ (\d+)/)[1]);
        this.trueMonkey = parseInt(monkey.match(/If true: .+ (\d+)/)[1]);
        this.falseMonkey = parseInt(monkey.match(/If false: .+ (\d+)/)[1]);
        this.inspectionCount = 0;
    }

    inspect() {
        this.inspectionCount++;
        let object = this.items.shift();
        object = this.testObject(object);
        // object = Math.floor(object / 3); // Part 1
        object = object % supermod; // Part 2

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

const monkeys = data.map((e) => new Monkey(e));
const supermod = monkeys.reduce((a, c) => a * c.test, 1); // Part 2

for (let i = 0; i < 10000; i++) {
    monkeys.map((e) => e.runTurn());
}
const inspectionCounts = monkeys.map((e) => e.inspectionCount).sort((a, b) => b - a);
console.log(inspectionCounts);
console.log(inspectionCounts[0] * inspectionCounts[1]);
