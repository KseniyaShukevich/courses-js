import cards from '../cards/dataCards';
import createCard from '../cards/createCard';
// import cry from '../assets/img/cry.jpg';

const wrapper = document.querySelector('.wrapper');

for (let i = 0; i < cards[0].length; i += 1) {
  wrapper.append(createCard(cards[0][i], cards[1][0].image));
  // console.log(cards[i + 1][0].image);
}

console.log(cards[0][0]);
console.log(cards[1]);
