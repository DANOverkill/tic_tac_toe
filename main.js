// import the APIs
// import GameBoard from './GameBoard.js';
// import Player from  './Player.js';
import GameControl from './GameControl.js';

// exposing GameBoard temporarily during dev and testing
// window.GameBoard = GameBoard;
// window.Player = Player;

window.startGame = (player1Input, player2Input) => {

   let game = GameControl();
   console.log('game started');
   return game;
};


const startBtn = document.querySelector('#startGameBtn');
const player1Input = document.querySelector('#player1Name');
const player2Input = document.querySelector('#player2Name');
const setupScreen = document.querySelector('#setupScreen');
const gameScreen = document.querySelector('#gameScreen');

function validateInputs() {
  startBtn.disabled = !(player1Input.value && player2Input.value);
}

player1Input.addEventListener('input', validateInputs);
player2Input.addEventListener('input', validateInputs);

startBtn.addEventListener('click', () => {
  setupScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  startGame(player1Input.value, player2Input.value);
});
