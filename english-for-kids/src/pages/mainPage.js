import cards from '../cards/dataCards';
import createCard from '../cards/createCard';
import Category from '../cards/classCategory';
import Word from '../cards/classWord';

const wrapper = document.querySelector('.wrapper');
const arrayCategories = [];

function createWordsClasses(indexOfCategory, indexOfWord) {
  const word = new Word(
    cards[indexOfCategory + 1][indexOfWord].word,
    cards[indexOfCategory + 1][indexOfWord].translation,
    cards[indexOfCategory + 1][indexOfWord].image,
    cards[indexOfCategory + 1][indexOfWord].audioSrc,
  );
  word.createAudioElement();
  return word;
}

(function createCategoriesClasses() {
  for (let i = 0; i < cards[0].length; i += 1) {
    const indexOfWord = 7;
    const category = new Category(cards[0][i], cards[i + 1][indexOfWord].image);
    for (let j = 0; j < cards[1].length; j += 1) {
      category.addWord(createWordsClasses(i, j));
    }
    arrayCategories.push(category);
  }
}());

(function fillCardsCategories() {
  for (let i = 0; i < arrayCategories.length; i += 1) {
    wrapper.append(createCard(arrayCategories[i].name, arrayCategories[i].image));
  }
}());

// function audio() {
//   arrayCategories[0].words[0].getAudio();
// }
