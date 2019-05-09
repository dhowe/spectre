import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Login from './Login';
import Game from './Game';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Game/>, document.getElementById('root'));

serviceWorker.unregister();
