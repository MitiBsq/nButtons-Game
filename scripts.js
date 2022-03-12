//Setting the start game button
const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', () => { startGameButton.remove(); selectTNOB() });
//Initializing the global variables
const gameScreen = document.getElementById('gameScreen');
const inputButtonNumber = document.getElementById('inputButton');
const InputButtonPlace = document.getElementById('InputButtonPlace');
InputButtonPlace.style.visibility = 'hidden';
const randomButtonsPlace = document.getElementById('randomButtonsPlace');

//selectTNOB-select the number of buttons
function selectTNOB() {
    gameScreen.textContent = "Insert the number of buttons wanted(Max 10)";
    gameScreen.style.fontSize = 'medium';
    InputButtonPlace.style.visibility = 'visible';
    //Button for submiting the number of buttons wanted;
    const chooseValue = document.getElementById('chooseValue');
    chooseValue.addEventListener('click', buttonGenerator);
}

//Creating the environment for the random buttons + the generator
let randomButton = new Array(inputButtonNumber.value);
function buttonGenerator() {
    //Fixing the 'not correct value' error
    if (inputButtonNumber.value >= 2 && inputButtonNumber.value <= 10) {
        InputButtonPlace.style.visibility = "hidden"
        gameScreen.style.fontSize = 'larger';
        gameScreen.textContent = "Choose a button and find out if you have won";
        for (let i = 0; i < inputButtonNumber.value; i++) {
            randomButton[i] = document.createElement('button');
            randomButton[i].textContent = i + 1;
            randomButtonsPlace.appendChild(randomButton[i]);
            //Styling the buttons black and white 
            if (i % 2 === 0) {
                randomButton[i].className = "btn btn-lg btn-dark";
            }
            else {
                randomButton[i].className = "btn btn-lg btn-light";
            }
            //The events of the buttons
            randomButton[i].addEventListener('click', () => {
                for (let i = 0; i < inputButtonNumber.value; i++) {
                    randomButton[i].disabled = true;
                };
                randomButton[i].className = 'btn btn-lg btn-danger';
                playerChoose = i;
                resultGenerator();
            });
        }
    }
    else {
        gameScreen.innerHTML = "Incorect value";
        gameScreen.style.color = "Red";
        gameScreen.style.fontSize = "large"
    }
}

//Functions for generating the result
function resultGenerator() {
    const randomWinnerButton = Math.floor(Math.random() * inputButtonNumber.value);
    if (randomWinnerButton === playerChoose) {
        gameScreen.textContent = "CORRECT! You won";
        randomButton[randomWinnerButton].className = 'btn btn-lg btn-success';
        gameScreen.style.fontWeight = 'bold';
        game.style.backgroundColor = "YellowGreen";
        setTimeout(function () { gameOverMenu() }, 1.0 * 2000);
    }
    else {
        gameScreen.textContent = "WRONG! You lost, ";
        gameScreen.textContent += "the correct button was ";
        gameScreen.textContent += randomWinnerButton + 1;
        randomButton[randomWinnerButton].className = 'btn btn-lg btn-success';
        game.style.backgroundColor = "tomato";
        gameScreen.style.fontWeight = 'bold';
        setTimeout(function () { gameOverMenu() }, 1.0 * 2000);
    }
}

//The last function where we restart the game
function gameOverMenu() {
    for (let i = 0; i < inputButtonNumber.value; i++) {
        randomButton[i].remove();
    }
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    game.appendChild(restartButton);
    restartButton.className = 'btn btn-outline-dark btn-lg';
    restartButton.addEventListener('click', () => { restartButton.remove(); game.style.backgroundColor = 'bisque'; selectTNOB(); });
}
