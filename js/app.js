"use strict";

const submissionBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const resultElement = document.getElementById("guess-message");
const yourGuessElement = document.getElementById("current-guess");
const computerGuessElement = document.getElementById("computer-guess");
const guessHistoryElement = document.getElementById("guess-history");
const guessesLeftElement = document.getElementById("guesses-left");
const guessInputElement = document.getElementById('guess-input');
const errorMessageElement = document.getElementById('error-message');

const maxGuesses = 3;

let computerGuess = Math.floor(Math.random() * 10) + 1;
let guesses = 0;
let guessHistory = [];
let guessesLeft = maxGuesses;
let result;

guessesLeftElement.innerText = guessesLeft;

function guessTheNumber() { // function to run game logic and conditions 


    const yourGuess = Number(guessInputElement.value); // number from user input

    if (guessInputElement.value.trim() === "") { // check for a blank as input
        yourGuessElement.innerText = "Please enter a number";
        return;
    }
    
    if (!guessInputElement.checkValidity()) { //check for valid number 
        yourGuessElement.innerText = "Please guess between 1 and 10";
        return; 
    }

    yourGuessElement.innerText = yourGuess; // put user's guess on display
    restartBtn.disabled = false; // allow user to restart game after guessing once
    
    guesses++; // increment guess 
    guessesLeft--; // decrease guesses left
    guessHistory.push(yourGuess); // put guesses inputed into an array
    guessHistoryElement.innerText = guessHistory; // display all guesses
    guessesLeftElement.innerText = guessesLeft; // display guesses left
    guessInputElement.value = ""; // clear input 
    
    if(yourGuess === computerGuess) { // if user selects the correct number
        result = "You Win!";
        resultElement.innerText = result; // display that they won
        computerGuessElement.innerText = computerGuess; // display what the computer had guess
        submissionBtn.disabled = true; // disable submit button
        guessInputElement.disabled = true; // keep user from inputing more guesses
   
    } else if(yourGuess > computerGuess) { // user guess is too high
            result = "Too High";
            resultElement.innerText = result; // display result 
    
    } else { // user guesses too low
        result = "Too Low";
        resultElement.innerText = result; // display result
    } 

    if (guesses >= maxGuesses && yourGuess != computerGuess) { // if the user loses
        result = "You lose!";
        resultElement.innerText = result // display result
        guessesLeftElement.innerText = 0; // dispaly guesses left
        computerGuessElement.innerText = computerGuess; // disaply correct answer 
        submissionBtn.disabled = true; // disable submission button
        guessInputElement.disabled = true; // prevent user from adding another number 
        guessInputElement.value = ""; // clears input field 
    }
}     
              
submissionBtn.addEventListener("click", function () { //run game fuction when submit button is clicked
    guessTheNumber();
});
    
restartBtn.addEventListener("click", function () { // reset game when reset button is clicked
    guesses = 0; // reset guesses back to 0
    guessHistory = []; // reset array back to empty
    result = ""; // reset result back to empty
    computerGuess = Math.floor(Math.random() * 10) + 1; // computer picks new number
    guessesLeft = maxGuesses; // reset guesses left to the max allowed 
    guessInputElement.value = ""; // put empty value for input 
    guessInputElement.disabled = false; // enables user to start guessing again 
    yourGuessElement.innerText = "" // disaplys an empty space where recent guess is displayed
    resultElement.innerText = result; // displays an empty result
    computerGuessElement.innerText = ""; // disaplys an empty computer guess
    guessHistoryElement.innerText = ""; // displays an empty history
    guessesLeftElement.innerText = guessesLeft; // displays 3 guesses
    submissionBtn.disabled = false; // enable submit button
    restartBtn.disabled = true; // disable restart button
});
