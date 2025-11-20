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
const winMessage = document.querySelector('#winMessage');

let game = GameControl('', '');
// Ai not current implemented
// const player1IsAI = document.querySelector('#player1IsAI');
// const player2IsAI = document.querySelector('#player2IsAI');


/*
The changes I made to the logic are as follows:
-make GameControl a global 'let' var
-the startBtn listener creates a new GameControl overwriting the global var
-moved the click listener for the board out of the startBtn listener so it doesn't add a new listener
    whenever the start button is clicked

You could also keep the addEventListener in the startBtn listener function, but you must use removeEventListener
or you'll get multiple listeners and multiple game logics running at once.
*/

function validateInputs() {
  startBtn.disabled = !(player1Input.value && player2Input.value);
};

player1Input.addEventListener('input', validateInputs);
player2Input.addEventListener('input', validateInputs);

const createBoardUI = () => {
    board.innerHTML = '';

    for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
    }
};

const writeMArk = (e) => {
    const mark = game.getCurrentPlayer().getMark();
    console.log(e);
    if (e.target.innerHTML === '') {
      e.target.innerHTML = mark;
      e.target.classList.add('playerMark')
    } else {
      return;
    }
};    


startBtn.addEventListener('click', () => {
  setupScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  createBoardUI();
  winMessage.innerHTML = '';
  game = GameControl(player1Input.value, player2Input.value);

  return game;
});

board.addEventListener('click', (e) => {
if (e.target.classList.contains('cell')) {
      const clickedCell = e.target;
      const index = clickedCell.dataset.index;
      writeMArk(e);
      let playTurn = (game.playTurn(index)); 
      if (playTurn === 'win') {
        winMessage.innerHTML = `<p>${game.getCurrentPlayer().getName()} won this round. 
                                Click Next Round to continue</p>
                                <button id="nextRound">Next Round</button>`;
        const nextRoundBtn = document.querySelector('#nextRound');
        nextRoundBtn.addEventListener('click', () => {
          winMessage.innerHTML = '';
          createBoardUI();
          GameBoard.resetBoard();
          playTurn;
        });
      } else if (playTurn === 'continue'){
        playTurn;
      };
    }
})

restartBtn.addEventListener('click', () => {
  GameBoard.resetBoard()
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







