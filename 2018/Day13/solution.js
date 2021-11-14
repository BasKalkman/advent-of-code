const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

/// Cart class
class Cart {
    constructor(x, y, dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.turnCount = 0;
        this.alive = true;
    }

    move() {
        if (this.alive === true) {
            if (this.dir === '^') {
                this.y--;
            }
            if (this.dir === 'v') {
                this.y++;
            }
            if (this.dir === '<') {
                this.x--;
            }
            if (this.dir === '>') {
                this.x++;
            }
            this.checkCurve();
            this.turnAtIntersection();
        }
    }

    checkCurve() {
        let trackComponent = data[this.y][this.x];
        if (trackComponent === '/') {
            if (this.dir === 'v' || this.dir === '^') {
                this.turnRight();
            } else if (this.dir === '<' || this.dir === '>') {
                this.turnLeft();
            }
        }
        if (trackComponent === '\\') {
            if (this.dir === 'v' || this.dir === '^') {
                this.turnLeft();
            } else if (this.dir === '<' || this.dir === '>') {
                this.turnRight();
            }
        }
    }

    turnAtIntersection() {
        if (data[this.y][this.x] === '+') {
            let turnOrder = ['left', 'straight', 'right'];
            let turnTo = turnOrder[this.turnCount % turnOrder.length];

            switch (turnTo) {
                case 'left':
                    this.turnLeft();
                    break;
                case 'right':
                    this.turnRight();
                    break;
            }

            this.turnCount++;
        }
    }

    turnRight() {
        switch (this.dir) {
            case 'v':
                this.dir = '<';
                break;
            case '^':
                this.dir = '>';
                break;
            case '<':
                this.dir = '^';
                break;
            case '>':
                this.dir = 'v';
                break;
        }
    }

    turnLeft() {
        switch (this.dir) {
            case 'v':
                this.dir = '>';
                break;
            case '^':
                this.dir = '<';
                break;
            case '<':
                this.dir = 'v';
                break;
            case '>':
                this.dir = '^';
                break;
        }
    }

    coordString() {
        return `${this.x},${this.y}`;
    }
}

// Init all carts
let carts = [];

data.forEach((line, yPos) => {
    for (let xPos = 0; xPos < line.length; xPos++) {
        if (line[xPos].match(/[\^\<\>v]/)) {
            let newCart = new Cart(xPos, yPos, line[xPos]);
            carts.push(newCart);
        }
    }
});

// Run ticks, sort carts each tick, check for collisions as they occur
let collision = false;
let numCartsAlive = carts.length;

// PART 1:
// while (collision === false) {
// PART 2:
while (numCartsAlive > 1) {
    // Sort carts for right order this tick.
    carts.sort((a, b) => {
        if (a.y > b.y) {
            return 1;
        } else if (a.y < b.y) {
            return -1;
        } else {
            return a.x - b.x;
        }
    });

    // Move the carts
    carts.forEach((e, i) => {
        e.move();

        // Check for collisions
        let checkCollisions = carts.map(e => e.coordString());
        if (checkCollisions.length !== new Set(checkCollisions).size) {
            collision = true;
            // console.log(carts[i].coordString());

            // Set carts to dead if collided
            let x = carts[i].x;
            let y = carts[i].y;

            carts.forEach(cart => {
                if (cart.x === x && cart.y === y) {
                    cart.alive = false;
                }
            });

            // return true;

            carts = carts.filter(cart => cart.alive === true);
        }

        numCartsAlive = carts.length;

        if (numCartsAlive === 1) {
            theLastCart = carts.filter(cart => cart.alive === true);
            console.log(theLastCart);
        }
    });
}
