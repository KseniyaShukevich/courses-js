import createCard from '../cards/createCard';
import removeCards from './logicPages';
import createCategoriesClasses, { getArrayCategories } from './createObjectCategory';
import changeStatusLinks from '../menu/statusLinks';
import createCardsOfWords from './createCardsWords';
import getIsStatusTrain, { changeStylesCardsBackground } from '../status/status';

const wrapper = document.querySelector('.wrapper');
const menuLinks = document.querySelectorAll('.menu-link');

function fillCardsCategories() {
  const arrayCategories = getArrayCategories();
  for (let i = 0; i < arrayCategories.length; i += 1) {
    wrapper.append(createCard(arrayCategories[i].name, arrayCategories[i].image));
  }
}

function addEventForCards() {
  const cardsCategories = document.querySelectorAll('.card');
  cardsCategories.forEach((card) => card.addEventListener('click', createCardsOfWords));
}

function removeButtonStartGame() {
  const containerButton = document.querySelector('.button-start-game');
  const containerStars = document.querySelector('.container-stars');
  if (containerButton.classList.contains('height-button')) {
    containerStars.classList.remove('height-stars');
    containerButton.classList.remove('height-button');
  }
}

export default function getMain(link) {
  removeCards();
  fillCardsCategories();
  changeStatusLinks(link);
  addEventForCards();
  removeButtonStartGame();
  if (!getIsStatusTrain()) {
    changeStylesCardsBackground();
  }
}

function getMainPage(e) {
  const link = e.currentTarget.getAttribute('data-link');
  if (link === 'Main page') {
    getMain(link);
  }
}

menuLinks.forEach((link) => link.addEventListener('click', getMainPage));
createCategoriesClasses();
fillCardsCategories();
