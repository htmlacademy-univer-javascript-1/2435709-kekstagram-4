function viewMiniatures(objects) {
  const pictures = document.querySelector('.pictures');

  const docFragment = document.createDocumentFragment();

  const template = document.querySelector('#picture').content;

  for (let i = 0; i < objects.length; i++) {
    const element = template.cloneNode(true);

    const img = element.querySelector('.picture__img');
    img.setAttribute('src', objects[i].url);
    img.setAttribute('alt', objects[i].description);

    const likes = element.querySelector('.picture__likes');
    likes.textContent = objects[i].likes;

    const comments = element.querySelector('.picture__comments');
    comments.textContent = objects[i].comments.length;

    docFragment.appendChild(element);
  }
  pictures.appendChild(docFragment);
}
export {viewMiniatures};
