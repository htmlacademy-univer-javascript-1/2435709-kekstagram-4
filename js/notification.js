const showSuccessNotification = () => {
  const template = document.querySelector('#success').content;
  const element = template.cloneNode(true);

  const successButton = element.querySelector('.success__button');
  const successElement = element.querySelector('.success');

  const onCloseSuccessNotificationClick = () => {
    closeSuccessNotification();
  };

  const onWindowClick = (evt) => {
    if (!evt.target.closest('div')) {
      closeSuccessNotification();
    }
  };

  const onEscClick = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      closeSuccessNotification();
    }
  };

  function closeSuccessNotification() {
    successButton.removeEventListener('click', onCloseSuccessNotificationClick);
    window.removeEventListener('click', onWindowClick);
    document.addEventListener('keydown', onEscClick);

    successElement.remove();
  }

  successButton.addEventListener('click', onCloseSuccessNotificationClick);
  window.addEventListener('click', onWindowClick);
  document.addEventListener('keydown', onEscClick);

  const docFragment = document.createDocumentFragment();
  docFragment.appendChild(element);
  document.querySelector('body').appendChild(docFragment);
};

const showErrorNotification = (err) => {
  const template = document.querySelector('#error').content;
  const element = template.cloneNode(true);

  const errorButton = element.querySelector('.error__button');
  const errorElement = element.querySelector('.error');

  const errorTitle = element.querySelector('.error__title');
  errorTitle.textContent = err;

  const onCloseErrorNotificationClick = () => {
    closeErrorNotification();
  };

  const onWindowClick = (evt) => {
    if (!evt.target.closest('div')) {
      closeErrorNotification();
    }
  };

  const onEscClick = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      closeErrorNotification();
    }
  };

  function closeErrorNotification() {
    errorButton.removeEventListener('click', onCloseErrorNotificationClick);
    window.removeEventListener('click', onWindowClick);
    document.removeEventListener('keydown', onEscClick, {capture: true});

    errorElement.remove();
  }

  errorButton.addEventListener('click', onCloseErrorNotificationClick);
  window.addEventListener('click', onWindowClick);
  document.addEventListener('keydown', onEscClick, {capture: true});

  const docFragment = document.createDocumentFragment();
  docFragment.appendChild(element);
  document.querySelector('body').appendChild(docFragment);
};

export {showSuccessNotification, showErrorNotification};
