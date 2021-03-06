import getStatusMenu from './statusMenu';

const time = document.querySelector('.time');
const ids = [];

function addZero(number) {
  if ((`${number}`).length < 2) {
    return `0${number}`;
  }
  return number;
}

export function setCounterTime(counter) {
  const result = [];
  let minutes = Math.floor(counter / 60);
  let seconds = counter % 60;
  minutes = addZero(minutes);
  seconds = addZero(seconds);
  result.push(minutes, seconds);
  return result;
}

function startTime(count) {
  let counter = count;
  const timerId = setInterval(() => {
    const isMenu = getStatusMenu();
    if (!isMenu) {
      counter += 1;
      const [minutes, seconds] = setCounterTime(counter);
      time.textContent = `Время: ${minutes}:${seconds}`;
      localStorage.setItem('saveTimeCounter', counter);
    }
  }, 1000);
  ids.push(timerId);
}

export default function changeTime(isNewGame, count) {
  startTime(count);
  if (isNewGame) {
    clearInterval(ids[0]);
    ids.shift();
  }
}
