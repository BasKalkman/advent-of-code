// Player 1 starting position: 8
// Player 2 starting position: 5

function* diceGen() {
  counter = 0;
  while (true) {
    counter++
    if (counter > 100) {
      counter = 1
    }
    yield counter;
  }
}

class Player {
  constructor(startingPosition) {
    this.position = startingPosition
    this.score = 0
  }
}

const player1 = new Player(8)
const player2 = new Player(5)
const dice = diceGen();
let rolls = 0;

while (player1.score < 1000 && player2.score < 1000) {
  for (let i = 0; i < 3; i++) {
    player1.position += dice.next().value
    rolls++
    while (player1.position > 10) {
      player1.position -= 10;
    }
  }
  player1.score += player1.position;

  if (player1.score >= 1000) break;

  for (let i = 0; i < 3; i++) {
    player2.position += dice.next().value
    rolls++
    while (player2.position > 10) {
      player2.position -= 10;
    }
  }
  player2.score += player2.position
}

console.log(player1, player2, rolls)
const losingPlayer = player1.score > player2.score ? player2 : player1
console.log(`Part 1: ${losingPlayer.score * rolls}`)