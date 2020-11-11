import getNewGame, { getAr } from './newGame';
import Graf from './elementGraph';

let graf = {};

getNewGame();

const btnNewGame = document.querySelector('.btn-new-game');

function fun(e) {
  graf.searchAndSwap(e.target.textContent, e.target);
}

function listenElements() {
  const elements = document.querySelectorAll('.element');
  elements.forEach((item) => {
    item.addEventListener('click', fun);
  });
}

export default function createGraf() {
  const array = getAr();
  graf = new Graf();

  array.forEach((item) => graf.addNext(item));
  graf.createGraphOfElements();
  listenElements();
}

btnNewGame.addEventListener('click', createGraf);
