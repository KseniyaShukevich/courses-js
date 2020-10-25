const navScreen = document.querySelector('.nav-screen');
const navScreenMenu = document.querySelector('.nav-screen-menu');
const backgroundScreenMenu = document.querySelector('.background-screen-menu');
const linksPage = document.querySelectorAll('.link-screen-nav');
const titleScreen = document.querySelector('.title-screen');
const subtitleScreen = document.querySelector('.subtitle-screen');
const burgerMenu = document.querySelectorAll('.burger-menu');
let isNavScreen = false;

function addClassesMenu() {
    backgroundScreenMenu.style.display = 'block';
    document.body.classList.add('body-hidden');
    setTimeout(() => navScreenMenu.classList.add('slide-out-menu'), 0);
    navScreen.classList.add('nav-screen-rotate');
    for (let div of burgerMenu) {
        div.classList.add('animation-burger-menu');
    }
}

function removeClassesMenu() {
    navScreenMenu.classList.remove('slide-out-menu');
    navScreen.classList.remove('nav-screen-rotate');
    navScreen.classList.remove('animation-burger-menu');
    for (let div of burgerMenu) {
        div.classList.remove('animation-burger-menu');
    }

    setTimeout(() => {
        backgroundScreenMenu.style.display = 'none';
        document.body.classList.remove('body-hidden');
    }, 1000);
}

function navMenu() {
    if (window.innerWidth < 768 && !isNavScreen) {
        isNavScreen = true;
        addClassesMenu();
        addClassForLogo();
    } else if (isNavScreen) {
        isNavScreen = false;
        removeClassesMenu();
        removeClassForLogo();
    }
}

function hideMenu(e) {
    if (window.innerWidth > 767 || isNavScreen && e.target === backgroundScreenMenu) {
        isNavScreen = false;
        removeClassesMenu();
        removeClassForLogo();
    }
}

function addClassForLogo() {
    titleScreen.classList.add('animation-logo-title');
    subtitleScreen.classList.add('animation-logo-subtitle');
}

function removeClassForLogo() {
    titleScreen.classList.remove('animation-logo-title');
    subtitleScreen.classList.remove('animation-logo-subtitle');
}

navScreen.addEventListener('click', navMenu);
backgroundScreenMenu.addEventListener('click', hideMenu);
window.addEventListener("resize", hideMenu);