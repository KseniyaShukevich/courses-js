let btnMakeFriend = document.querySelector('.button-screen');
let knowRest = document.querySelector('.button-pets');

function pagePets() {
    window.location.href = '../pets/index.html';
}

btnMakeFriend.addEventListener('click', pagePets);
knowRest.addEventListener('click', pagePets);