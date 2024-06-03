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
const keyboardElements = document.querySelectorAll('.key');
const messageElement = document.querySelector('#message');
const resetButtonElement = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];
    currentRowIndex = 0;
    gameOver = false;
    currentWord = words[getRandomNum()].toUpperCase();
    messageElement.textContent = '';
    console.log(`The word is '${currentWord}'`);

    resetElementClasses();
    resetButtonElement.blur();
    updateBoard();
}

const resetElementClasses = () => {
    squareElements.forEach((sqr) => {
        sqr.classList.remove("correct", "present", "absent", "spin");
    });

    keyboardElements.forEach((key) => {
        key.classList.remove("correct", "present", "absent");
    });
}

const updateBoard = () => {
    board.forEach((row, rowIndex) => {
        row.forEach((sqr, sqrIndex) => {
            let sqrElIdx = rowIndex * board[0].length + sqrIndex;
            squareElements[sqrElIdx].textContent = board[rowIndex][sqrIndex];
        });
    });
}


const handleInput = (event) => {
    // ignore input if game is over
    if (gameOver) return;
    // assign input to constant
    const input = convertEventToInput(event);
    // expression to match letters a-z or A-Z
    const letterRegex = /^[a-zA-Z]$/

    if (letterRegex.test(input)) {
        // if input is a letter, add it to the board
        for (let i = 0; i < board[0].length; i++) {
            // loop through row to find next available empty square
            if (board[currentRowIndex][i] === '') {
                board[currentRowIndex][i] = input;
                break;
            }
        }
    } else if (input === 'BACKSPACE' || input === 'BACK') {
        // if input is backspace, remove last entered character
        for (let i = 0; i < board[0].length; i++) {
            // loop through row to find the most recently filled square
            if (board[currentRowIndex][i + 1] === '') {
                board[currentRowIndex][i] = '';
                break;
            } else if (board[currentRowIndex].every(str => str !== '')) {
                board[currentRowIndex][4] = '';
                break;
            }
        }
    } else if (input === 'ENTER') {
        handleSubmit();
    }

    updateBoard();
}


const handleSubmit = () => {
    // if 5 letters and data contains board[currentRowIndex].join(' ')
        // checkAnswer
    if (board[currentRowIndex].every(str => str !== '')) {
        const answer = board[currentRowIndex].join('').toLowerCase();
        checkAnswer(answer);
    }
    // else if not 5 letters
        // shake row effect
        // "not enough letters"
}


const checkAnswer = (answer) => {
    if (words.includes(answer)) {
        renderRow();
        checkGameOver(answer);
        currentRowIndex += 1;
    } else {
        // Pop up "invalid answer"
        console.log("invalid answer")
    }
}


const checkGameOver = (answer) => {
    if (answer.toUpperCase() === currentWord) {
        messageElement.textContent = 'Congratulations! You guessed the word!'
        gameOver = true;
    } else if (currentRowIndex >= board.length - 1) {
        messageElement.textContent = `Game Over! The word was ${currentWord}`;
        gameOver = true;
    }
}


const convertEventToInput = (event) => {
    let input;
    if (event.type === 'click') {
        input = event.target.textContent.toUpperCase();
    } else {
        input = event.key.toUpperCase();
    }
    return input;
}

const getRandomNum = () => Math.floor(Math.random() * words.length)

const renderRow = () => {
    const currentRowElement = document.querySelector(`#row${currentRowIndex}`);
    const squares = currentRowElement.querySelectorAll('.sqr');
    const keys = document.querySelectorAll('.key');
    
    for (let i = 0; i < squares.length; i++) {
        const letter = squares[i].textContent;

        // Apply spinning effect ----------- come back to this -> want squares to spin one by one, not same time
        squares[i].classList.add("spin");

        // Determine which color to apply
        keys.forEach((key) => {
            if (key.textContent === letter) {
                if (letter === currentWord[i]) {
                    squares[i].classList.add("correct");
                    key.classList.add("correct");
                } else if (currentWord.includes(letter)) {
                    squares[i].classList.add("present");
                    key.classList.add("present");
                } else {
                    squares[i].classList.add("absent");
                    key.classList.add("absent");
                }
            }
            
        })
    }
}


/*----------------------------- Event Listeners -----------------------------*/

document.body.addEventListener('keydown', handleInput);

keyboardElements.forEach((element) => {
    element.addEventListener('click', handleInput);
});

resetButtonElement.addEventListener('click', init);


/*------------------------------ Call Functions -----------------------------*/

init();







/* ------------------------------ Graveyard ---------------------------------*/
/*

const handleClick = (event) => {
    console.log(event);
    const letterRegex = /^[A-Z]$/
    if (letterRegex.test(event.target.textContent)) {
        // if the key is a letter, add it to the board
        for (let i = 0; i < board[0].length; i++) {
            // loop through row to find next available empty square
            if (board[currentRowIndex][i] === '') {
                board[currentRowIndex][i] = event.target.textContent;
                break;
            }
        }
    } else if (event.target.textContent === 'Back') {
        // if the key is backspace, remove last entered character
        for (let i = 0; i < board[0].length; i++) {
            // loop through row to find the most recently filled square
            if (board[currentRowIndex][i + 1] === '') {
                board[currentRowIndex][i] = '';
                break;
            } else if (board[currentRowIndex].every(str => str !== '')) {
                board[currentRowIndex][4] = '';
                break;
            }
        }
    }

    updateBoard();
}

*/