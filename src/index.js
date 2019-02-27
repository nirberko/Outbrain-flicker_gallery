import {init} from './vDOM';

import './index.scss';

import Thumbnails from './components/Thumbnails';

init(document.getElementById('app'))(Thumbnails.getNode());