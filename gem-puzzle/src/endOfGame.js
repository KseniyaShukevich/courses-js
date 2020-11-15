import { isEnd } from './elementGraph';
import { getGraf } from './animationElement';
import { getMenu } from './statusMenu';

const btnNewGame = document.querySelector('.btn-new-game');
const pause = document.querySelector('.btn-pause');

function getMessage() {
  const time = document.querySelector('.time');
  const moves = document.querySelector('.moves');
  const strTime = time.textContent.slice(7, time.textContent.length);
  const strMoves = moves.textContent.slice(7, moves.textContent.length);
  alert(`Ура! Вы решили головоломку за ${strTime} и ${strMoves} ходов`);
}

function endGame() {
  localStorage.setItem('isGameStart', '0');
  localStorage.setItem('arraySaveGame', 'null');
  getMenu();
  pause.textContent = 'Пауза';
  getMessage();
}

function isEndGame() {
  const graf = getGraf();
  if (isEnd(graf)) {
    setTimeout(() => { endGame(); }, 1000);
  }
}

function getEvents() {
  const elements = document.querySelectorAll('.element');
  elements.forEach((element) => {
    element.addEventListener('click', isEndGame);
  });
}

btnNewGame.addEventListener('click', getEvents);
