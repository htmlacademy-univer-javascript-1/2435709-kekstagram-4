import {SLIDER_CONST_MAP} from './slider-const.js';
import {setPost} from './api.js';
import {validateStartSimbol, validateCorrectSimbol, validateUniqueValue, validateMaxCountValue} from './validate-functions.js';
import {updateScale} from './image-scale.js';

const DEFAULT_SCALE_SIZE = 100;
const SCALE_STEP_SIZE = 25;
const DEFAULT_EFFECT = 'none';

const form = document.querySelector('.img-upload__form');
const sliderElement = document.querySelector('.effect-level__slider');
const preview = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('.img-upload__submit');
const sliderValueElement = document.querySelector('.effect-level__value');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error-wrapper'
});

const changeEffect = (effectsRadio, slider) => {
  const currentRadio = effectsRadio.value;

  if(currentRadio === DEFAULT_EFFECT) {
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    preview.style.filter = '';
    return;
  }

  document.querySelector('.img-upload__effect-level').classList.remove('hidden');

  const options = SLIDER_CONST_MAP.get(currentRadio);

  slider.noUiSlider.updateOptions(options);

  slider.noUiSlider.on('update', () => {
    const val = slider.noUiSlider.get();
    sliderValueElement.value = val;

    preview.style.filter = `${options.filter}(${val}${options.unit})`;
  });
};

const hiddenSlider = () => {
  preview.style.transform = '';
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
};

const hiddenForm = () => {
  const uploadEditor = document.querySelector('.img-upload__overlay');
  const body = document.querySelector('body');

  uploadEditor.classList.add('hidden');
  body.classList.remove('modal-open');

  hiddenSlider();

  const scaleValueElement = document.querySelector('.scale__control--value');

  scaleValueElement.setAttribute('value', `${DEFAULT_SCALE_SIZE}%`);
  scaleValueElement.textContent = DEFAULT_SCALE_SIZE;

  changeEffect({value: 'none'}, sliderElement);

  pristine.reset();
  form.reset();
};

const onSendSuccess = () => {
  submitButton.disabled = false;
  hiddenForm();
};

const onSendFailed = () => {
  submitButton.disabled = false;
};

const createSlider = () => {
  noUiSlider.create(sliderElement, SLIDER_CONST_MAP.get(DEFAULT_EFFECT));

  hiddenSlider();

  const effectsRadios = document.querySelectorAll('.effects__radio');

  effectsRadios.forEach((radio) => {
    radio.addEventListener('change', () => changeEffect(radio, sliderElement));
  });
};

const updateUploadFile = () => {
  const uploadFile = document.querySelector('#upload-file');
  const effectsPreview = document.querySelectorAll('.effects__preview');

  uploadFile.addEventListener('change', () => {
    preview.src = URL.createObjectURL(uploadFile.files[0]);

    effectsPreview.forEach((image) => {
      image.style.backgroundImage = `url('${URL.createObjectURL(uploadFile.files[0])}')`;
    });
  });
};

const initUploadImg = () => {
  const loadButton = document.querySelector('.img-upload__input');
  const uploadEditor = document.querySelector('.img-upload__overlay');
  const body = document.querySelector('body');
  const cancel = document.querySelector('.img-upload__cancel');

  const scaleSmaller = document.querySelector('.scale__control--smaller');
  const scaleBigger = document.querySelector('.scale__control--bigger');

  const hashtags = document.querySelector('.text__hashtags');
  const comments = document.querySelector('.text__description');


  scaleSmaller.addEventListener('click', () => {
    updateScale(-SCALE_STEP_SIZE);
  });
  scaleBigger.addEventListener('click', () => {
    updateScale(SCALE_STEP_SIZE);
  });

  loadButton.addEventListener('change', () => {
    uploadEditor.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  cancel.addEventListener('click', () => {
    hiddenForm();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      hiddenForm();
    }
  });

  hashtags.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  comments.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  pristine.addValidator(hashtags, validateStartSimbol, 'Хэш-тег начинается с символа # (решётка)');
  pristine.addValidator(hashtags, validateCorrectSimbol, 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
  pristine.addValidator(hashtags, validateUniqueValue, 'Один и тот же хэш-тег не может быть использован дважды');
  pristine.addValidator(hashtags, validateMaxCountValue, 'Нельзя указать больше пяти хэш-тегов');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }

    submitButton.disabled = true;

    setPost(new FormData(evt.target), onSendSuccess, onSendFailed);
  });

  createSlider();
  updateUploadFile();
};

export {initUploadImg};
