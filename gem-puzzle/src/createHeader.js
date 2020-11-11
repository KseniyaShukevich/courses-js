import createNodeHeader from './logicMenu';

const containerHeader = document.createElement('div');
containerHeader.className = 'container-header';

containerHeader.append(createNodeHeader('content time', 'Время'));
containerHeader.append(createNodeHeader('content moves', 'Шагов: 0'));
containerHeader.append(createNodeHeader('content btn-pause', 'Стоп'));

document.body.append(containerHeader);
