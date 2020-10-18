let navScreen = document.querySelector('.nav-screen');
let navScreenMenu = document.querySelector('.nav-screen-menu');
let backgroundScreenMenu = document.querySelector('.background-screen-menu');
let linksPage = document.querySelectorAll('.link-screen-nav');
let isNavScreen = false;

function addClassesMenu() {
    backgroundScreenMenu.style.display = 'block';
    document.body.classList.add('body-hidden');
    setTimeout(() => navScreenMenu.classList.add('slide-out-menu'), 0);
    navScreen.classList.add('nav-screen-rotate');
}

function removeClassesMenu() {
    navScreenMenu.classList.remove('slide-out-menu');
    navScreen.classList.remove('nav-screen-rotate');

    setTimeout(() => {
        backgroundScreenMenu.style.display = 'none';
        document.body.classList.remove('body-hidden');
    }, 1000);
}

function navMenu() {
    if (window.innerWidth < 768 && !isNavScreen) {
        isNavScreen = true;
        addClassesMenu();
    } else if (isNavScreen) {
        isNavScreen = false;
        removeClassesMenu();
    }
}

function hideMenu(e) {
    if (window.innerWidth > 767 || isNavScreen && e.target === backgroundScreenMenu) {
        isNavScreen = false;
        removeClassesMenu();
    }
}

navScreen.addEventListener('click', navMenu);
backgroundScreenMenu.addEventListener('click', hideMenu);
window.addEventListener("resize", hideMenu);