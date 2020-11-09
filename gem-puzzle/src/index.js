import './style.css';
import './createHeader';
import './menu';
import getNewGame from './newGame';

const mainDiv = document.createElement('div');
mainDiv.className = 'container';
document.body.append(mainDiv);

getNewGame();
