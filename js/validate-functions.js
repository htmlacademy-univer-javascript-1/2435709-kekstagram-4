const START_SIMBOL = '#';
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COUNT_TAGS = 5;

const validateStartSimbol = (values) => {
  const tags = values.trim().split(' ');

  for(let i = 0; i < tags.length; i++) {
    if(tags[i] !== '' && tags[i][0] !== START_SIMBOL) {
      return false;
    }
  }

  return true;
};

const validateCorrectSimbol = (values) => {
  const tags = values.trim().split(' ');

  for(let i = 0; i < tags.length; i++) {
    if(tags[i] !== '' && HASHTAG_REGEXP.test(tags[i]) === false) {
      return false;
    }
  }

  return true;
};

const validateUniqueValue = (values) => {
  const tags = values.trim().split(' ');

  const set = new Set(tags);

  return set.size === tags.length;
};

const validateMaxCountValue = (values) => {
  const tags = values.trim().split(' ');

  return tags.length <= MAX_COUNT_TAGS;
};

export {validateStartSimbol, validateCorrectSimbol, validateUniqueValue, validateMaxCountValue};
