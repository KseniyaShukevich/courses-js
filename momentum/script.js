let isGetImage = false;
let arrImages = [];
let fullArrImages = [];
let hourNow = 0;
let counter = 0;
const preload = document.getElementById('preload');
const city = document.querySelector('.city');
const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const btnQuote = document.querySelector('.btnQuote');
const quotes = document.querySelector('.quotes');
const btnImage = document.querySelector('.btnImage');
const time = document.querySelector('.time');
const dateClass = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const base = 'assets/images/';
const nightImage = 'night/';
const morningImage = 'morning/';
const dayImage = 'day/';
const eveningImage = 'evening/'
const images =
    [
      '01.jpg',
      '02.jpg',
      '03.jpg',
      '04.jpg',
      '05.jpg',
      '06.jpg',
      '07.jpg',
      '08.jpg',
      '09.jpg',
      '10.jpg',
      '11.jpg',
      '12.jpg',
      '13.jpg',
      '14.jpg',
      '15.jpg',
      '16.jpg',
      '17.jpg',
      '18.jpg',
      '19.jpg',
      '20.jpg',
    ]

function showDateAndTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let month = today.getMonth();
  let date = today.getDate();
  let day = today.getDay();

  const months =
    [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ];

  const days =
    [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота'
    ];

  dateClass.innerHTML = `${days[day]}<span>, </span>${date}<span> </span>${months[month]}`;
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showDateAndTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 20);
}

function getArrImages() {
  let buff = [];
  for (let i = 0; i < 6; i++) {
    let rNumber = getRandomNumber();
    if (buff.indexOf(rNumber) === -1) {
      arrImages.push(rNumber);
      buff.push(rNumber);
    } else {
      i--;
    }
  }
}

function setBgGreet() {
  let currentDate = new Date();
  let hour = currentDate.getHours();
  hourNow = currentDate.getHours();
  counter = hourNow;
  let nextDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    currentDate.getHours() + 1
  );
  let intervalDate = nextDate - currentDate;

  if (hour < 6) {
    document.body.style.backgroundImage =
      `url('${base}${nightImage}${images[arrImages[hour]]}')`;
      greeting.textContent = 'Спокойной ночи, ';
  } else if (hour < 12) {
    document.body.style.backgroundImage =
      `url('${base}${morningImage}${images[arrImages[hour - 6]]}')`;
      greeting.textContent = 'Доброе утро, ';
  } else if (hour < 18) {
    document.body.style.backgroundImage =
      `url('${base}${dayImage}${images[arrImages[hour - 12]]}')`;
      greeting.textContent = 'Добрый день, ';
  } else {
    document.body.style.backgroundImage =
      `url('${base}${eveningImage}${images[arrImages[hour - 18]]}')`;
      greeting.textContent = 'Добрый вечер, ';
  }

  setTimeout(setBgGreet, intervalDate);
}

function getFullImages() {
  let day = [
    nightImage,
    morningImage,
    dayImage,
    eveningImage
];

  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 6; j++) {
      fullArrImages.push(`${day[i]}${images[arrImages[j]]}`);
    }
  }
}

function getImage() {
  if (!isGetImage) {
    isGetImage = true;
    counter++;

    if (counter > 23) {
      counter = 0;
    }

    const img = document.createElement('img');
    const src = `${base}${fullArrImages[counter]}`
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
      document.body.ontransitionend = () => isGetImage = false;
    };
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Введи имя]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText.trim().length === 0) {
        getName();
        name.blur();
        return;
      } else {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Введи цель]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText.trim().length === 0) {
        getFocus();
        focus.blur();
        return;
      } else {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;

  const result = await fetch(url);
  const quote = await result.json();
  quotes.textContent = quote.quoteText + ' ' + quote.quoteAuthor;
}

async function getWeather() {
  let currentDate = new Date();
  let nextDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    currentDate.getHours() + 1
  );
  let intervalDate = nextDate - currentDate;

  if (localStorage.getItem('city') === null) {
    city.textContent = 'Минск';
  } else {
    city.textContent = localStorage.getItem('city');
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=0dce59e930c83fce2edcad7a94b09256&units=metric`;
  try {
    const result = await fetch(url);
    const data = await result.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weather.textContent = `${data.main.temp}°C, влажность: ${data.main.humidity}%, скорость ветра: ${data.wind.speed} м/c`;
  } catch(error) {
    alert('Ошибка при загрузке прогноза погоды. Возможно, вы неправильно ввели название города');
  }
  setTimeout(getWeather, intervalDate);
 }

function setCity(event) {
  if (event.code === 'Enter') {
    if (event.target.innerText.trim().length === 0) {
      getWeather();
      city.blur();
      return;
    }
    localStorage.setItem('city', event.target.innerText);
    getWeather();
    city.blur();
  }
}

function clear(elem) {
  elem.textContent = '';
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', getWeather);
city.addEventListener('focus', () => clear(city));
document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote)
btnImage.addEventListener('click', getImage);
name.addEventListener('keypress', setName);
name.addEventListener('focus', () => clear(name));
name.addEventListener('blur', getName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('focus', () => clear(focus));
focus.addEventListener('blur', getFocus);

getArrImages();

showDateAndTime();
setBgGreet();
getName();
getFocus();
getWeather();
getFullImages();