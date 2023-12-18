function initUploadImg() {
  const loadButton = document.querySelector('.img-upload__input');
  const uploadEditor = document.querySelector('.img-upload__overlay');
  const body = document.querySelector('body');
  const cancel = document.querySelector('.img-upload__cancel');
  const form = document.querySelector('.img-upload__form');

  loadButton.addEventListener('change', () => {
    uploadEditor.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  cancel.addEventListener('click', () => {
    uploadEditor.classList.add('hidden');
    body.classList.remove('modal-open');
    form.reset();
  });

  const hashtags = document.querySelector('.text__hashtags');

  hashtags.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  const comments = document.querySelector('.text__description');
  comments.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper-error-wrapper'
  });

  function validateStartSimbol (value) {
    const tags = value.trim().split(' ');

    for(let i = 0; i < tags.length; i++) {
      if(tags[i] !== '' && tags[i][0] !== '#') {
        return false;
      }
    }

    return true;
  }

  function validateCorrectSimbol (value) {
    const tags = value.trim().split(' ');

    const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

    for(let i = 0; i < tags.length; i++) {
      if(tags[i] !== '' && hashtag.test(tags[i]) === false) {
        return false;
      }
    }

    return true;
  }

  function validateUniqueValue (value) {
    const tags = value.trim().split(' ');

    const set = new Set(tags);

    return set.size === tags.length;
  }

  function validateMaxCountValue (value) {
    const tags = value.trim().split(' ');

    return tags.length <= 5;
  }

  pristine.addValidator(hashtags, validateStartSimbol, 'Хэш-тег начинается с символа # (решётка)');
  pristine.addValidator(hashtags, validateCorrectSimbol, 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
  pristine.addValidator(hashtags, validateUniqueValue, 'Один и тот же хэш-тег не может быть использован дважды');
  pristine.addValidator(hashtags, validateMaxCountValue, 'Нельзя указать больше пяти хэш-тегов');

  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
}

export {initUploadImg};
