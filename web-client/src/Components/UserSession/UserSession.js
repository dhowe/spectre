//import fs from 'fs';
import React from 'react';
import User from '../User/user';
import DotEnv from 'dotenv';
import FormData from 'form-data';

let UserSession = React.createContext(new User());

fetch('/gusers.json').then(response => {
  return response.json();
}).then(data => {

  // Work with JSON data here
  UserSession.defaults = data;

}).catch(err => {
  console.log(err);
});

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
