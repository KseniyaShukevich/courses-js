import sound from './assets/sound/button6.wav';

const soundSetting = document.querySelector('.sound-setting');
let soundElement = {};

function createSound() {
  soundElement = document.createElement('audio');
  soundElement.src = sound;
}

function getSound() {
  soundElement.currentTime = 0;
  soundElement.play();
}

function setSound() {
  const elements = document.querySelectorAll('.element');
  elements.forEach((item) => {
    item.addEventListener('click', getSound);
  });
}

export default function addEventsSound() {
  createSound();
  if (!localStorage.getItem('saveSoundGame')) {
    localStorage.setItem('saveSoundGame', '1');
    setSound();
  } else {
    const savedSoundSetting = +localStorage.getItem('saveSoundGame');
    if (savedSoundSetting === 1) {
      setSound();
    }
  }
}

function getValueSound() {
  const value = soundSetting.getAttribute('checked');
  const elements = document.querySelectorAll('.element');
  if (value) {
    soundSetting.removeAttribute('checked');
    localStorage.setItem('saveSoundGame', '0');
    elements.forEach((item) => {
      item.removeEventListener('click', getSound);
    });
  } else {
    soundSetting.setAttribute('checked', 'checked');
    localStorage.setItem('saveSoundGame', '1');
    elements.forEach((item) => {
      item.addEventListener('click', getSound);
    });
  }
}

soundSetting.addEventListener('click', getValueSound);
