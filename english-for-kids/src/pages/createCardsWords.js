import changeStatusLinks from '../menu/statusLinks';
import { setWords, fillCards } from './logicPages';

export default function createCardsOfWords(e) {
  const cards = document.querySelectorAll('.card');
  setWords(e, 'data-name');
  cards.forEach((el) => el.remove());
  fillCards();
  changeStatusLinks(e.currentTarget.getAttribute('data-name'));
}
