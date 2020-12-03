const burgerMenuContainer = document.querySelector('.burger-menu-container');
const darkLayer = document.querySelector('.dark-layer');
const navMenu = document.querySelector('.nav-menu');
const sections = document.querySelectorAll('.section');
const menuLinks = document.querySelectorAll('.menu-link');
let isMenu = false;
let isAnimationCompleted = true;

function activeMainPageLink() {
  const linkMainPage = Array.from(menuLinks).find((link) => link.textContent === 'Main page');
  linkMainPage.classList.add('active-link');
}

activeMainPageLink();

function toggleClassesBurger() {
  const topBurgerMenu = document.querySelector('.top-burger-menu');
  const centerBurgerMenu = document.querySelector('.center-burger-menu');
  const bottomBurgerMenu = document.querySelector('.bottom-burger-menu');
  topBurgerMenu.classList.toggle('rotate45');
  centerBurgerMenu.classList.toggle('rotate45');
  bottomBurgerMenu.classList.toggle('rotate-45');
}

function setTimeoutGetMenu() {
  setTimeout(() => {
    navMenu.classList.add('marginLeftZero');
    toggleClassesBurger();
  }, 0);
  setTimeout(() => { isMenu = true; isAnimationCompleted = true; }, 300);
}

function getMenu() {
  if (isAnimationCompleted) {
    isAnimationCompleted = false;
    const widthWithScroll = document.body.offsetWidth;
    document.body.classList.add('overflow');
    const widthNoScroll = document.body.offsetWidth;
    darkLayer.classList.add('displayBlock');
    for (let i = 0; i < sections.length; i += 1) {
      sections[i].style.paddingRight = `${widthNoScroll - widthWithScroll}px`;
    }
    setTimeoutGetMenu();
  }
}

function setTimeoutHideMenu() {
  setTimeout(() => {
    document.body.classList.remove('overflow');
    darkLayer.classList.remove('displayBlock');
    for (let i = 0; i < sections.length; i += 1) {
      sections[i].style.paddingRight = '';
      isMenu = false;
      isAnimationCompleted = true;
    }
  }, 300);
}

function hideMenu() {
  if (isAnimationCompleted) {
    isAnimationCompleted = false;
    navMenu.classList.remove('marginLeftZero');
    toggleClassesBurger();
    setTimeoutHideMenu();
  }
}

function changeStatusMenu() {
  if (!isMenu) {
    getMenu();
  } else {
    hideMenu();
  }
}

function hideMenuForDarkLayer(e) {
  if (e.target === darkLayer) {
    hideMenu();
  }
}

menuLinks.forEach((link) => {
  link.addEventListener('pointerup', hideMenu);
});

burgerMenuContainer.addEventListener('pointerup', changeStatusMenu);
darkLayer.addEventListener('pointerup', hideMenuForDarkLayer);
