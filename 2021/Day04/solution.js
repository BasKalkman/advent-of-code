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
    const checkRow = board.filter((e,i) => {
      return (i + 5) % 5 === 0;
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
  let gameFinished = false;
  const calledNumbers = []
  
  while (!gameFinished) {
    calledNumbers.push(nums.shift())

    for (const board of boards) {
      let boardWins = checkBoard(board, calledNumbers);

      if (boardWins === true) {
        const score = boardScore(board, calledNumbers);
        console.log(`Part 1: ${score}`)
        gameFinished = true;
        return;
      }
    }
  }
}
runGame();