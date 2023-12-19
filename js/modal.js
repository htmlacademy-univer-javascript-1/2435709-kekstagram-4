const showSuccessNotification = () => {
  const template = document.querySelector('#success').content;
  const element = template.cloneNode(true);

  const successButton = element.querySelector('.success__button');
  const successElement = element.querySelector('.success');

  const onCloseSuccessNotificationClick = () => {
    successButton.removeEventListener('click', onCloseSuccessNotificationClick);
    successElement.removeEventListener('click', onCloseSuccessNotificationClick);

    successElement.remove();
  };

  successButton.addEventListener('click', onCloseSuccessNotificationClick);
  successElement.addEventListener('click', onCloseSuccessNotificationClick);

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
    errorButton.removeEventListener('click', onCloseErrorNotificationClick);
    errorElement.removeEventListener('click', onCloseErrorNotificationClick);

    errorElement.remove();
  };

  errorButton.addEventListener('click', onCloseErrorNotificationClick);
  errorElement.addEventListener('click', onCloseErrorNotificationClick);

  const docFragment = document.createDocumentFragment();
  docFragment.appendChild(element);
  document.querySelector('body').appendChild(docFragment);
};

export {showSuccessNotification, showErrorNotification};
