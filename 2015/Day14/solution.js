const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

class Reindeer {
    constructor(name, speed, travelTime, restTime) {
        this.name = name;
        this.speed = speed;
        this.travelTime = travelTime;
        this.restTime = restTime;
        this.seconds = 0;
        this.distance = 0;
        this.moduloTime = this.travelTime + this.restTime;
        this.points = 0;
    }

    travel() {
        if (this.seconds % this.moduloTime < this.travelTime) {
            this.distance += this.speed;
        }

        this.seconds++;
    }

    winRound() {
        this.points++;
    }

    returnDistance() {
        return this.distance;
    }

    returnPoints() {
        return this.points;
    }
}

const allReindeer = []
for (const line of data) {
    const [name] = line.match(/^\w+/g)
    const [speed, travelTime, restTime] = line.match(/\d+/g).map(Number);
    allReindeer.push(new Reindeer(name, speed, travelTime, restTime))
}

for (let i = 0; i < 2503; i++) {
    for (const reindeer of allReindeer) {
        reindeer.travel();
    }

    // Part 2
    const furthestDistance = allReindeer.reduce((a, c) => {
        return c.returnDistance() > a ? c.returnDistance() : a
    }, 0)
    for (const reindeer of allReindeer) {
        if (reindeer.returnDistance() === furthestDistance) {
            reindeer.winRound();
        }
    }
}

// Part 1
const distances = allReindeer.map(e => e.returnDistance())
console.log('Part 1: ', Math.max(...distances));
// Part 2
const points = allReindeer.map(e => e.returnPoints());
console.log('Part 2: ', Math.max(...points));