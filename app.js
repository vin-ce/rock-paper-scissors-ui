// -----------------
// GLOBAL SELECTIONS
// -----------------

let computerInput = document.querySelector('.computer-input');
let instructions = document.querySelector('.instructions');
let allElements = document.querySelector('body');
let itemOne = document.querySelector('.item-1');
let itemTwo = document.querySelector('.item-2');
let maxScorePara = document.querySelector('.max-score-para');
let scoreContainer = document.querySelector('.score');
let playerScoreDisplay = document.querySelector('.player-score');
let computerScoreDisplay = document.querySelector('.computer-score');

// hardcoding delay time
let functioningTime = 1000;
let maxScore = 3;
let text = [];

// global variables
let removePrevEventListener = () => {};

// ----
// INIT
// ----
allElements.classList.add('invisible');
scoreContainer.classList.add('remove');
scoreContainer.classList.remove('container');
homePage();

// --------
// HOMEPAGE
// --------

function homePage() {
	if (allElements.classList.contains('invisible')) {
		allElements.classList.remove('invisible');
	} else {
		pageTransition();
	}

	// attempted transition end, but it conflicts with userInput fade-out. Didn't know how to resolve.
	setTimeout(() => {
		addRemoveList();
		userKeyPress(homeCommandsLogic, 'letters');

		// perhaps 'typewriter effect' initalises here?

		instructions.textContent = '[type to begin]';
		itemOne.textContent = 'new game';
		itemTwo.textContent = 'set max score';
		allElements.classList.remove('page-transition');
	}, functioningTime);

	setTimeout(() => {
		newComputerInput('rock, paper, scissors.');
	}, functioningTime);

	function homeCommandsLogic(userInput) {
		if (userInput === 'new game') {
			newGame();
		}
		if (userInput === 'set max score') {
			setMaxPage();
		}
	}
}

// -------
// SET MAX
// -------
function setMaxPage() {
	pageTransition();
	pageState = { page: 'setMaxPage' };

	setTimeout(() => {
		addRemoveList();
		userKeyPress(setMaxCommandsLogic, 'alphanumeric');
		instructions.textContent = '[type in number]';
		itemOne.textContent = 'back';
		itemTwo.classList.add('remove');
		allElements.classList.remove('page-transition');
	}, functioningTime);
	setTimeout(() => {
		newComputerInput('set max score');
	}, functioningTime);

	function setMaxCommandsLogic(userInput) {
		if (userInput === 'back') {
			homePage();
		}
		isInt = parseInt(userInput, 10);
		if (isInt) {
			maxScore = isInt;
		}
	}
}

// ------------
// GAME SECTION
// ------------

// initiates game

// end of game, have 'again' that runs newGame again

function newGame() {
	pageTransition();

	setTimeout(() => {
		addRemoveList();
		userKeyPress(newGameLogic, 'letters');
		computerScoreDialogue();
		instructions.textContent = '[rock, paper or scissors]';
		itemOne.textContent = 'quit';
		itemTwo.classList.add('remove');
		maxScorePara.innerHTML = `playing first to <span class="max-score">${maxScore}</span>`;
		scoreContainer.classList.remove('remove');
		scoreContainer.classList.add('container');
		allElements.classList.remove('page-transition');
	}, functioningTime);

	let playerSelection;
	let playerScore = 0,
		computerScore = 0;
	playerScoreDisplay.textContent = playerScore;
	computerScoreDisplay.textContent = computerScore;

	let resultsHistory = [];

	function newGameLogic(userInput) {
		if (userInput === 'quit') {
			homePage();
		}
		if (userInput === 'again') {
			newGame();
		}
		if (userInput === 'rock') {
			playerSelection = userInput;
			playRound();
		}
		if (userInput === 'paper') {
			playerSelection = userInput;
			playRound();
		}
		if (userInput === 'scissors') {
			playerSelection = userInput;
			playRound();
		}
	}

	function playRound() {
		if (playerScore < maxScore && computerScore < maxScore) {
			let computerSelection = computerPlay();
			let results = determineResults(playerSelection, computerSelection);
			newComputerInput(computerSelection);
			if (results === 'Win') {
				playerScore++;
				playerScoreDisplay.textContent = playerScore;
			} else if (results === 'Lose') {
				computerScore++;
				computerScoreDisplay.textContent = computerScore;
			}
			computerResultsDialogue(results);
		}

		if (playerScore === maxScore || computerScore === maxScore) {
			setTimeout(() => {
				if (playerScore > computerScore) {
					newComputerInput('You win.');
				} else {
					newComputerInput('I win.');
				}
				itemOne.textContent = 'again?';
			}, 1000);
		}
	}

	// Randomises rock, paper and scissors for computer
	function computerPlay() {
		let computerChoice = [ 'rock', 'paper', 'scissors' ];
		return computerChoice[Math.floor(Math.random() * computerChoice.length)];
	}

	// Declares win/loss
	function determineResults(playerSelection, computerSelection) {
		// game logic
		if (playerSelection === 'rock') {
			if (computerSelection === 'rock') {
				return 'Draw';
			} else if (computerSelection === 'paper') {
				return 'Lose';
			} else {
				return 'Win';
			}
		} else if (playerSelection === 'paper') {
			if (computerSelection === 'rock') {
				return 'Win';
			} else if (computerSelection === 'paper') {
				return 'Draw';
			} else {
				return 'Lose';
			}
		} else if (playerSelection === 'scissors') {
			if (computerSelection === 'rock') {
				return 'Lose';
			} else if (computerSelection === 'paper') {
				return 'Win';
			} else {
				return 'Draw';
			}
		} else {
			return 'ERROR!';
		}
	}

	// COMPUTER DIALOGUE

	function computerScoreDialogue() {
		if (maxScore <= 20) {
			newComputerInput('lets begin.');
		}
		if (maxScore > 20 && maxScore <= 50) {
			newComputerInput("that's quite a couple of rounds.");
		}
		if (maxScore > 50 && maxScore <= 60) {
			newComputerInput('hm. Are you OK?');
		}
		if (maxScore > 60 && maxScore <= 70) {
			newComputerInput("it's alright to seek help, you know.");
		}
		if (maxScore > 70 && maxScore <= 80) {
			newComputerInput("I mean, I'm flattered that you want to spend so much time with me.");
		}
		if (maxScore > 80 && maxScore <= 90) {
			newComputerInput('but real life friends are more important.');
		}
		if (maxScore > 90 && maxScore <= 100) {
			newComputerInput("oh. I see. I'm sorry.");
		}
		if (maxScore > 100) {
			newComputerInput("well, I'll always be around.");
		}
	}

	function computerResultsDialogue(results) {
		if (resultsHistory[resultsHistory.length - 1] === results || resultsHistory === []) {
			resultsHistory.push(results);
			console.log(resultsHistory + 'from the if');
		} else {
			resultsHistory = [ results ];
			console.log(resultsHistory + 'from the else');
		}

		if (resultsHistory.length === 3 && resultsHistory[0] === 'Draw') {
			newComputerInput('hey, stop copying my answers');
		}
	}
}

// -----------------
// KEYPRESS FUNCTION
// -----------------

function userKeyPress(commandsLogic, validKeysParam) {
	let keyPressed = [];
	let userInput, idleInterval;
	removePrevEventListener = () => {
		document.removeEventListener('keydown', userInputLogic);
	};
	document.addEventListener('keydown', userInputLogic);

	function userInputLogic(keyPress) {
		// resets timer
		let idleIncrement = 0;
		clearInterval(idleInterval);

		// valid keys parameter checker
		let validKeys;
		let input = String.fromCharCode(keyPress.keyCode);
		if (validKeysParam === 'letters') {
			validKeys = /[a-zA-z ]/.test(input);
			console.log(validKeys);
		} else if (validKeysParam === 'alphanumeric') {
			validKeys = /[0-9a-zA-Z ]/.test(input);
		}

		// filters keys that aren't letters or space
		if (validKeys) {
			key = keyPress.key;
		} else {
			key = '';
		}

		keyPressed.push(key);
		userInput = keyPressed.join('');

		let inputPara = displayUserInput(userInput);

		// checks and executes appropriate commands
		commandsLogic(userInput);

		// fades user input
		idleInterval = setInterval(fadeTrack, 50);
		function fadeTrack() {
			if (idleIncrement > 10) {
				clearInterval(idleInterval);
			} else {
				idleIncrement++;
				if (idleIncrement === 5) {
					inputPara.classList.add('fade-out');
				}
				if (idleIncrement === 10) {
					keyPressed = [];
				}
			}
		}
	}
}

function displayUserInput(key) {
	let inputPara = document.querySelector('.userInput');
	inputPara.textContent = key;
	inputPara.classList.remove('fade-out');
	return inputPara;
}

// ---------------
// PAGE TRANSITION
// ---------------

function pageTransition() {
	allElements.classList.add('page-transition');
	removePrevEventListener();
}

function addRemoveList() {
	scoreContainer.classList.add('remove');
	scoreContainer.classList.remove('container');
	itemTwo.classList.remove('remove');
}

// -----------------
// PROXIMITY TRACKER
// -----------------

let mouseProximity = require('mouse-proximity');

let mprox = new mouseProximity(document.getElementsByClassName('menu'), {
	clear: true,
	origin: 'center',
	showAttribute: false
});

//callback
let lowerOpacity = function(el, distance) {
	el.style.opacity = distance * 0.001;
};

//run the proximity tracker
mprox.run(lowerOpacity);

// -------------
// TYPING EFFECT
// -------------

function newComputerInput(computerText) {
	text.unshift(computerText);
	typeComputerInput(text, 0);

	// text[0] is current input, text[1] is previous input.
	function typeComputerInput(text, i) {
		// if there is previous text, remove it
		if (text[1] !== undefined) {
			deletePreviousInput(text[1], text[1].length);
		}

		if (i < text[0].length && text[1] === undefined) {
			computerInput.innerHTML = text[0].substring(0, i + 1) + '<span class="caret"></span>';
			window.setTimeout(() => {
				typeComputerInput(text, i + 1);
			}, 75);
			console.log('Text is typed');
		}
	}

	function deletePreviousInput(prevText, i) {
		console.log('Text deleted');
		if (i > 0) {
			computerInput.innerHTML = prevText.substring(0, i - 1) + '<span class="caret"></span>';
			prevText = prevText.substring(0, i - 1);
			setTimeout(() => {
				deletePreviousInput(prevText, prevText.length);
			}, 25);
		} else {
			text[1] = undefined;
			typeComputerInput(text, 0);
		}
	}
}
