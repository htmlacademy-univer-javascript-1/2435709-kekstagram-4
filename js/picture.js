const PAGE_SIZE = 5;

const socialComment = document.querySelector('.social__comment').cloneNode(true);
const modal = document.querySelector('.big-picture');
const body = document.querySelector('body');
const commentsElement = document.querySelector('.social__comments');

let visibleCount = 0;
let savedObjects = {};

const onCommentsClick = () => {
  visibleCount = viewBatchComments(savedObjects, visibleCount);
  updateCommentStatistics(savedObjects.comments.length);
};

const closeModal = () => {
  body.classList.remove('modal-open');
  modal.classList.add('hidden');
  visibleCount = 0;
  document.querySelector('.comments-loader').removeEventListener('click', onCommentsClick);
};

const viewModal = () => {
  const cancel = document.querySelector('.big-picture__cancel');

  body.classList.add('modal-open');
  modal.classList.remove('hidden');

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  });

  cancel.addEventListener('click', () => {
    closeModal();
  });
};

const viewPicture = (currentObject) => {
  savedObjects = currentObject;

  viewModal();

  const img = document.querySelector('.big-picture__img img');
  img.setAttribute('src', currentObject.url);

  const likes = document.querySelector('.likes-count');
  likes.textContent = currentObject.likes;

  const comments = document.querySelector('.comments-count');
  comments.textContent = currentObject.comments.length;

  const socialCaption = document.querySelector('.social__caption');
  socialCaption.textContent = currentObject.description;

  document.querySelector('.comments-loader').addEventListener('click', onCommentsClick);

  commentsElement.innerHTML = '';

  visibleCount = viewBatchComments(currentObject, 0);
  updateCommentStatistics(currentObject.comments.length);
};

function viewBatchComments(currentObject, startIndex) {
  let visibleBatchCount = startIndex;

  if(startIndex + PAGE_SIZE <= currentObject.comments.length) {
    visibleBatchCount = startIndex + PAGE_SIZE;
  } else {
    visibleBatchCount = currentObject.comments.length;
  }

  const fragment = document.createDocumentFragment();

  for(let j = startIndex; j < visibleBatchCount; j++) {
    const currentCommentElement = socialComment.cloneNode(true);

    const commentImg = currentCommentElement.querySelector('img');
    const socialText = currentCommentElement.querySelector('.social__text');

    commentImg.setAttribute('src', currentObject.comments[j].avatar);
    commentImg.setAttribute('alt', currentObject.comments[j].name);

    socialText.textContent = currentObject.comments[j].message;

    fragment.appendChild(currentCommentElement);
  }

  commentsElement.appendChild(fragment);

  return visibleBatchCount;
}

function updateCommentStatistics(allCount) {
  const commentsLoader = document.querySelector('.comments-loader');
  if(visibleCount >= allCount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentCount = document.querySelector('.social__comment-count');
  commentCount.innerHTML = `${visibleCount} из <span class="comments-count">${allCount}</span> комментариев`;
}

export {viewPicture};
