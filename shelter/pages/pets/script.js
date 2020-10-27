const petsNames = document.querySelectorAll('.pet-name');
const petsImages = document.querySelectorAll('.image-pet');
const btnLearnMore = document.querySelectorAll('.button-pet');
const containerPopup = document.querySelector('.container-popup');
const buttonPopup = document.querySelector('.button-popup');
const popup = document.querySelector('.popup');
const sections = document.querySelectorAll('.section');
const paginatorLeftBegin = document.querySelector('.paginator-left-begin');
const paginatorLeft = document.querySelector('.paginator-left');
const paginatorNumber = document.querySelector('.paginator-number');
const paginatorRight = document.querySelector('.paginator-right');
const paginatorRightEnd = document.querySelector('.paginator-right-end');
const imagePaginatorRight = document.querySelector('.image-paginator-right');
const imagePaginatorRightEnd = document.querySelector('.image-paginator-right-end');
const imagePaginatorLeft = document.querySelector('.image-paginator-left');
const imagePaginatorLeftBegin = document.querySelector('.image-paginator-left-begin');
const noScrollWidth = document.body.clientWidth;
let isPagination = false;
let isPopup = false;
let isActiveLeft = false;
let isActiveRight = true;
let pets = [];
let indexPet = 0;
let arrPets = [];
let arrBuf = [];
let pagePagination = 1;

function getArrPets() {
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

async function getPets() {
    const url = `../../styles/pets.json`;
    const result = await fetch(url);
    pets = await result.json();
    getArrPets();
    fillCardsPets();
}

function randomPet() {
    indexPet = Math.floor(Math.random() * pets.length);
}

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

function fillCardsPets(count = 0) {
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
    setTimeout(() =>
    containerPopup.classList.add('animation-popup')
    , 0);
    containerPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    for (let section of sections) {
        section.style.paddingRight = document.body.clientWidth - noScrollWidth + 'px';
    }

    fillPopup(index);
}

function leftPage() {
    if(!isPagination) {
        if (pagePagination === 2) {
            isActiveLeft = false;
            pagePagination--;
            paginatorNumber.textContent = pagePagination;
            fillLeftPaginationInactive();
            fillCardsPets(getCountPag());
            setTimeout(() => isPagination = false, 900);
        } else {
            if (!isActiveRight) {
                isActiveRight = true;
                fillRightPaginationActive();
            }

            if (isActiveLeft) {
                pagePagination--;
                paginatorNumber.textContent = pagePagination;
                fillCardsPets(getCountPag());
                setTimeout(() => isPagination = false, 900);
            }

            if (window.innerWidth > 1279 && pagePagination === 1) {
                isActiveLeft = false;
                fillLeftPaginationInactive();
            }
        }
    }
}

function rightPage() {
    if(!isPagination) {
        isPagination = true;
        if (!isActiveLeft) {
            isActiveLeft = true;
            fillLeftPaginationActive();
        }
        if (isActiveRight) {
            pagePagination++;
            paginatorNumber.textContent = pagePagination;
            fillCardsPets(getCountPag());
        }
        if (window.innerWidth > 1279 && pagePagination === 6) {
            isActiveRight = false;
            fillRightPaginationInactive();
        } else if (window.innerWidth > 767 && window.innerWidth < 1280 && pagePagination === 8) {
            isActiveRight = false;
            fillRightPaginationInactive();
        } else if (window.innerWidth < 768 && pagePagination === 16) {
            isActiveRight = false;
            fillRightPaginationInactive();
        }
        setTimeout(() => isPagination = false, 900);
    }
}


function fillRightPaginationActive() {
    imagePaginatorRight.setAttribute('src', '../../assets/icons/chevron-active.svg');
    imagePaginatorRight.style.transform = '';
    imagePaginatorRightEnd.setAttribute('src', '../../assets/icons/chevron-two-active.svg');
    imagePaginatorRightEnd.style.transform = '';
    paginatorRight.setAttribute('class', 'button-paginator');
    paginatorRightEnd.setAttribute('class', 'button-paginator');
}

function fillLeftPaginationActive() {
    imagePaginatorLeft.setAttribute('src', '../../assets/icons/chevron-active.svg');
    imagePaginatorLeft.style.transform = 'rotate(180deg)';
    imagePaginatorLeftBegin.setAttribute('src', '../../assets/icons/chevron-two-active.svg');
    imagePaginatorLeftBegin.style.transform = 'rotate(180deg)';
    paginatorLeft.setAttribute('class', 'button-paginator');
    paginatorLeftBegin.setAttribute('class', 'button-paginator');
}

function fillLeftPaginationInactive() {
    imagePaginatorLeft.setAttribute('src', '../../assets/icons/chevron.svg');
    imagePaginatorLeft.style.transform = '';
    imagePaginatorLeftBegin.setAttribute('src', '../../assets/icons/chevron-two.svg');
    imagePaginatorLeftBegin.style.transform = '';
    paginatorLeft.setAttribute('class', 'button_paginator_inactive');
    paginatorLeftBegin.setAttribute('class', 'button_paginator_inactive');
}

function fillRightPaginationInactive() {
    imagePaginatorRight.setAttribute('src', '../../assets/icons/chevron.svg');
    imagePaginatorRight.style.transform = 'rotate(180deg)';
    imagePaginatorRightEnd.setAttribute('src', '../../assets/icons/chevron-two.svg');
    imagePaginatorRightEnd.style.transform = 'rotate(180deg)';
    paginatorRight.setAttribute('class', 'button_paginator_inactive');
    paginatorRightEnd.setAttribute('class', 'button_paginator_inactive');
}

function getCountPag() {
    if (window.innerWidth > 1279) {
        return (pagePagination - 1) * 8;
    } else if (window.innerWidth > 767 && window.innerWidth < 1280) {
        return (pagePagination - 1) * 6;
    } else {
        return (pagePagination - 1) * 3;
    }
}

function resizeChange() {
        if (!isActiveRight) {
            getLastPage();
        } else {
            getFirstPage();
        }
}

function getFirstPage() {
    if(!isPagination) {
        if (!isActiveRight) {
            isActiveRight = true;
            fillRightPaginationActive();
        }

        isActiveLeft = false;
        isActiveRight = true;
        pagePagination = 1;
        paginatorNumber.textContent = pagePagination;
        fillCardsPets();
        fillLeftPaginationInactive();
        fillRightPaginationActive();
        setTimeout(() => isPagination = false, 900);
    }
}

function getEndPage() {
    if (window.innerWidth > 1279) {
        return 6;
    } else if (window.innerWidth > 767 && window.innerWidth < 1280) {
        return 8;
    } else {
        return 16;
    }
}

function getLastPage() {
    if(!isPagination) {
        if (!isActiveLeft) {
            isActiveLeft = true;
            fillLeftPaginationActive();
        }

        isActiveRight = false;
        pagePagination = getEndPage();
        paginatorNumber.textContent = pagePagination;
        fillCardsPets(getCountPag());
        fillRightPaginationInactive();
        setTimeout(() => isPagination = false, 900);
    }
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

buttonPopup.addEventListener('click', hidePopup);
containerPopup.addEventListener('click', hidePopup);
popup.addEventListener('click', hidePopup);
paginatorLeft.addEventListener('click', leftPage);
paginatorRight.addEventListener('click', rightPage);
window.addEventListener('resize', resizeChange);
paginatorLeftBegin.addEventListener('click', getFirstPage);
paginatorRightEnd.addEventListener('click', getLastPage);
containerPopup.addEventListener('mouseover', hover);
containerPopup.addEventListener('mouseout', noHover);
popup.addEventListener('mouseover', hover);
popup.addEventListener('mouseout', noHover);
getPets();