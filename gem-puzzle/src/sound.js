import sound from './assets/sound/button6.wav';

let soundElement = {};

function createSound() {
  soundElement = document.createElement('audio');
  soundElement.src = sound;
}

function getSound() {
  soundElement.currentTime = 0;
  soundElement.play();
}

export default function addEventsSound() {
  createSound();
  const elements = document.querySelectorAll('.element');
  elements.forEach((item) => {
    item.addEventListener('click', getSound);
  });
}
