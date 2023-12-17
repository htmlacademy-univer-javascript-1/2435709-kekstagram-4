function viewBigPicture(objects) {
  const bigPictures = document.querySelectorAll('.picture');
  const modal = document.querySelector('.big-picture');
  const cancel = document.querySelector('.big-picture__cancel');

  const socialComment = document.querySelector('.social__comment').cloneNode(true);

  const commentsElement = document.querySelector('.social__comments');

  let currentObject = {};

  const body = document.querySelector('body');

  let endIndex = 0;

  for(let i = 0; i < 25; i++) {
    bigPictures[i].addEventListener('click', () => {
      modal.classList.remove('hidden');

      currentObject = objects[i];

      showPicture(modal, currentObject);

      commentsElement.innerHTML = '';

      endIndex = showBatchComments(currentObject, 0, socialComment);

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

  document.querySelector('.comments-loader').addEventListener('click', () => {
    endIndex = showBatchComments(currentObject, endIndex, socialComment);
  });
}

function showBatchComments(currentObject, startIndex, socialComment) {
  const pageSize = 5;
  let endIndex = startIndex;

  if(startIndex + pageSize <= currentObject.comments.length) {
    endIndex = startIndex + pageSize;
  } else {
    endIndex = currentObject.comments.length;
  }

  const fragment = document.createDocumentFragment();

  for(let j = startIndex; j < endIndex; j++) {
    const currentCommentElement = socialComment.cloneNode(true);

    const commentImg = currentCommentElement.querySelector('img');
    commentImg.setAttribute('src', currentObject.comments[j].avatar);
    commentImg.setAttribute('alt', currentObject.comments[j].name);

    const socialText = currentCommentElement.querySelector('.social__text');
    socialText.textContent = currentObject.comments[j].message;

    fragment.appendChild(currentCommentElement);
  }

  const commentsElement = document.querySelector('.social__comments');
  commentsElement.appendChild(fragment);

  const commentsLoader = document.querySelector('.comments-loader');
  if(endIndex >= currentObject.comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentCount = document.querySelector('.social__comment-count');
  commentCount.innerHTML = `${endIndex} из <span class="comments-count">${currentObject.comments.length}</span> комментариев`;

  return endIndex;
}

function showPicture(modal, currentObject) {
  const img = modal.querySelector('.big-picture__img img');
  img.setAttribute('src', currentObject.url);

  const likes = modal.querySelector('.likes-count');
  likes.textContent = currentObject.likes;

  const comments = modal.querySelector('.comments-count');
  comments.textContent = currentObject.comments.length;
}

export {viewBigPicture};
