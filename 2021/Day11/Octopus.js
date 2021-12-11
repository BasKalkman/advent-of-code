class Octopus {
  constructor(startingEnergy, yPos, xPos) {
    this.energy = startingEnergy;
    this.y = yPos
    this.x = xPos
    this.hasFlashed = false
  }

  newStep() {
    this.hasFlashed = false;
    this.energy++

    if (this.energy > 9) {
      return this.emitFlash();
    }

    return false;
  }

  emitFlash() {
    this.energy = 0
    this.hasFlashed = true;
    return {x: this.x, y: this.y}
  }

  receiveFlash(x,y) {
    if (this.x >= x-1 && this.x <= x+1 && this.y >= y-1 && this.y <= y+1) {
        if (!this.hasFlashed) {
          this.energy++
          if (this.energy > 9) {
            return this.emitFlash()
          }
        }
      }
    return false;
  }
}

module.exports = Octopus