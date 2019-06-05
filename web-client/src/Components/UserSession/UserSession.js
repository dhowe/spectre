//import fs from 'fs';
import React from 'react';
import User from '../User/user';
import DotEnv from 'dotenv';
import FormData from 'form-data';

let UserSession = React.createContext(new User());

let UserSesdata =
UserSession.defaultUsers = function (onSuccess, onError) {
  fetch('/gusers.json').then(res => res.json())
    .then(data => {
      if (!onSuccess) throw Error('Callback required');
      onSuccess(data);
    }).catch(e => {
      console.error('UserSession.defaultUsers failed', e);
      if (onError) onError(e);
    });
}

const cachedFetch = (url, options) => {
  // Use the URL as the cache key to sessionStorage
  let cacheKey = url

  // START new cache HIT code
  let cached = sessionStorage.getItem(cacheKey)
  if (cached !== null) {
    // it was in sessionStorage! Yay!
    let response = new Response(new Blob([cached]))
    return Promise.resolve(response)
  }
  // END new cache HIT code

  return fetch(url, options).then(response => {
    // let's only store in cache if the content-type is
    // JSON or something non-binary
    if (response.status === 200) {
      let ct = response.headers.get('Content-Type')
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        // There is a .json() instead of .text() but
        // we're going to store it in sessionStorage as
        // string anyway.
        // If we don't clone the response, it will be
        // consumed by the time it's returned. This
        // way we're being un-intrusive.
        response.clone().text().then(content => {
          sessionStorage.setItem(cacheKey, content)
        })
      }
    }
    return response
  })
}

let doConfig = () => {

  // get auth from .env or heroku configs
  DotEnv.config();

  const env = process.env;
  const route = '/api/users/';
  const cid = env.REACT_APP_CLIENT_ID || -1;
  const host = env.REACT_APP_API_HOST || 'http://localhost:8083';
  const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;

  if (!auth || !auth.length) console.error("Auth required!");

  return { auth: auth, route: host + route, clientId: cid };
}

let handleResponse = (res) => {
  return res.json()
    .then((json) => {
      if (!res.ok) {
        const error = Object.assign({}, json, {
          status: res.status,
          statusText: res.statusText,
        });
        return Promise.reject(error);
      }
      return json;
    });
}

UserSession.postImage = function (user, image, onSuccess, onError) {

  let { route, auth } = doConfig();
  if (!onSuccess) onSuccess = () => {};
  if (!onError) onError = (e) => console.error(e);

  console.log('POST(Db.postImage): ' + route);

  //if (typeof image === 'string') image = toImageFile(image);

  let fdata = new FormData();
  fdata.append('profileImage', image);
  fdata.append('clientId', process.env.CLIENT_ID);
  fdata.append('videoId', 2);

  fetch(route + 'photo/' + (user._id || 567), {
      method: "post",
      headers: { "Authorization": 'Basic ' + btoa(auth) },
      body: fdata
    })
    .then(handleResponse.bind(this))
    .then(onSuccess.bind(this))
    .catch(onError.bind(this));
}

UserSession.createUser = function (user, onSuccess, onError) {

  let { route, auth, cid } = doConfig();
  if (!onSuccess) onSuccess = (json) => Object.assign(user, json);
  if (!onError) onError = (e) => console.error(e);
  if (user.clientId < 0) user.clientId = cid;

  console.log('POST(Db.CreateUser): ' + route, user);

  fetch(route, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(user)
    })
    .then(handleResponse.bind(this))
    .then(onSuccess.bind(this))
    .catch(onError.bind(this));
}

UserSession.updateUser = function (user, onSuccess, onError) {

  if (typeof user._id === 'undefined') {
    throw Error('user._id required');
  }

  let { route, auth, cid } = doConfig();
  if (!onSuccess) onSuccess = json => Object.assign(user, json);
  if (!onError) onError = e => console.error(e);

  console.log('PUT(Db.UpdateUser): ' + route);

  if (user.clientId < 0) user.clientId = cid;

  fetch(route + user._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic ' + btoa(auth)
      },
      body: JSON.stringify(user)
    })
    .then(handleResponse.bind(this))
    .then(onSuccess.bind(this))
    .catch(onError.bind(this));
}

export default UserSession;
