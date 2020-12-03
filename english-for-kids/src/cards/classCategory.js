export default class Category {
  constructor(name, image) {
    this.name = name;
    this.image = image;
    this.words = [];
  }

  addWord(word) {
    this.words.push(word);
  }
}
