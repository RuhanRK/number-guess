(function () {
    //random number
    let min = 1,
        max = 10,
        randomNum = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

    // game variable
    let winNum = randomNum(min, max),
        guessLeft = 3;

    // UI elements
    const game = document.querySelector('#game'),
        minNumber = document.querySelector('.min-num'),
        maxNumber = document.querySelector('.max-num'),
        guessInput = document.querySelector('#guess-input'),
        guessBtn = document.querySelector('#guess-btn'),
        message = document.querySelector('.message');

    minNumber.textContent = min;
    maxNumber.textContent = max;

    // game event listener
    game.onmousedown = function (e) {
        if (e.target.className === 'play-again') {
            window.location.reload();
        }
    }

    const setMessage = function (msg, color) {
        message.style.color = color;
        message.textContent = msg;
    }

    const gameStatus = function (status, msg) {
        let color;
        status ? color = 'red' : color = 'green';
        guessInput.disabled = true;
        guessInput.style.borderColor = color;
        setMessage(msg, color);
    };

    //play again
    const playAgain = function () {
        guessBtn.value = 'Play Again';
        guessBtn.classList = 'play-again';
    }

    //main game function
    const gameRun = function () {
        let guessNumber = parseInt(guessInput.value);
        //validate
        if (!guessNumber || guessNumber < min || guessNumber > max) {
            setMessage(`Please Enter a Number Between ${min} and ${max}`, 'red');
        } else {
            //wining situation
            if (guessNumber === winNum) {
                gameStatus(false, `Yahoo!! You Won. Guess Number is ${guessNumber}`);
                playAgain();
            } else {
                //losing situation
                guessLeft--;

                if (guessLeft === 0) {
                    gameStatus(true, `Oh No! You lose the Game. Correct Number was ${winNum}`);
                    playAgain();
                } else {
                    gameStatus(true, `Wrong Guess, Keep try. ${guessLeft} Guesses left`);
                    guessInput.disabled = false;
                }
            }
        }
        guessInput.value = '';
    }

    // submit button
    guessBtn.addEventListener('click', gameRun)

    //trigger enter key
    guessInput.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            gameRun();
        }
    });
})()