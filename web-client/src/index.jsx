import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


const itm = document.getElementsByTagName('body')[0];
if (itm.webkitRequestFullscreen) {
  itm.webkitRequestFullscreen();
} else if (itm.mozRequestFullScreen) {
  itm.mozRequestFullScreen();
} else if (itm.msRequestFullscreen) {
  itm.msRequestFullscreen();
} else if (itm.requestFullscreen) {
  itm.requestFullscreen();
} else {
  console.error('no fullscreen available');
}
