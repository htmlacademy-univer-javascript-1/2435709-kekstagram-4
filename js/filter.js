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


const updateActiveStatus = (element) => {
  const allFilters = document.querySelectorAll('.img-filters__button');

  for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].classList.remove('img-filters__button--active');
  }

  element.classList.add('img-filters__button--active');
};

const onDefaultFilterClick = (evt) => {
  updateActiveStatus(evt.target);

  viewMiniatures(savedObjects);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const onRandomFilterClick = (evt) => {
  updateActiveStatus(evt.target);

  const randomizeObjects = savedObjects.slice(0, savedObjects.length);
  shuffleArray(randomizeObjects);

  viewMiniatures(randomizeObjects.slice(0, RANDOM_COUNT));
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

  updateActiveStatus(evt.target);

  viewMiniatures(sortedObjects);
};

const viewFilter = (objects) => {
  savedObjects = objects;

  const filter = document.querySelector('.img-filters');

  filter.classList.remove('img-filters--inactive');

  const defaultFilterButton = document.querySelector('#filter-default');
  const RandomFilterButton = document.querySelector('#filter-random');
  const discussedFilterButton = document.querySelector('#filter-discussed');

  defaultFilterButton.addEventListener('click', debounce(onDefaultFilterClick, TIMEOUT_DELAY));
  RandomFilterButton.addEventListener('click', debounce(onRandomFilterClick, TIMEOUT_DELAY));
  discussedFilterButton.addEventListener('click', debounce(onDiscussedFilterClick, TIMEOUT_DELAY));
};

export {viewFilter};
