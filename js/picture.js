function viewPicture(currentObject) {
  const img = document.querySelector('.big-picture__img img');
  img.setAttribute('src', currentObject.url);

  const likes = document.querySelector('.likes-count');
  likes.textContent = currentObject.likes;

  const comments = document.querySelector('.comments-count');
  comments.textContent = currentObject.comments.length;
}

export {viewPicture};
