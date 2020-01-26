import ReactDOMServer from 'react-dom/server';
import importJsx from 'import-jsx';
import React from 'react';
import fetch from 'node-fetch';
import btoa from 'btoa';

const ReactComp = importJsx('./client/src/Components/OceanProfile/rcomp.jsx');
//const OceanProfile = importJsx('./client/src/Components/OceanProfile/OceanProfile2.jsx');
const OceanProfile = importJsx('./client/public/OceanProfile.jsx');

import UserModel from './user-model';
import User from './shared/user';

import dotEnv from 'dotenv';

const lookupUser = async (uid) => {

  if (!uid) throw Error('Invalid arg', uid);
  const { route, auth, cid, mode } = doConfig();

  const endpoint = route + uid;
  try {
    console.log('[GET] ' + mode + '.lookup: ' + endpoint);
    let response = await fetch(endpoint, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
    })
    return assignJsonResp(new User(), await response.json());
  }
  catch (e) {
    console.error(e);
    throw e;
  }
}

function renderReactComp(comp) {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ' +
    '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
  const head = '<html><head></head><body>';
  const tail = '</body></html>';
  return doctype + head + ReactDOMServer.renderToStaticMarkup(comp) + tail;
}

(async () => {
  let user = await lookupUser('888888888888888888888888');
  console.log('Loaded user #' + user._id+'\n', JSON.stringify(user));//, typeof OceanProfile,typeof OceanProfile.default);

  let comp = React.createElement(OceanProfile.default, { subject: user });
  console.log('Loaded component...');
  let stat = renderReactComp(comp);
  console.log(stat);
})();


// let user = UserModel.findById('888888888888888888888888');
// //console.log(user);
//
// UserModel.findById('888888888888888888888888', (err, user) => {
//   console.log('got here1', err, user);
// });
//
// (async () => {
//   await UserModel.findById('888888888888888888888888', (err, user) => {
//     console.log('got here2', err, user);
//   });
// })();

const fetchUser = async (uid) => {
  await UserModel.findById(uid, (err, user) => {
    if (err) throw err;
    console.log(user);
  });
};

function assignJsonResp(user, json) {
  if (json.status !== 200) throw Error(JSON.stringify(json));
  Object.assign(user, json.data);
  return user;
}

function doConfig() {

  // get auth from .env or heroku configs
  dotEnv.config();

  const port = 8083;
  const env = process.env;
  const path = '/api/users/';
  const host = 'localhost'
  const mode = env.NODE_ENV !== 'production' ? 'DEV' : 'PROD';

  // use https if we're in production mode
  const proto = env.NODE_ENV !== 'production' ? 'http' : 'https';

  if (!env.API_USER || !env.API_SECRET) {
    console.error('Running client without authentication; Server/DB'
      + ' will not be avaiable. Are you missing a .env file ? ');
  }

  // Here we construct server host from window.location,
  // assuming server/db is on the same host as the web-app)
  const route = proto + '://' + host + ':' + port + path;

  //const host = env.REACT_APP_API_HOST || 'http://localhost:8083';
  const auth = env.API_USER + ':' + env.API_SECRET;

  if (!auth || !auth.length) console.error("Auth required!");

  //console.log('UserSession.route: '+route);
  return { auth: auth, route: route, mode: mode };
}
//fetchUser('888888888888888888888888');
//
// let uid = '888888888888888888888888';
// console.log('pre');
// async function message() {
//   console.log('go');
//   await UserModel.findById(uid, (err, user) => {
//     console.log('got here1');
//     if (err)throw err;
//     console.log('got here2');
//     console.log('user',user);
//     let props = {};
//     //console.log(OceanProfile.default);
//     let comp = React.createElement(OceanProfile.default, { target: user });
//     console.log(comp);
//     let stat = ReactDOMServer.renderToStaticMarkup(comp);
//     console.log(stat);
//   });
//   console.log('post1');
// };
// message();
// console.log('post2');
// console.log(ReactComp(props));
// let html = ReactDOMServer.renderToStaticMarkup(
//   React.createElement(ReactComp, { target: {}})
// );
// console.log(html);
