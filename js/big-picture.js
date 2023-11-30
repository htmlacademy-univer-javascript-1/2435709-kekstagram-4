function viewBigPicture(objects) {
  const bigPictures = document.querySelectorAll('.picture');
  const modal = document.querySelector('.big-picture');
  const cancel = document.querySelector('.big-picture__cancel');

  const oneCommentElement = document.querySelector('.social__comment');

  const fragment = document.createDocumentFragment();

  const commentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');

  const body = document.querySelector('body');

  for(let i = 0; i < 25; i++) {
    bigPictures[i].addEventListener('click', () => {
      modal.classList.remove('hidden');

      const currentObject = objects[i];

      const img = modal.querySelector('.big-picture__img img');
      img.setAttribute('src', currentObject.url);

      const likes = modal.querySelector('.likes-count');
      likes.textContent = currentObject.likes;

      const comments = modal.querySelector('.comments-count');
      comments.textContent = currentObject.comments.length;

      for(let j = 0; j < currentObject.comments.length; j++) {
        const currentCommentElement = oneCommentElement.cloneNode(true);

        const commentImg = currentCommentElement.querySelector('img');
        commentImg.setAttribute('src', currentObject.comments[j].avatar);
        commentImg.setAttribute('alt', currentObject.comments[j].name);

        const socialText = currentCommentElement.querySelector('.social__text');
        socialText.textContent = currentObject.comments[j].message;

        fragment.appendChild(currentCommentElement);
      }

      const commentsElement = document.querySelector('.social__comments');
      commentsElement.innerHTML = '';

      commentsElement.appendChild(fragment);

      commentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');

      body.classList.add('modal-open');
    });
  }

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      body.classList.remove('modal-open');

      modal.classList.add('hidden');
    }
  });

  cancel.addEventListener('click', () => {
    body.classList.remove('modal-open');

    modal.classList.add('hidden');
  });
}

export {viewBigPicture};
