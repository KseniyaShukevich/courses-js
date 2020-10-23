let btnMakeFriend = document.querySelector('.button-screen');
let knowRest = document.querySelector('.button-pets');
let petsNames = document.querySelectorAll('.pet-name');
let petsImages = document.querySelectorAll('.image-pet');
let arrowLeft = document.querySelector('.slider-pets-arrow-left');
let arrowRight = document.querySelector('.slider-pets-arrow-right');
let btnLearnMore = document.querySelectorAll('.button-pet');
let containerPopup = document.querySelector('.container-popup');
let buttonPopup = document.querySelector('.button-popup');
let popup = document.querySelector('.popup');
let sections = document.querySelectorAll('.section');
let isPopup = false;
let noScrollWidth = document.body.clientWidth;
let pets = [];
let arrPets = [];
let count = 0;
let indexPet = 0;

function pagePets() {
    window.location.href = '../pets/index.html';
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
    let cardPet = document.querySelectorAll('.card-pet');
    for (let i = 0; i < petsNames.length; i++) {
        let computedStyle = getComputedStyle(cardPet[i]);
        if (computedStyle.display !== 'none') {
            petsNames[i].textContent = pets[arrPets[count]].name;
            petsImages[i].setAttribute('src', pets[arrPets[count]].img);
            count++;
        }
    }
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
        containerPopup.style.display = '';
        document.body.style.overflow = '';

        for (let section of sections) {
            section.style.paddingRight = '';
        }
    }
}

for (let i = 0; i < btnLearnMore.length; i++) {
    btn = btnLearnMore[i];

    btn.addEventListener('click', () => getPopup(i));
}

btnMakeFriend.addEventListener('click', pagePets);
knowRest.addEventListener('click', pagePets);
arrowLeft.addEventListener('click', getPets);
arrowRight.addEventListener('click', getPets);
buttonPopup.addEventListener('click', hidePopup);
containerPopup.addEventListener('click', hidePopup);
popup.addEventListener('click', hidePopup);
window.addEventListener('resize', resizeChange);
getPets();