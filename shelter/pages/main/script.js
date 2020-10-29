const btnMakeFriend = document.querySelector('.button-screen');
const knowRest = document.querySelector('.button-pets');
const petsNames = document.querySelectorAll('.pet-name');
const petsImages = document.querySelectorAll('.image-pet');
const arrowLeft = document.querySelector('.slider-pets-arrow-left');
const arrowRight = document.querySelector('.slider-pets-arrow-right');
const btnLearnMore = document.querySelectorAll('.button-pet');
const containerPopup = document.querySelector('.container-popup');
const buttonPopup = document.querySelector('.button-popup');
const popup = document.querySelector('.popup');
const sections = document.querySelectorAll('.section');
const noScrollWidth = document.body.clientWidth;
let isLeft = false;
let isPagination = false;
let pets = [];
let arrPets = [];
let count = 0;
let indexPet = 0;

function addAnimationSlider() {
    let cardPet = document.querySelectorAll('.card-pet');
        for (let card of cardPet) {
            card.classList.add('animation-card-pet');
            card.classList.add('opacity-card-pet');
        }
}

function removeAnimationSlider() {
    let cardPet = document.querySelectorAll('.card-pet');
        for (let card of cardPet) {
            card.classList.remove('animation-card-pet');
            card.classList.remove('opacity-card-pet');
        }
}

function pressPagination() {
    if(!isPagination) {
        isPagination = true;
        fillCardsPets();
        setTimeout(() => isPagination = false, 900);
    }
}

function pagePets() {
    window.location.href = '../pets/';
}

async function getPets() {
    const url = `../../styles/pets.json`;

    const result = await fetch(url);
    pets = await result.json();

    getArrPets();
    fillCardsPets();
}

function getArrPets() {
    let arrBuf = [];

    for (let i = 0; i < 48; i++) {
        randomPet();
        if (arrBuf.indexOf(indexPet) === -1) {
            arrBuf.push(indexPet);
            arrPets.push(indexPet);
        } else {
            i--;
        }

        if (arrBuf.length % 8 === 0) {
            arrBuf = arrBuf.slice(4, 9);
        }
    }
}

function randomPet() {
    indexPet = Math.floor(Math.random() * pets.length);
}

function fillCardsPets() {
    removeAnimationSlider();
    let cardPet = document.querySelectorAll('.card-pet');
    for (let i = 0; i < petsNames.length; i++) {
        let computedStyle = getComputedStyle(cardPet[i]);
        if (computedStyle.display !== 'none') {
            petsNames[i].textContent = pets[arrPets[count]].name;
            petsImages[i].setAttribute('src', pets[arrPets[count]].img);
            count++;
        }
    }
    if(count >= arrPets.length) {
        count = 0;
    }
    addAnimationSlider();
}

function getInformationResult(point) {
    let result = '';
    for (let j = 0; j < point.length; j++) {
        if (j === point.length - 1) {
            result += point[j];
        } else {
            result += point[j] + ', ';
        }
    }
    return result;
}

function resizeChange () {
    fillCardsPets();
}

function fillPopup(index) {
    let imagePetPopup = document.querySelector('.image-pet-popup');
    let petNamePopup = document.querySelector('.pet-name-popup');
    let breedPopup = document.querySelector('.breed-popup');
    let descriptionPopup = document.querySelector('.description-popup');
    let age = document.getElementById('age')
    let inoculations = document.getElementById('inoculations');
    let diseases = document.getElementById('diseases');
    let parasites = document.getElementById('parasites');

    for (let i = 0; i < pets.length; i++) {
        if (petsNames[index].textContent === pets[i].name) {
            imagePetPopup.setAttribute('src', pets[i].img);
            petNamePopup.textContent = pets[i].name;
            breedPopup.textContent = pets[i].type + ' - ' + pets[i].breed;
            descriptionPopup.textContent = pets[i].description;
            age.textContent = pets[i].age;
            inoculations.textContent = getInformationResult(pets[i].inoculations);
            diseases.textContent = getInformationResult(pets[i].diseases);
            parasites.textContent = getInformationResult(pets[i].parasites);
        }
    }
}

function getPopup(index) {
    isPopup = true;
    let coords = document.body.getBoundingClientRect();
    setTimeout(() =>
        containerPopup.classList.add('animation-popup')
    , 0);
    containerPopup.style.top = Math.abs(coords.top) + 'px';
    containerPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    for (let section of sections) {
        section.style.paddingRight = document.body.clientWidth - noScrollWidth + 'px';
    }

    fillPopup(index);
}

function hidePopup(e) {
    if ( (e.target === buttonPopup || e.target === containerPopup || e.target === popup || e.currentTarget === buttonPopup) && isPopup) {
        isPopup = false;
        containerPopup.classList.remove('animation-popup');
        setTimeout(() => {
            containerPopup.style.display = '';
            document.body.style.overflow = '';
            for (let section of sections) {
                section.style.paddingRight = '';
            }
        }, 1000);
    }
}

function hover(e) {
    if (e.target === containerPopup || e.target === popup) {
        buttonPopup.style.backgroundColor = ' #fddcc4';
        buttonPopup.style.borderColor = ' #fddcc4';
    }
}

function noHover() {
    buttonPopup.style.backgroundColor = '';
    buttonPopup.style.borderColor = '';
}

let cardPet = document.querySelectorAll('.card-pet');

for (let i = 0; i < cardPet.length; i++) {
    card = cardPet[i];
    card.addEventListener('click', () => getPopup(i));
}

btnMakeFriend.addEventListener('click', pagePets);
knowRest.addEventListener('click', pagePets);
arrowLeft.addEventListener('click', pressPagination);
arrowRight.addEventListener('click', pressPagination);
buttonPopup.addEventListener('click', hidePopup);
containerPopup.addEventListener('click', hidePopup);
popup.addEventListener('click', hidePopup);
window.addEventListener('resize', resizeChange);
containerPopup.addEventListener('mouseover', hover);
containerPopup.addEventListener('mouseout', noHover);
popup.addEventListener('mouseover', hover);
popup.addEventListener('mouseout', noHover);
getPets();
alert('Если появляется скролл, посмотри, пожалуйста, видео: https://youtu.be/GhscCq3urg8');