export default class Word {
  constructor(word, translation, image, audio, category) {
    this.word = word;
    this.translation = translation;
    this.category = category;
    this.image = image;
    this.audio = audio;
    this.elementAudio = 0;
    this.countErrors = 0;
    this.trainClicks = 0;
  }

  createAudioElement() {
    this.elementAudio = document.createElement('audio');
    this.elementAudio.src = this.audio;
  }

  getAudio() {
    this.elementAudio.currentTime = 0;
    this.elementAudio.play();
  }
}
