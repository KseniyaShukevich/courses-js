let btnMakeFriend = document.querySelector('.button-screen');
let knowRest = document.querySelector('.button-pets');
let petsNames = document.querySelectorAll('.pet-name');
let petsImages = document.querySelectorAll('.image-pet');
let arrowLeft = document.querySelector('.slider-pets-arrow-left');
let arrowRight = document.querySelector('.slider-pets-arrow-right');
let pets = [];
let indexPet = 0;

function pagePets() {
    window.location.href = '../pets/index.html';
}

async function getPets() {
    const url = `../../styles/pets.json`;

    const result = await fetch(url);
    pets = await result.json();

    fillCardsPets();
}

function randomPet() {
    indexPet = Math.floor(Math.random() * pets.length);
}

function fillCardsPets() {
    for (let i = 0; i < petsNames.length; i++) {
        randomPet();
        petsNames[i].textContent = pets[indexPet].name;
        petsImages[i].setAttribute('src', pets[indexPet].img);
    }
}

btnMakeFriend.addEventListener('click', pagePets);
knowRest.addEventListener('click', pagePets);
arrowLeft.addEventListener('click', getPets);
arrowRight.addEventListener('click', getPets);
getPets();