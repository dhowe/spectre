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

function goFull() {
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

function exitFull() {
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

goFull();

document.addEventListener('keypress', (event) => {
  if (event.keyCode === 99) {
    if (window.innerWidth === window.screen.width && window.innerHeight === window.screen.height) {
      exitFull();
    } else {
      goFull();
    }
  }
});
