import a from './assets/images/1.jpg';
import b from './assets/images/2.jpg';
import c from './assets/images/3.jpg';
import d from './assets/images/4.jpg';
import e from './assets/images/5.jpg';
import f from './assets/images/6.jpg';
import g from './assets/images/7.jpg';
import h from './assets/images/8.jpg';
import i from './assets/images/9.jpg';
import j from './assets/images/10.jpg';
import k from './assets/images/11.jpg';
import l from './assets/images/12.jpg';
import m from './assets/images/13.jpg';
import n from './assets/images/14.jpg';
import z from './assets/images/15.jpg';
import y from './assets/images/16.jpg';
import u from './assets/images/17.jpg';
import v from './assets/images/18.jpg';
import w from './assets/images/19.jpg';
import q from './assets/images/20.jpg';
import getSize from './settings';

const images = [
  a, b, c, d, e, f, g, h, i, j,
  l, m, n, z, y, u, v, w, q, k];
let image = 1;

function getRandomNumber(max) {
  const rand = Math.random() * max;
  return Math.floor(rand);
}

export default function inputImage() {
  const size = getSize();
  const elements = document.querySelectorAll('.element');
  const arraySaveGame = localStorage.getItem('arraySaveGame');
  if (!arraySaveGame || arraySaveGame === 'null') {
    image = getRandomNumber(images.length);
    localStorage.setItem('imageSaveGame', image);
  } else {
    image = localStorage.getItem('imageSaveGame');
  }
  elements.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.style.backgroundImage = `url(${images[image]})`;
    const left = `${((+element.textContent - 1) % size) * (100 / size)}`;
    const top = `${Math.floor((+element.textContent - 1) / size) * (100 / size)}`;
    // eslint-disable-next-line no-param-reassign
    element.style.backgroundPosition = `${left}% ${top}%`;
  });
}

export function getImageIndex() {
  return image;
}
