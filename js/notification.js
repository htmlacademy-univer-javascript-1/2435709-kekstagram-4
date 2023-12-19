const showSuccessNotification = () => {
  const template = document.querySelector('#success').content;
  const element = template.cloneNode(true);

  const successButton = element.querySelector('.success__button');
  const successElement = element.querySelector('.success');

  const onCloseSuccessNotification = () => {
    successButton.removeEventListener('click', onCloseSuccessNotification);
    successElement.removeEventListener('click', onCloseSuccessNotification);

    successElement.remove();
  };

  successButton.addEventListener('click', onCloseSuccessNotification);
  successElement.addEventListener('click', onCloseSuccessNotification);

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

  const onCloseErrorNotification = () => {
    errorButton.removeEventListener('click', onCloseErrorNotification);
    errorElement.removeEventListener('click', onCloseErrorNotification);

    errorElement.remove();
  };

  errorButton.addEventListener('click', onCloseErrorNotification);
  errorElement.addEventListener('click', onCloseErrorNotification);

  const docFragment = document.createDocumentFragment();
  docFragment.appendChild(element);
  document.querySelector('body').appendChild(docFragment);
};

export {showSuccessNotification, showErrorNotification};
