//======================== Import the APIs ==============================//
import GameBoard from './GameBoard.js';
import Player from  './Player.js';
import GameControl from './GameControl.js';
import AiTurn from './AiTurn.js';
//=======================================================================// 
// 
// 
//============================= DOM cache ===============================//
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
const spinner = document.querySelector('#spinner');
//========================================================================// 
// 
// 
//========================  Global Variables  ===========================//
let game = GameControl('', '', '', '');
let aiIsThinking = false;
//=======================================================================// 
// 
// 
//=======================Boar Ui Update Logic ============================//
function validateInputs() {
  startBtn.disabled = !((player1Input.value.trim() || player1IsAI.checked) && 
                        (player2Input.value.trim() || player2IsAI.checked));
};

function onlyOneAiAllowed(event) {
  const clickedCheckbox = event.target;

  if (clickedCheckbox === player1IsAI && player1IsAI.checked) {
    player2IsAI.checked = false;
  } else if (clickedCheckbox === player2IsAI && player2IsAI.checked) {
    player1IsAI.checked = false;
  }
}

player1Input.addEventListener('input', validateInputs);
player2Input.addEventListener('input', validateInputs);
player1IsAI.addEventListener('change', validateInputs);
player2IsAI.addEventListener('change', validateInputs);
player1IsAI.addEventListener('change', onlyOneAiAllowed);
player2IsAI.addEventListener('change', onlyOneAiAllowed);

const createBoardUI = () => {
    board.innerHTML = '';

    for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
    }
};

const showSpinner = () => spinner.classList.add('show');
const hideSpinner = () => spinner.classList.remove('show');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const writeMark = (e) => {
    const mark = game.getCurrentPlayer().getMark();
    e.target.innerHTML = mark;
    e.target.classList.add('playerMark')
};

const writeAiRandomMark = async () => {

  aiIsThinking = true;
  showSpinner();

  const ai = AiTurn(
    game.getCurrentPlayer().getIsAi(),
    game.getCurrentPlayer().getMark(),
    GameBoard.getBoard()
  );

  const aiChosenCellIndex = ai.aiRandomChoice();
  const aiMark = ai.getAiMark();

  await sleep(600);
  hideSpinner();

  const chosenCell = document.querySelector(`[data-index="${aiChosenCellIndex}"]`)
  chosenCell.innerHTML = aiMark;
  chosenCell.classList.add('playerMark');

  GameBoard.setMark(aiChosenCellIndex, aiMark);
  aiIsThinking = false;

  return game.playTurn(aiChosenCellIndex);
};
//========================================================================//   
// 
// 
// =========================== Score Board UI =============================//
const writeScoreBoard = () => {
  let currentPlayer = game.getCurrentPlayer();

  if (currentPlayer == game.getPlayerOne()) {
    scoreBoard.innerHTML =`
    <h3 id="playerOneName">${game.getPlayerOne().getName()}:</h3>
    <p id="playerOnePoints">${game.getPlayerOne().getPoints()}</p>
    <h2 id="vs">---vs---</h2>
    <p id="playerTwoPoints">${game.getPlayerTwo().getPoints()}</p>
    <h3>:${game.getPlayerTwo().getName()}</h3>
    `;
  } else {
    scoreBoard.innerHTML =`
    <h3>${game.getPlayerOne().getName()}:</h3>
    <p id="playerOnePoints">${game.getPlayerOne().getPoints()}</p>
    <h2 id="vs">---vs---</h2>
    <p id="playerTwoPoints">${game.getPlayerTwo().getPoints()}</p>
    <h3 id="playerTwoName">:${game.getPlayerTwo().getName()}</h3>
    `;
  }
};
const writeWinMessage = () => {
  winMessage.innerHTML = `
  <p>${game.getCurrentPlayer().getName()} won this round. 
  Click next round to continue</p>
  <button id="nextRound">Next Round</button>
  `;
  const nextRoundBtn = document.querySelector('#nextRound');
  nextRoundBtn.addEventListener('click', () => {
    winMessage.innerHTML = '';
    GameBoard.resetBoard();
    createBoardUI();
    writeScoreBoard();
    if (game.getCurrentPlayer().getIsAi()) {
      writeAiRandomMark();
    }      
  });
}
const writeTieMessage = () => {
  winMessage.innerHTML = `
  <p>This round has tied. 
  Click next round to continue</p>
  <button id="nextRound">Next Round</button>
  `;
  const nextRoundBtn = document.querySelector('#nextRound');
  nextRoundBtn.addEventListener('click', () => {
    winMessage.innerHTML = '';
    GameBoard.resetBoard();
    createBoardUI();
    writeScoreBoard();
    if (game.getCurrentPlayer().getIsAi()) {
      writeAiRandomMark();
    }
  });  
}
//========================================================================//
// 
// 
// ================== Game Pause for Wins and Ties ========================//
const playRound = async (index) => {
  let playTurn = game.playTurn(index); 

  if (playTurn === 'win') {writeWinMessage();} 
  else if (playTurn === 'continue'){
      if (game.getCurrentPlayer().getIsAi()) {
        let aiResult = await writeAiRandomMark();
        writeScoreBoard();
        if (aiResult === 'win') {writeWinMessage();} 
        else if (aiResult === 'tie') {writeTieMessage();}
      } 
  } else if (playTurn === 'tie') {writeTieMessage();}
}
//========================================================================//
// 
// 
//===================== Buttons and Click Handlers =======================//
startBtn.addEventListener('click', () => {
  setupScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  createBoardUI();
  winMessage.innerHTML = '';
  game = GameControl(player1Input.value, player1IsAI.checked, 
                      player2Input.value, player2IsAI.checked);
  writeScoreBoard();
  if (game.getCurrentPlayer().getIsAi()){
    writeAiRandomMark();
    return game;
  } else {
    return game;
  } 
});

board.addEventListener('click', (e) => {
  if (aiIsThinking) return;
  if (document.getElementById('nextRound')) return;
  
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
  player1IsAI.checked = false;
  player2IsAI.checked = false;
});
//=======================================================================// 







