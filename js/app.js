/*---------------------------- Variables (state) ----------------------------*/

let board;
let currentRowIndex;
let gameOver;
let currentWord;
let winStreak = 0;

/*------------------------ Cached Element References ------------------------*/

const squareElements = document.querySelectorAll('.sqr');
const keyboardElements = document.querySelectorAll('.key');
const messageElement = document.querySelector('#message');
const resetButtonElement = document.querySelector('#reset');
const playButtonElement = document.querySelector('.play-button');
const instructionsElement = document.querySelector('.instructions');
const helpButtonElement = document.querySelector('.help');
const winStreakElement = document.querySelector('.win-streak');

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    // reset the game state
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
    resetButtonElement.style.display = "none";
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
            // loop through each square of each row of the board element and update text according to the board array
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
    // if 5 letters submitted -> check answer for validity
    if (board[currentRowIndex].every(str => str !== '')) {
        const answer = board[currentRowIndex].join('').toLowerCase();
        checkAnswer(answer);
    } else {
        messageElement.textContent = 'Not enough letters';
        shakeEffect();
    }
}


const checkAnswer = (answer) => {
    // if valid answer -> render the row accordingly and check for win
    if (words.includes(answer)) {
        messageElement.textContent = '';
        renderRow();
        checkGameOver(answer);
        currentRowIndex += 1;
    } else {
        messageElement.textContent = 'Not in word list';
        shakeEffect();
    }
}


const checkGameOver = (answer) => {
    // Check for game over conditions and deliver appropriate message
    if (answer.toUpperCase() === currentWord) {
        messageElement.textContent = 'Congratulations! You win!'
        gameOver = true;
        winStreak += 1;
        winStreakElement.textContent = `Win Streak: ${winStreak}`;
        resetButtonElement.style.display = "block";
    } else if (currentRowIndex >= board.length - 1) {
        messageElement.textContent = `Game Over! The word was ${currentWord}`;
        gameOver = true;
        winStreak = 0;
        winStreakElement.textContent = `Win Streak: ${winStreak}`;
        resetButtonElement.style.display = "block";
    }
}


const convertEventToInput = (event) => {
    // standardise the input based on the event type
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

        // Apply spin animation
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


const shakeEffect = () => {
    const currentRowElement = document.querySelector(`#row${currentRowIndex}`);
    currentRowElement.classList.add("shake");

    setTimeout(() => {
        currentRowElement.classList.remove("shake");
    }, 500);
}


/*----------------------------- Event Listeners -----------------------------*/

document.body.addEventListener('keydown', handleInput);
resetButtonElement.addEventListener('click', init);

keyboardElements.forEach((element) => {
    element.addEventListener('click', handleInput);
});

playButtonElement.addEventListener('click', () => {
    instructionsElement.classList.remove('animate__bounceInDown');
    instructionsElement.classList.add('animate__bounceOutUp');
});

helpButtonElement.addEventListener('click', () => {
    instructionsElement.classList.remove('animate__bounceOutUp');
    instructionsElement.classList.add('animate__bounceInDown');
});


/*------------------------------ Initiate Game ------------------------------*/

init();