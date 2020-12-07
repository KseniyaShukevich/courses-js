import { getArrayCategories } from '../pages/createObjectCategory';
import getIsStatusTrain from '../status/status';
import { addSortIconInit, getSortString } from './sortStatistics';

const hash = 'so8u4fdk';
let words = [];

function setLocalStorage(index, word) {
  const arrWord = localStorage.getItem(`${hash}${word}`).split(':');
  arrWord[index] = +arrWord[index] + 1;
  localStorage.setItem(`${hash}${word}`, arrWord.join(':'));
}

function setPercentErrors(word) {
  const indexCorrClicks = 4;
  const indexErrClicks = 5;
  const indexPercent = 6;
  const arrWord = localStorage.getItem(`${hash}${word}`).split(':');
  const corr = +arrWord[indexCorrClicks];
  const err = +arrWord[indexErrClicks];
  const percent = Math.round((err / (err + corr)) * 100);
  arrWord[indexPercent] = percent;
  localStorage.setItem(`${hash}${word}`, arrWord.join(':'));
}

export function addErrClicks(word) {
  const indexErrClicks = 5;
  setLocalStorage(indexErrClicks, word);
  setPercentErrors(word);
}

export function addCorrClick(word) {
  const indexCorrClicks = 4;
  setLocalStorage(indexCorrClicks, word);
  setPercentErrors(word);
}

function addTrainClick(e) {
  if (getIsStatusTrain()) {
    const word = e.currentTarget.getAttribute('data-word');
    const indexTrainClick = 3;
    setLocalStorage(indexTrainClick, word);
  }
}

export function addEventsStatisticsClicks() {
  const cards = document.querySelectorAll('.card-word');
  cards.forEach((card) => card.addEventListener('pointerup', addTrainClick));
}

function getArrWords() {
  const arrWords = [];
  const categories = getArrayCategories();
  categories.forEach((obj) => arrWords.push(...obj.words));
  return arrWords;
}

export function clearStatistics() {
  for (let i = 0; i < words.length; i += 1) {
    const arr = [words[i].category, words[i].word, words[i].translation, 0, 0, 0, 0];
    localStorage.setItem(`${hash}${words[i].word}`, `${arr.join(':')}`);
  }
}

export function checkStatistics() {
  words = getArrWords();
  for (let i = 0; i < words.length; i += 1) {
    if (!localStorage.getItem(`${hash}${words[i].word}`)) {
      const arr = [words[i].category, words[i].word, words[i].translation, 0, 0, 0, 0];
      localStorage.setItem(`${hash}${words[i].word}`, `${arr.join(':')}`);
    }
  }
}

export default function getArrayStatistics() {
  checkStatistics();
  let result = [];
  for (let i = 0; i < words.length; i += 1) {
    result.push(localStorage.getItem(`${hash}${words[i].word}`));
  }
  addSortIconInit(result);
  result = getSortString(0);
  return result;
}
