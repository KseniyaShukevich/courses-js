class Game {
  constructor() {
    this.correct = './audio/correct.mp3';
    this.err = './audio/error.mp3';
    this.success = './audio/success.mp3';
    this.fail = './audio/failure.mp3';
    this.corrImage = './img/success.jpg';
    this.failImage = './img/failure.jpg';
    this.corrStar = './img/starWin.svg';
    this.errStar = './img/star.svg';
    this.imgCorrStar = 0;
    this.imgErrStar = 0;
    this.elAudioCorr = 0;
    this.elAudError = 0;
    this.elAudSuccess = 0;
    this.elAudFail = 0;
    this.image = 0;
    this.text = 0;
  }

  init() {
    this.createAudioElCorr();
    this.createAudioElError();
    this.createAudioElSuccess();
    this.createAudioElFail();
    this.createImage();
    this.createTextFailure();
  }

  createAudioElCorr() {
    this.elAudioCorr = document.createElement('audio');
    this.elAudioCorr.src = this.correct;
  }

  getAudioCorr() {
    this.elAudioCorr.currentTime = 0;
    this.elAudioCorr.play();
  }

  createAudioElError() {
    this.elAudError = document.createElement('audio');
    this.elAudError.src = this.err;
  }

  getAudioError() {
    this.elAudError.currentTime = 0;
    this.elAudError.play();
  }

  createAudioElSuccess() {
    this.elAudSuccess = document.createElement('audio');
    this.elAudSuccess.src = this.success;
  }

  getAudioSuccess() {
    this.elAudSuccess.currentTime = 0;
    this.elAudSuccess.play();
  }

  createAudioElFail() {
    this.elAudFail = document.createElement('audio');
    this.elAudFail.src = this.fail;
  }

  getAudioFail() {
    this.elAudFail.currentTime = 0;
    this.elAudFail.play();
  }

  createImage() {
    this.image = document.createElement('img');
    this.image.classList.add('image-end-game');
  }

  getImageSuccess() {
    this.image.src = this.corrImage;
    return this.image;
  }

  getImageFailure() {
    this.image.src = this.failImage;
    return this.image;
  }

  createTextFailure() {
    this.text = document.createElement('div');
    this.text.classList.add('text-end-game');
  }

  getTextFailure(err) {
    this.text.textContent = `${err} errors`;
    return this.text;
  }

  getImgCorrStar() {
    this.imgCorrStar = document.createElement('img');
    this.imgCorrStar.src = this.corrStar;
    this.imgCorrStar.classList.add('star');
    return this.imgCorrStar;
  }

  getImgErrStar() {
    this.imgErrStar = document.createElement('img');
    this.imgErrStar.src = this.errStar;
    this.imgErrStar.classList.add('star');
    return this.imgErrStar;
  }
}

const game = new Game();
game.init();

export default function getObjGame() {
  return game;
}
