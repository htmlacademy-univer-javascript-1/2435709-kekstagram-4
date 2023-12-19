const viewModal = () => {
  const modal = document.querySelector('.big-picture');
  const body = document.querySelector('body');
  const cancel = document.querySelector('.big-picture__cancel');

  modal.classList.remove('hidden');
  body.classList.add('modal-open');

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
};

export {viewModal};
