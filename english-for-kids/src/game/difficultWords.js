import DifficultCategory from '../cards/classDifficultCategory';
import { getArrayCategories } from '../pages/createObjectCategory';
import { getSortNumber, getArrOfWords } from '../statistics/sortStatistics';
import { fillCards } from '../pages/logicPages';
import getMain from '../pages/mainPage';

const btnDifficultWords = document.querySelector('.btn-difficult-words');
let diffCategory = {};

function findObjWord(category, word) {
  const arrCategories = getArrayCategories();
  const objCategory = arrCategories.find((el) => el.name === category);
  const objWord = objCategory.words.find((el) => el.word === word);
  return objWord;
}

function getArrDiffWords() {
  const indexPercent = 6;
  getSortNumber(indexPercent);
  const sortWords = getArrOfWords().reverse();
  const maxCountWords = 8;
  const result = sortWords.slice(0, maxCountWords);
  for (let i = maxCountWords - 1; i >= 0; i -= 1) {
    const arr = result[i].split(':');
    const percent = +arr[indexPercent];
    if (percent === 0) {
      result.pop();
    }
  }
  return result;
}

function getObjClass() {
  const category = new DifficultCategory();
  const arr = getArrDiffWords();
  const indexCategory = 0;
  const indexWord = 1;
  for (let i = 0; i < arr.length; i += 1) {
    const arrWord = arr[i].split(':');
    const obj = findObjWord(arrWord[indexCategory], arrWord[indexWord]);
    category.addWord(obj);
  }
  return category;
}

function hideStatistics() {
  const wrapperStatistics = document.querySelector('.wrapper-statistics');
  wrapperStatistics.classList.remove('displayBlock');
}

function getMainPage() {
  setTimeout(() => {
    const message = document.querySelector('.wrapper-message');
    message.classList.remove('displayBlock');
    const links = document.querySelectorAll('.menu-link');
    const link = Array.from(links).find((el) => el.getAttribute('data-link') === 'Main page');
    getMain(link.getAttribute('data-link'));
  }, 1500);
}

export function clearCategory() {
  diffCategory = {};
}

function getDifficultPage() {
  diffCategory = getObjClass();
  hideStatistics();
  if (diffCategory.words.length) {
    fillCards(diffCategory.words, diffCategory);
  } else {
    const message = document.querySelector('.wrapper-message');
    message.classList.add('displayBlock');
    getMainPage();
    clearCategory();
  }
}

export default function getDifficultCategory() {
  return diffCategory;
}

btnDifficultWords.addEventListener('click', getDifficultPage);
