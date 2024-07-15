let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let isAutoPlaying = false;
let intervalId;

document.addEventListener('DOMContentLoaded', () => {
  updateScoreElement();

  document.querySelector('.js-rock-button').addEventListener('click', () => playGame('rock'));
  document.querySelector('.js-paper-button').addEventListener('click', () => playGame('paper'));
  document.querySelector('.js-scissors-button').addEventListener('click', () => playGame('scissors'));
  document.querySelector('.js-reset-score-button').addEventListener('click', resetScore);
  document.querySelector('.js-auto-play-button').addEventListener('click', autoPlay);

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') playGame('rock');
    else if (event.key === 'p') playGame('paper');
    else if (event.key === 's') playGame('scissors');
  });
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  const result = getResult(playerMove, computerMove);

  updateScore(result);
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-result').textContent = result;
  document.querySelector('.js-moves').innerHTML = `
    You <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer
  `;
}

function updateScoreElement() {
  document.querySelector('.js-score').textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}

function getResult(playerMove, computerMove) {
  if (playerMove === computerMove) return 'Tie.';

  const winningMoves = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };

  return winningMoves[playerMove] === computerMove ? 'You win.' : 'You lose.';
}

function updateScore(result) {
  if (result === 'You win.') score.wins++;
  else if (result === 'You lose.') score.losses++;
  else if (result === 'Tie.') score.ties++;
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScoreElement();
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => playGame(pickComputerMove()), 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
