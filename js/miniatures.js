import {generateObjects} from './utils.js';

function viewMiniatures() {
  const pictures = document.querySelector('.pictures');

  const docFragment = document.createDocumentFragment();

  const template = document.querySelector('#picture').content;

  const datas = generateObjects();

  for (let i = 0; i < datas.length; i++) {
    const element = template.cloneNode(true);

    const img = element.querySelector('.picture__img');

    img.setAttribute('src', datas[i].url);
    img.setAttribute('alt', datas[i].description);

    const likes = element.querySelector('.picture__likes');
    likes.textContent = datas[i].likes;

    const comments = element.querySelector('.picture__comments');
    comments.textContent = datas[i].comments.length;

    docFragment.appendChild(element);
  }

  pictures.appendChild(docFragment);
}

export {viewMiniatures};
