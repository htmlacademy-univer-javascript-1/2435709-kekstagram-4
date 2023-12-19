import {viewMiniatures} from './miniatures.js';
import {getPosts} from './api.js';
import {viewFilter} from './filter.js';
import { initUploadImg } from './upload-image.js';

getPosts(viewMiniatures).then((objects) => viewFilter(objects));

initUploadImg();
