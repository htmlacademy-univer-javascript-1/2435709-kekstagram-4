import {SLIDER_CONST} from './slider-const.js';

function initUploadImg() {
  const loadButton = document.querySelector('.img-upload__input');
  const uploadEditor = document.querySelector('.img-upload__overlay');
  const body = document.querySelector('body');
  const cancel = document.querySelector('.img-upload__cancel');
  const form = document.querySelector('.img-upload__form');

  const scaleSmaller = document.querySelector('.scale__control--smaller');
  const scaleBigger = document.querySelector('.scale__control--bigger');

  scaleSmaller.addEventListener('click', () => {
    updateScale(-25);
  });
  scaleBigger.addEventListener('click', () => {
    updateScale(25);
  });

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

  const sliderElement = document.querySelector('.effect-level__slider');

  noUiSlider.create(sliderElement, {
    range: {min: 10, max: 50},
    start: 10,
  });

  hiddenSlider();

  const effectsRadios = document.querySelectorAll('.effects__radio');
  const preview = document.querySelector('.img-upload__preview');

  for(let i = 0; i < effectsRadios.length; i++) {
    effectsRadios[i].addEventListener('change', () => {
      const currentRadio = effectsRadios[i].value;

      if(currentRadio === 'none') {
        document.querySelector('.img-upload__effect-level').classList.add('hidden');
        preview.style.filter = '';
        return;
      }

      document.querySelector('.img-upload__effect-level').classList.remove('hidden');

      const options = SLIDER_CONST.get(currentRadio);

      sliderElement.noUiSlider.updateOptions(options);

      const sliderValueElement = document.querySelector('.effect-level__value');

      sliderElement.noUiSlider.on('update', () => {
        const val = parseFloat(sliderElement.noUiSlider.get());

        sliderValueElement.setAttribute('value', `${val}%`);
        sliderValueElement.textContent = val;

        preview.style.filter = `${options.filter}(${val}${options.unit})`;
      });
    });
  }
}

function updateScale(scaleSize) {
  const scaleValueElement = document.querySelector('.scale__control--value');

  let currentValue = parseInt(scaleValueElement.textContent, 10);

  if(scaleValueElement.textContent === '') {
    currentValue = 100;
  }

  currentValue = currentValue + scaleSize;

  if(currentValue < 25 || currentValue > 100) {
    return;
  }

  scaleValueElement.setAttribute('value', `${currentValue}%`);
  scaleValueElement.textContent = currentValue;

  const preview = document.querySelector('.img-upload__preview');

  preview.style.transform = `scale(${currentValue / 100})`;
}

function hiddenSlider() {
  const preview = document.querySelector('.img-upload__preview');
  preview.style.transform = '';
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
}

export {initUploadImg};
