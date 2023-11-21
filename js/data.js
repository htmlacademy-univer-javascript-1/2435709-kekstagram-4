import { getRandomInteger } from './util.js';

const COUNT_PHOTO = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const AUTHORS = ['Женек', 'Никита', 'Аня', 'Ника', 'Нонна'];

function createPhotoDiscription() {
  let photoID = 0;
  return function() {
    photoID++;
    return {
      id: photoID,
      url: `photos/${photoID}.jpg`,
      description: `Самая классная картинка на свете №${photoID}`,
      likes: getRandomInteger(15,200),
      comments: Array.from({length: getRandomInteger(0,30)}, createComment())
    };
  };
}
function createComment() {
  let commentID = 0;
  return function() {
    commentID++;
    return {
      id: commentID,
      avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
      message: MESSAGES[getRandomInteger(0,MESSAGES.length - 1)],
      name: AUTHORS[getRandomInteger(0,AUTHORS.length - 1)]
    };
  };
}

export {COUNT_PHOTO, createPhotoDiscription};
