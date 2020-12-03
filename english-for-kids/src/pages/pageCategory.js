import changeStatusLinks from '../menu/statusLinks';
import removeCards, { fillCards, setWords } from './logicPages';
import { getArrayCategories } from './createObjectCategory';
import createCardsOfWords from './createCardsWords';

const cards = document.querySelectorAll('.card');
const menuLinks = document.querySelectorAll('.menu-link');

function getPageCategory(e) {
  const categories = getArrayCategories();
  const namesCategories = categories.map((el) => el.name);
  if (namesCategories.includes(e.currentTarget.getAttribute('data-link'))) {
    setWords(e, 'data-link');
    removeCards();
    fillCards();
    changeStatusLinks(e.currentTarget.getAttribute('data-link'));
  }
}

cards.forEach((card) => card.addEventListener('pointerup', createCardsOfWords));
menuLinks.forEach((link) => link.addEventListener('pointerup', getPageCategory));
