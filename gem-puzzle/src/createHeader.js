import createNodeHeader from './logicMenu';

const containerHeader = document.createElement('div');
containerHeader.className = 'container-header';

containerHeader.append(createNodeHeader('content time', 'Время'));
containerHeader.append(createNodeHeader('content moves', 'Шагов'));
containerHeader.append(createNodeHeader('content btnPause', 'Стоп'));

document.body.append(containerHeader);
