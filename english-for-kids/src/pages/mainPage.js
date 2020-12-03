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
  cardsCategories.forEach((card) => card.addEventListener('pointerup', createCardsOfWords));
}

function getMainPage(e) {
  const link = e.currentTarget.getAttribute('data-link');
  if (link === 'Main page') {
    removeCards();
    fillCardsCategories();
    changeStatusLinks(link);
    addEventForCards();
    if (!getIsStatusTrain()) {
      changeStylesCardsBackground();
    }
  }
}

menuLinks.forEach((link) => link.addEventListener('pointerup', getMainPage));
createCategoriesClasses();
fillCardsCategories();
