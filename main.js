// import the APIs
import GameBoard from './GameBoard.js';
import Player from  './Player.js';
import GameControl from './GameControl.js';

// exposing GameBoard temporarily during dev and testing
// window.GameBoard = GameBoard;
// window.Player = Player;

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

const GameControl = GameControl();  // ***** potentially add a constant to hold GameControl()

function validateInputs() {
  startBtn.disabled = !(player1Input.value && player2Input.value);
};

player1Input.addEventListener('input', validateInputs);
player2Input.addEventListener('input', validateInputs);

function createBoardUI() {
  board.innerHTML = '';

  for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  board.appendChild(cell);
  }
};

//try to get startBtn event lister to only call GameControl() but to make it global in main.js
startBtn.addEventListener('click', () => {    
  setupScreen.classList.add('hidden');                   
  gameScreen.classList.remove('hidden');
  createBoardUI();
  let game = GameControl(player1Input.value, player2Input.value);

  //this will allow the board listener to reach GameControl on the global scope. Same for resetBtn
  board.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      const clickedCell = e.target;
      const index = clickedCell.dataset.index;
      game.writeMArk(e);
      game.playTurn(index);
    }
  });
  return game;
});

restartBtn.addEventListener('click', () => {
  GameBoard.resetBoard();
  // GameControl.resetPlayers();  //atempting to add a rest player to reset button
  player1Input.value = '';
  player2Input.value = '';
  player1Input.placeholder = 'Player 1 name';
  player2Input.placeholder = 'Player 2 name';
  startBtn.disabled = true;
  board.innerHTML = '';
  setupScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
   // document.querySelector('#player1AI').checked = false;
   // document.querySelector('#player2AI').checked = false;
});







