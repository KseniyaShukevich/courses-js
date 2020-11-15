import createNodeHeader from './logicMenu';

const containerHeader = document.createElement('div');
containerHeader.className = 'container-header';

containerHeader.append(createNodeHeader('content time', 'Время: 00:00'));
containerHeader.append(createNodeHeader('content moves', 'Шагов: 0'));
containerHeader.append(createNodeHeader('content btn-pause', 'Пауза'));

document.body.append(containerHeader);
