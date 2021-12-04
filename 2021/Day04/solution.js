const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8');
// const data = fs.readFileSync('./test.txt', 'utf-8');

const [numbers, ...boardsList] = data.split('\n\n')
const nums = numbers.split(',');

// Create bingo boards
const createBoard = (str) => {
  str = str.replace(/\n/g, ' ');
  return str.trim().split(/\W+/);
}

const boards = boardsList.map(e => createBoard(e))

// Check for BINGO fn
const checkBoard = (board, calledNumbers) => {
  for (let i = 0; i < 5; i++) {
    // Col
    const checkCol = board.slice(i*5, (i*5)+5)

    // Row
    const checkRow = board.filter((e,idx) => {
      return (idx + 5) % 5 === i;
    })

    // Compare to called numbers
    const colCalled = checkCol.map(e => calledNumbers.includes(e))
    const rowCalled = checkRow.map(e => calledNumbers.includes(e))

    // If col or row does not include false, row or col is complete
    let boardWins = false
    if (!colCalled.includes(false)) {boardWins=true}
    if (!rowCalled.includes(false)) {boardWins=true}

    if (boardWins === true) {return true}
  }
  return false;
}

// Calculate board score
const boardScore = (board, calledNumbers) => {
  const unmarkedNumbers = board.filter(e => !calledNumbers.includes(e)).map(Number)
  const sumOfUnmarkedNumbers = unmarkedNumbers.reduce((a,c) => {return a + c}, 0)
  const lastCalled = calledNumbers[calledNumbers.length - 1]

  return sumOfUnmarkedNumbers * parseInt(lastCalled);
}


// Run game
const runGame = () => {
  const calledNumbers = []
  const scores = []

  while (scores.length < boards.length) {
    calledNumbers.push(nums.shift())

    for (let i=0; i < boards.length; i++) {
      const board = boards[i]
      if (board !== null) {
        let boardWins = checkBoard(board, calledNumbers);
  
        if (boardWins === true) {
          const score = boardScore(board, calledNumbers);
          scores.push(score);
          boards[i] = null;
        }
      }
    }
  }
  return scores;
}

const finalScores = runGame();

console.log(`Part 1: ${finalScores[0]}`)
console.log(`Part 2: ${finalScores[finalScores.length-1]}`)