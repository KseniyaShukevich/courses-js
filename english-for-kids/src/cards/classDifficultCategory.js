export default class DifficultCategory {
  constructor() {
    this.name = 'Difficult words';
    this.words = [];
  }

  addWord(word) {
    this.words.push(word);
  }
}
