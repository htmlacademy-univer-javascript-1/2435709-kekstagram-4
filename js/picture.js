import {viewModal} from './modal.js';

const socialComment = document.querySelector('.social__comment').cloneNode(true);

const viewPicture = (currentObject) => {
  viewModal();

  const img = document.querySelector('.big-picture__img img');
  img.setAttribute('src', currentObject.url);

  const likes = document.querySelector('.likes-count');
  likes.textContent = currentObject.likes;

  const comments = document.querySelector('.comments-count');
  comments.textContent = currentObject.comments.length;

  let visibleCount = 0;

  document.querySelector('.comments-loader').addEventListener('click', () => {
    visibleCount = showBatchComments(currentObject, visibleCount);
    updateCommentStatistics(visibleCount, currentObject.comments.length);
  });

  const commentsElement = document.querySelector('.social__comments');

  commentsElement.innerHTML = '';
  visibleCount = showBatchComments(currentObject, 0);
  updateCommentStatistics(visibleCount, currentObject.comments.length);
};

function showBatchComments(currentObject, startIndex) {
  const pageSize = 5;
  let visibleCount = startIndex;

  if(startIndex + pageSize <= currentObject.comments.length) {
    visibleCount = startIndex + pageSize;
  } else {
    visibleCount = currentObject.comments.length;
  }

  const fragment = document.createDocumentFragment();

  for(let j = startIndex; j < visibleCount; j++) {
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

  return visibleCount;
}

function updateCommentStatistics(visibleCount, allCount) {
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
