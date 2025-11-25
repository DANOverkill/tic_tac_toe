// import the APIs
import GameBoard from './GameBoard.js';
import Player from  './Player.js';
import GameControl from './GameControl.js';

// DOM cache
const startBtn = document.querySelector('#startGameBtn');
const player1Input = document.querySelector('#player1Name');
const player2Input = document.querySelector('#player2Name');
const setupScreen = document.querySelector('#setupScreen');
const gameScreen = document.querySelector('#gameScreen');
const restartBtn = document.querySelector('#restartBtn');
const board = document.querySelector('#board');
const winMessage = document.querySelector('#winMessage');
const scoreBoard = document.querySelector('#scoreBoard');
const player1IsAI = document.querySelector('#player1IsAI');
const player2IsAI = document.querySelector('#player2IsAI');

let game = GameControl('', '', '', '');

function validateInputs() {
  startBtn.disabled = !((player1Input.value.trim() || player1IsAI.checked) && 
                        (player2Input.value.trim() || player2IsAI.checked));
};

player1Input.addEventListener('input', validateInputs);
player2Input.addEventListener('input', validateInputs);
player1IsAI.addEventListener('change', validateInputs);
player2IsAI.addEventListener('change', validateInputs);

// player2IsAI.addEventListener('change', (event) => {
//   console.log(event);
// });

const createBoardUI = () => {
    board.innerHTML = '';

    for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
    }
};

const writeMark = (e) => {
    const mark = game.getCurrentPlayer().getMark();
    e.target.innerHTML = mark;
    e.target.classList.add('playerMark')
};   

const writeScoreBoard = () => {
  let currentPlayer = game.getCurrentPlayer();

  if (currentPlayer == game.getPlayerOne()) {
    scoreBoard.innerHTML =`
    <h3 id="playerOneName">${game.getPlayerOne().getName()}:</h3>
    <p id="playerOnePoints">${game.getPlayerOne().getPoints()}</p>
    <h2 id="vs">---vs---</h2>
    <p id="playerTwoPoints">${game.getPlayerTwo().getPoints()}</p>
    <h3>:${game.getPlayerTwo().getName()}</h3>`;
  } else {
    scoreBoard.innerHTML =`
    <h3>${game.getPlayerOne().getName()}:</h3>
    <p id="playerOnePoints">${game.getPlayerOne().getPoints()}</p>
    <h2 id="vs">---vs---</h2>
    <p id="playerTwoPoints">${game.getPlayerTwo().getPoints()}</p>
    <h3 id="playerTwoName">:${game.getPlayerTwo().getName()}</h3>`;
  }
};
 
const playRound = (index) => {
  let playTurn = (game.playTurn(index)); 
  if (playTurn === 'win') {
    winMessage.innerHTML = `<p>${game.getCurrentPlayer().getName()} won this round. 
                            Click next round to continue</p>
                            <button id="nextRound">Next Round</button>`;
    const nextRoundBtn = document.querySelector('#nextRound');
    nextRoundBtn.addEventListener('click', () => {
      winMessage.innerHTML = '';
      writeScoreBoard();
      createBoardUI();
      GameBoard.resetBoard();
      playTurn;
    });
  } else if (playTurn === 'continue'){
    playTurn;
  } else if (playTurn === 'tie') {
    winMessage.innerHTML = `<p>This round has tied. 
                        Click next round to continue</p>
                        <button id="nextRound">Next Round</button>`;
    const nextRoundBtn = document.querySelector('#nextRound');
    nextRoundBtn.addEventListener('click', () => {
      winMessage.innerHTML = '';
      writeScoreBoard();
      createBoardUI();
      GameBoard.resetBoard();
      playTurn;
    });
  }
}

startBtn.addEventListener('click', () => {
  setupScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  createBoardUI();
  winMessage.innerHTML = '';
  game = GameControl(player1Input.value, player1IsAI.checked, 
                      player2Input.value, player2IsAI.checked);
  writeScoreBoard();

  return game;
});

board.addEventListener('click', (e) => {
if (e.target.classList.contains('cell')) {
      const clickedCell = e.target;
      const index = clickedCell.dataset.index;
      if (clickedCell.innerHTML !== '') {
        return;
      } else {
        writeMark(e);
        playRound(index);
        writeScoreBoard();
      }
    }
});

restartBtn.addEventListener('click', () => {
  GameBoard.resetBoard()
  player1Input.value = '';
  player2Input.value = '';
  player1Input.placeholder = 'Player 1 name';
  player2Input.placeholder = 'Player 2 name';
  startBtn.disabled = true;
  board.innerHTML = '';
  scoreBoard.innerHTML = '';
  setupScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
   // document.querySelector('#player1AI').checked = false;
   // document.querySelector('#player2AI').checked = false;
});







