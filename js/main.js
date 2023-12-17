import {viewMiniatures} from './miniatures.js';
import {viewBigPicture} from './big-picture.js';
import {COUNT_PHOTO, createPhotoDiscription} from './data.js';

const objects = Array.from({length: COUNT_PHOTO}, createPhotoDiscription());

viewMiniatures(objects);
viewBigPicture(objects);
