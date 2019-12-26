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

function enterFullscreen() {
  const body = document.getElementsByTagName('body')[0];
  const fullScreen = body.webkitRequestFullscreen
    || body.mozRequestFullScreen
    || body.msRequestFullscreen
    || body.requestFullscreen;

  if (fullScreen) {
    fullScreen.call(body);
  } else {
    console.error('no fullscreen available');
  }
}

function exitFullscreen() {
  const body = document.getElementsByTagName('body')[0];
  const smallScreen = body.exitFullscreen
    || body.mozCancelFullScreen
    || body.webkitExitFullscreen
    || body.msExitFullscreen;
  if (smallScreen) {
    smallScreen();
  } else {
    console.error('no fullscreen available');
  }
}

document.addEventListener('keypress', (event) => {
  switch (event.keyCode) {
    /*case 39: // RIGHT_ARROW
      onForward();
      break;
    case 37: // LEFT_ARROW
      onBackward();
      break;*/
    case 38: // UP_ARROW
      enterFullscreen();
      break;
    case 40: // DOWN_ARROW
      exitFullscreen();
      break;
    default:
  }
  // if (event.keyCode === 99) { // what key is this?
  //   if (window.innerWidth === window.screen.width
  //     && window.innerHeight === window.screen.height) {
  //     exitFullscreen();
  //   } else {
  //     enterFullscreen();
  //   }
  // }
});
