import {viewMiniatures} from './miniatures.js';

const TIMEOUT_DELAY = 500;
const RANDOM_COUNT = 10;

let savedObjects = [];

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const updateActiveStatus = (element) => {
  const activeElement = document.querySelector('.img-filters__button--active');
  activeElement.classList.remove('img-filters__button--active');

  element.classList.add('img-filters__button--active');
};

const setDebounce = debounce(viewMiniatures, TIMEOUT_DELAY);

const viewFilterResult = (target, objects) => {
  updateActiveStatus(target);
  setDebounce(objects);
};

const onDefaultFilterClick = (evt) => {
  viewFilterResult(evt.target, savedObjects);
};

const onRandomFilterClick = (evt) => {
  const randomizeObjects = savedObjects.slice(0, savedObjects.length);
  shuffleArray(randomizeObjects);

  viewFilterResult(evt.target, randomizeObjects.slice(0, RANDOM_COUNT));
};

const onDiscussedFilterClick = (evt) => {
  const sortedObjects = savedObjects.slice(0, savedObjects.length);

  sortedObjects.sort((a, b) => {
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    if (a.comments.length > b.comments.length) {
      return -1;
    }

    return 0;
  });

  viewFilterResult(evt.target, sortedObjects);
};

const viewFilter = (objects) => {
  savedObjects = objects;

  const filter = document.querySelector('.img-filters');
  const defaultFilterButton = document.querySelector('#filter-default');
  const RandomFilterButton = document.querySelector('#filter-random');
  const discussedFilterButton = document.querySelector('#filter-discussed');

  if(savedObjects !== undefined && savedObjects.length > 0) {
    filter.classList.remove('img-filters--inactive');
  }

  defaultFilterButton.addEventListener('click', (env) => onDefaultFilterClick(env));
  RandomFilterButton.addEventListener('click', (env) => onRandomFilterClick(env));
  discussedFilterButton.addEventListener('click', (env) => onDiscussedFilterClick(env));
};

export {viewFilter};
