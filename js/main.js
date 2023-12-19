import {viewMiniatures} from './miniatures.js';
import {getPosts} from './api.js';
import {viewFilter} from './filter.js';

getPosts(viewMiniatures)
  .then((objects) => viewFilter(objects));
