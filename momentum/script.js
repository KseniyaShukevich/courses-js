let backgroundCounter = 0;

const btnQuote = document.querySelector('.btnQuote');
const quotes = document.querySelector('.quotes');
const btnImage = document.querySelector('.btnImage');
const time = document.querySelector('.time');
const dateClass = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
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
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showDateAndTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBgGreet() {
  let currentDate = new Date();
  let hour = currentDate.getHours();
  let nextDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDay(),
    currentDate.getHours() + 1
  );
  let intervalDate = nextDate - currentDate;

  const base = 'assets/images/';
  const nightImage = 'night/';
  const morningImage = 'morning/';
  const dayImage = 'day/';
  const eveningImage = 'evening/'

  const index = backgroundCounter % images.length;

  if (hour < 6) {
    document.body.style.backgroundImage =
      `url('${base}${nightImage}${images[index]}')`;
      greeting.textContent = 'Спокойной ночи, ';
      document.body.style.color = 'white';
  } else if (hour < 12) {
    document.body.style.backgroundImage =
      `url('${base}${morningImage}${images[index]}')`;
      greeting.textContent = 'Доброе утро, ';
  } else if (hour < 18) {
    document.body.style.backgroundImage =
      `url('${base}${dayImage}${images[index]}')`;
      greeting.textContent = 'Добрый день, ';
  } else {
    document.body.style.backgroundImage =
      `url('${base}${eveningImage}${images[index]}')`;
      greeting.textContent = 'Добрый вечер, ';
      document.body.style.color = 'white';
  }

  backgroundCounter++;

  setTimeout(setBgGreet, intervalDate);
}

function getImage() {
  setBgGreet();
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
      localStorage.setItem('name', e.target.innerText);
      name.blur();
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
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
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

document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.addEventListener('click', getQuote)
btnImage.addEventListener('click', getImage);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showDateAndTime();
setBgGreet();
getName();
getFocus();