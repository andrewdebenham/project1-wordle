/*----------------------------------- Data ----------------------------------*/
// In a separate game-data.js file store the 5-letter words to be cycled through in the game

/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
// Define the required variables used to track the state of the game
// track the state of the board
// track which row / level player is on
// winner / gameOver

let board;
let currentRowIndex;
let gameOver;
let currentWord;

/*------------------------ Cached Element References ------------------------*/
// Store cached element references
// boardElement
// squareElements
// rowElements
// messageElement
// resetButtonElement

const squareElements = document.querySelectorAll('.sqr');
console.log(squareElements);

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ]
    currentRowIndex = 0;
    gameOver = false;
    render();
}

const render = () => {
    updateBoard();
}

const updateBoard = () => {
    board.forEach((row, rowIndex) => {
        row.forEach((sqr, sqrIndex) => {
            let sqrElIdx = rowIndex * board[0].length + sqrIndex;
            squareElements[sqrElIdx].textContent = board[rowIndex][sqrIndex];
        });
    });
}

// handleClick()
// Handle a player clicking the keyboard

// handleInput()
// handle a player using their keyboard to input letters
// potentially combine this into one function with handleClick

const handleInput = (event) => {
    // expression to match letters a-z or A-Z
    const letterRegex = /^[a-zA-Z]$/

    if (letterRegex.test(event.key)) {
        // if the key is a letter, add it to the board
        for (let i = 0; i < board[0].length; i++) {
            if (board[currentRowIndex][i] === '') {
                board[currentRowIndex][i] = event.key.toUpperCase();
                break;
            }
        }
    } else if (event.key === 'Backspace') {
        // if the key is backspace, remove last entered character
        for (let i = 0; i < board[0].length; i++) {
            if (board[currentRowIndex][i + 1] === '') {
                board[currentRowIndex][i] = '';
                break;
            } else if (board[currentRowIndex].every(str => str !== '')) {
                board[currentRowIndex][4] = '';
                break;
            }
        }
    }

    // else if (event.key === 'Enter')
    updateBoard();
}


// checkGuess()
// create a function to reveal the correct / incorrect / almost letters for the concurrent guess
// this can only happen once the player has submit their guess by either clicking or hitting the enter key
// player should not be able to submit a guess if it is not a word included in our game data

// reset()
// create some form of reset / new game functionality

/*----------------------------- Event Listeners -----------------------------*/
// add an event listener to each row / square
// event listener should listen for input via either the on-screen keyboard or users keyboard
// user inputs one letter at a time, beggining at the first box of the current row

document.body.addEventListener('keydown', handleInput);


/*------------------------------ Call Functions -----------------------------*/

init();







/* Graveyard



*/