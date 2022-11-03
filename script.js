const RED_CLASS = 'redCircle'
const YELLOW_CLASS = 'yellowCircle'
const WINNING_COMBINATIONS = [
    [0,1,2,3],
    [1,2,3,4],
    [5,6,7,8],
    [6,7,8,9],
    [10,11,12,13],
    [11,12,13,14],
    [15,16,17,18],
    [16,17,18,19],
    [0,5,10,15],
    [1,6,11,16],
    [2,7,12,17],
    [3,8,13,18],
    [4,9,14,19],
    [0,6,12,18],
    [1,7,13,19],
    [4,8,12,16],
    [3,7,11,15]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let yellowTurn

startGame()

restartButton.addEventListener('click', startGame())

// Starts the game
function startGame() {
    yellowTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(RED_CLASS)
        cell.classList.remove(YELLOW_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

// Places the circle in the clicked cell and checks if the player won, drew or if it's the other players turn
function handleClick(e) {
    const cell = e.target
    const currentClass = yellowTurn ? YELLOW_CLASS : RED_CLASS
    placeCircle(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

// Places the circle on the selected cell
function placeCircle(cell, currentClass) {
    cell.classList.add(currentClass)
}

// Checks if the player has completed a winning combination
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

//Shows the correct message according to the result of the game
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${yellowTurn ? "Yellow" : "Red"} wins the game!`
    }
    winningMessageElement.classList.add('show')
}

// Checks if the game is a draw
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(RED_CLASS) || cell.classList.contains(YELLOW_CLASS)
    })
}

// Swaps the players turns
function swapTurns() {
    yellowTurn = !yellowTurn
}

// Sets the correct hover class
function setBoardHoverClass() {
    board.classList.remove(RED_CLASS)
    board.classList.remove(YELLOW_CLASS)
    if (yellowTurn) {
        board.classList.add(YELLOW_CLASS)
    } else {
        board.classList.add(RED_CLASS)
    }
}