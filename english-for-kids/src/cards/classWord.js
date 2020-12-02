export default class Word {
  constructor(word, translation, image, audio) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audio = audio;
    this.elementAudio = false;
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
