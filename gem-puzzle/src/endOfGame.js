import { isEnd } from './elementGraph';
import { getGraf } from './animationElement';
import { getMenu } from './statusMenu';
import { changeDisplayNodes } from './logicMenu';

const btnNewGame = document.querySelector('.btn-new-game');
const pause = document.querySelector('.btn-pause');
const btnMain = document.querySelectorAll('.main');
const gratulateMenu = document.querySelectorAll('.gratulate');
const exit = document.querySelector('.exit-gratulate');

function getMainMenu() {
  changeDisplayNodes(gratulateMenu, 'none');
  changeDisplayNodes(btnMain, '');
}

function getGratulate() {
  getMenu();
  const containerMenu = document.querySelector('.container-menu');
  containerMenu.style.display = '';
  changeDisplayNodes(gratulateMenu, '');
  changeDisplayNodes(btnMain, 'none');
}

function getMessage() {
  const messageGratulate = document.querySelector('.message-gratulate');
  const time = document.querySelector('.time');
  const moves = document.querySelector('.moves');
  const strTime = time.textContent.slice(7, time.textContent.length);
  const strMoves = moves.textContent.slice(7, moves.textContent.length);
  messageGratulate.textContent = `Вы решили головоломку за ${strTime} и ${strMoves} ходов`;
}

function endGame() {
  localStorage.setItem('isGameStart', '0');
  localStorage.setItem('arraySaveGame', 'null');
  getGratulate();
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
exit.addEventListener('click', getMainMenu);
