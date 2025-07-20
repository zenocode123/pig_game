'use strict';

const dice = document.getElementById('dice');
const playerBoxs = document.querySelectorAll('.player-box');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNews = document.querySelectorAll('.btn-new');

let diceValue = 0;
let currentPlayer = 1;
let currentScore = 0;
const scores = [0, 0];
btnHold.disabled = true;

btnRoll.addEventListener('click', rollDice);
dice.addEventListener('animationend', handleAnimationend);
btnHold.addEventListener('click', handleScore);
btnNews.forEach(item => item.addEventListener('click', newGame));

function rollDice() {
  dice.classList.add('rolling');
  btnRoll.disabled = true;

  diceValue = getRandomDice();
  dice.dataset.value = diceValue;
}

function getRandomDice() {
  return Math.trunc(Math.random() * 6 + 1);
}

function handleAnimationend() {
  dice.classList.remove('rolling');
  btnRoll.disabled = false;
  btnHold.disabled = false;

  if (diceValue !== 1) {
    currentScore += diceValue;
    updateCurrentScoreDisplay(currentScore);
  } else {
    btnHold.disabled = true;

    currentScore = 0;
    updateCurrentScoreDisplay(currentScore);
    changePlayer();
  }
}

function updateCurrentScoreDisplay(currentScore) {
  document.getElementById(`current${currentPlayer}`).textContent = currentScore;
}

function changePlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  playerBoxs.forEach(item => item.classList.toggle('active'));
}

function handleScore() {
  btnHold.disabled = true;

  scores[currentPlayer - 1] += currentScore;
  document.getElementById(`score${currentPlayer}`).textContent =
    scores[currentPlayer - 1];

  if (scores[currentPlayer - 1] >= 20) {
    getWinner();
  } else {
    currentScore = 0;
    updateCurrentScoreDisplay(currentScore);
    changePlayer();
  }
}

function getWinner() {
  btnHold.disabled = false;

  document.getElementById('winnerModal').classList.add('show');

  document.getElementById(
    'winnerText'
  ).textContent = `玩家 ${currentPlayer} 獲勝！`;
}

function newGame() {
  btnHold.disabled = true;
  document.getElementById('winnerModal').classList.remove('show');
  document.getElementById('winnerText').textContent = '';

  diceValue = 0;
  currentPlayer = 1;
  currentScore = 0;
  scores.forEach((item, index) => (scores[index] = 0));

  dice.dataset.value = diceValue;
  document
    .querySelectorAll('.total-score')
    .forEach(item => (item.textContent = 0));
  document
    .querySelectorAll('.current-score')
    .forEach(item => (item.querySelector('span').textContent = 0));

  playerBoxs.forEach(item => item.classList.remove('active'));
  playerBoxs[0].classList.add('active');
}
