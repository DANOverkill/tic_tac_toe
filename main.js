// import the APIs
import GameBoard from './GameBoard.js';
import Player from  './Player.js';
import GameControl from './GameControl.js';

// exposing GameBoard temporarily during dev and testing
window.GameBoard = GameBoard;
window.Player = Player;

window.startGame = (playerOneName, playerTwoName) => {

   let game = GameControl(playerOneName, playerTwoName);
   console.log('game started');
   window.game = game;  //exposing game for testing
   return game;
};

// DOM cache
const startBtn = document.querySelector('#startGameBtn');
const player1Input = document.querySelector('#player1Name');
const player2Input = document.querySelector('#player2Name');
const setupScreen = document.querySelector('#setupScreen');
const gameScreen = document.querySelector('#gameScreen');
const restartBtn = document.querySelector('#restartBtn');
const board = document.querySelector('#board');
// Ai not current implemented
// const player1IsAI = document.querySelector('#player1IsAI');
// const player2IsAI = document.querySelector('#player2IsAI');

function createBoardUI() {
  board.innerHTML = '';

  for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  board.appendChild(cell);
  }
};

function validateInputs() {
  startBtn.disabled = !(player1Input.value && player2Input.value);
};

player1Input.addEventListener('input', validateInputs);
player2Input.addEventListener('input', validateInputs);

startBtn.addEventListener('click', () => {
  setupScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  createBoardUI();
  startGame(player1Input.value, player2Input.value);
});

restartBtn.addEventListener('click', () => {
   GameBoard.resetBoard()
   player1Input.value = '';
   player2Input.value = '';
   player1Input.placeholder = 'Player 1 name';
   player2Input.placeholder = 'Player 2 name';
   startBtn.disabled = true;
   board.innerHTML = '';
   // document.querySelector('#player1AI').checked = false;
   // document.querySelector('#player2AI').checked = false;
});
