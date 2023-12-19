import {viewPicture} from './picture.js';

const removePicture = () => {
  const allPictures = document.querySelectorAll('.picture');
  allPictures.forEach((picture) => {
    picture.remove();
  });
};

const viewMiniatures = (objects) => {
  removePicture();

  const onPictureClick = (evt) => {
    const pictureImage = evt.target.closest('.picture')?.querySelector('.picture__img');

    if(pictureImage !== undefined && pictureImage !== null) {
      const currentObject = objects.find((item) => item.id === parseInt(pictureImage.id, 10));

      viewPicture(currentObject);
    }
  };

  const pictures = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  pictures.removeEventListener('click', onPictureClick);

  const docFragment = document.createDocumentFragment();

  objects.map((object) => {
    const element = template.cloneNode(true);

    const imageElement = element.querySelector('.picture__img');

    imageElement.setAttribute('src', object.url);
    imageElement.setAttribute('alt', object.description);
    imageElement.setAttribute('id', object.id);

    const likes = element.querySelector('.picture__likes');
    likes.textContent = object.likes;

    const comments = element.querySelector('.picture__comments');
    comments.textContent = object.comments.length;

    docFragment.appendChild(element);
  });

  pictures.appendChild(docFragment);

  pictures.addEventListener('click', onPictureClick);
};

export {viewMiniatures};
