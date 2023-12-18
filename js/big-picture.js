import {viewPicture} from './picture.js';

function viewBigPicture(objects) {
  const bigPictures = document.querySelectorAll('.picture');
  const socialComment = document.querySelector('.social__comment').cloneNode(true);
  const commentsElement = document.querySelector('.social__comments');

  let currentObject = {};
  let visibleCount = 0;

  for (let i = 0; i < 25; i++) {
    bigPictures[i].addEventListener('click', () => {
      commentsElement.innerHTML = '';
      currentObject = objects[i];
      const allCount = currentObject.comments.length;

      viewPicture(currentObject);

      visibleCount = showBatchComments(currentObject, 0, socialComment);
      updateCommentStatistics(visibleCount, allCount);
    });
  }

  document.querySelector('.comments-loader').addEventListener('click', () => {
    visibleCount = showBatchComments(currentObject, visibleCount, socialComment);
    const allCount = currentObject.comments.length;
    updateCommentStatistics(visibleCount, allCount);
  });
}

function showBatchComments(currentObject, startIndex, socialComment) {
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

export {viewBigPicture};

