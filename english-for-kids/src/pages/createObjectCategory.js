import cards from '../cards/dataCards';
import Category from '../cards/classCategory';
import Word from '../cards/classWord';

const arrayCategories = [];

function createWordsClasses(indexOfCategory, indexOfWord, category) {
  const word = new Word(
    cards[indexOfCategory + 1][indexOfWord].word,
    cards[indexOfCategory + 1][indexOfWord].translation,
    cards[indexOfCategory + 1][indexOfWord].image,
    cards[indexOfCategory + 1][indexOfWord].audioSrc,
    category,
  );
  word.createAudioElement();
  return word;
}

export default function createCategoriesClasses() {
  for (let i = 0; i < cards[0].length; i += 1) {
    const indexOfWord = 7;
    const category = new Category(cards[0][i], cards[i + 1][indexOfWord].image);
    for (let j = 0; j < cards[1].length; j += 1) {
      category.addWord(createWordsClasses(i, j, category.name));
    }
    arrayCategories.push(category);
  }
}

export function getArrayCategories() {
  return arrayCategories;
}
