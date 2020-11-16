/* eslint-disable prefer-destructuring */
import getSize from './settings';
import { changeDisplayNodes } from './logicMenu';

const btnMain = document.querySelectorAll('.main');
const btnRating = document.querySelector('.btn-rating');
const ratingNodes = document.querySelectorAll('.rating');
const exit = document.querySelector('.exit-rating');
const dateRating = document.querySelectorAll('.date-rating');
const timeRating = document.querySelectorAll('.time-rating');
const movesRating = document.querySelectorAll('.moves-rating');
const fieldRating = document.querySelectorAll('.field-rating');

function setSaveRating(item) {
  if (!localStorage.getItem('arrayRatingUser')) {
    localStorage.setItem('arrayRatingUser', item);
  } else {
    const ratingUser = localStorage.getItem('arrayRatingUser');
    const result = `${ratingUser}-${item}`;
    localStorage.setItem('arrayRatingUser', result);
  }
}

function sortArray(arrayGames) {
  const arr = [];
  const result = [];
  arrayGames.forEach((item) => {
    const game = item.split(',');
    arr.push(game[0]);
  });
  arr.sort((a, b) => a - b);

  arr.forEach((item) => {
    for (let k = 0; k < arrayGames.length; k += 1) {
      const game = arrayGames[k].split(',');
      if (item === game[0]) {
        result.push(arrayGames[k]);
      }
    }
  });

  return result;
}

function getArrays() {
  const rating = localStorage.getItem('arrayRatingUser');
  const games = rating.split('-');
  const allGames = sortArray(games);
  let count = 0;
  let notTen = true;
  allGames.forEach((item) => {
    if (notTen) {
      let oneGame = item.split(',');
      oneGame = oneGame.slice(1);
      dateRating[count].textContent = oneGame[0];
      timeRating[count].textContent = oneGame[1];
      movesRating[count].textContent = oneGame[2];
      fieldRating[count].textContent = oneGame[3];
      count += 1;
      if (count >= 10) {
        notTen = false;
      }
    }
  });
}

export default function setArrayRating() {
  const date = new Date();
  const day = date.getDate();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  const year = date.getFullYear();
  const time = document.querySelector('.time');
  const moves = document.querySelector('.moves');
  const timeStr = time.textContent.slice(7);
  const movesStr = moves.textContent.slice(7);
  const size = getSize();
  const timeCounter = localStorage.getItem('saveTimeCounter');
  const item = [];
  item.push(timeCounter, `${day}.${month}.${year}`);
  item.push(timeStr, movesStr, `${size}x${size}`);
  setSaveRating(item);
  getArrays();
}

function getMainMenu() {
  changeDisplayNodes(ratingNodes, 'none');
  changeDisplayNodes(btnMain, '');
}

function getRatingMenu() {
  changeDisplayNodes(ratingNodes, '');
  changeDisplayNodes(btnMain, 'none');
}

function getStartRating() {
  if (localStorage.getItem('arrayRatingUser')) {
    getArrays();
    getRatingMenu();
  } else {
    getRatingMenu();
  }
}

btnRating.addEventListener('click', getStartRating);
exit.addEventListener('click', getMainMenu);
