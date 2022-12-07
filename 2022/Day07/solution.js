const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n');

class Files {
    constructor() {
        this.path = ['root'];
        this.dirs = {
            root: {},
        };
    }

    cd(name) {
        if (name === '/') {
            this.path = ['root'];
        } else if (name === '..') {
            this.path.pop();
        } else {
            this.path.push(name);
        }
    }

    ls() {
        return this.dirs[this.pwd()];
    }

    pwd() {
        return this.path.join('/');
    }

    mkdir(name) {
        if (!Object.hasOwn(this.dirs[this.pwd()], name)) {
            this.dirs[this.pwd()][name] = `${this.pwd()}/${name}`;
            this.dirs[this.pwd() + `/${name}`] = {};
        }
    }

    touch(size, name) {
        if (!Object.hasOwn(this.dirs[this.pwd()], name)) {
            this.dirs[this.pwd()][name] = parseInt(size);
        }
    }

    getDirSize(name) {
        const result = Object.entries(this.dirs[name]).reduce((a, c) => {
            const current = this.dirs[name][c[0]];
            typeof current === 'number' ? (a += current) : (a += this.getDirSize(current));
            return a;
        }, 0);
        return result;
    }

    getDirs() {
        return Object.keys(this.dirs);
    }

    getDirSizeList() {
        const dirs = this.getDirs();
        const dirSizeList = dirs
            .map((e) => {
                return [e, this.getDirSize(e)];
            })
            .sort((a, b) => a[1] - b[1]);
        return dirSizeList;
    }
}

const system = new Files();

for (const line of data) {
    if (line.match(/\$ cd/g)) {
        system.cd(line.split(' ')[2]);
    } else if (line.match(/dir .+/g)) {
        system.mkdir(line.split(' ')[1]);
    } else if (line.match(/\d+ .+/g)) {
        const [size, name] = line.split(' ');
        system.touch(size, name);
    }
}

const part1 = system
    .getDirs()
    .map((e) => system.getDirSize(e))
    .filter((e) => e <= 100000)
    .reduce((a, c) => a + c, 0);

console.log(`Part 1: ${part1}`);

// Part 2
const TOTAL_SPACE = 70000000;
const NEEDED_SPACE = 30000000;
const USED_SPACE = system.getDirSize('root');
const AVAILABLE_SPACE = TOTAL_SPACE - USED_SPACE;
const NEEDED_TO_REMOVE = Math.abs(AVAILABLE_SPACE - NEEDED_SPACE);

const part2 = system.getDirSizeList().filter((e) => e[1] >= NEEDED_TO_REMOVE);
console.log(`Part 2: ${part2[0][1]}`);
