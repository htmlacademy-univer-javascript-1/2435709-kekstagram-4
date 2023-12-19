import {showSuccessNotification, showErrorNotification} from './notification.js';

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить форму',
};

const getPosts = (onSuccess) =>
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
      return data;
    })
    .catch(() => {
      showErrorNotification(ErrorText.GET_DATA);
    });

const setPost = (data, onSuccess, onFail) =>
  fetch('https://29.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showSuccessNotification();
      } else {
        onFail();
        showErrorNotification(ErrorText.SEND_DATA);
      }
    })
    .catch(() => showErrorNotification(ErrorText.SEND_DATA));

export {getPosts, setPost};
