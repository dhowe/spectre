import fs from 'fs';
import React from 'react';
import User from '../User/user';
import DotEnv from 'dotenv';
import FormData from 'form-data';

let UserSession = React.createContext(new User());

let doConfig = () => {

  console.log('fs', Object.keys(fs));

  // get auth from .env or heroku configs
  DotEnv.config();
  const env = process.env;
  const route = '/api/users/';
  //console.log('HOST: '+env.REACT_APP_API_HOST);
  //env.REACT_APP_API_HOST = undefined;
  const host = env.REACT_APP_API_HOST || 'http://localhost:8083';
  const auth = env.REACT_APP_API_USER + ':' + env.REACT_APP_API_SECRET;
  if (!auth || !auth.length) console.error("Auth required!");

  return { auth: auth, route: host + route };
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

UserSession.postImage = function (user, onSuccess, onError) {

  console.log('UserSession.postImage');

  let { route, auth } = doConfig();
  if (!onSuccess) onSuccess = () => {};
  if (!onError) onError = () => {};

  console.log('POST(Db.postImage): ' + route);

  fs.readFile('/targets/target3.png', (err, data) => {

    let fdata = new FormData();
    fdata.append('profileImage', data);
    fdata.append('clientId', process.env.CLIENT_ID);
    fdata.append('videoId', 2);

    fetch(route + 'photo/' + user._id, {
        method: "post",
        headers: {
          //"Content-Type": "application/json",
          "Authorization": 'Basic ' + btoa(auth)
        },
        body: fdata
      })
      .then(handleResponse.bind(this))
      .then(onSuccess.bind(this))
      .catch(onError.bind(this));
  });
}

UserSession.createUser = function (user, onSuccess, onError) {

  let { route, auth } = doConfig();
  if (!onSuccess) onSuccess = () => {};
  if (!onError) onError = () => {};

  console.log('POST(Db.CreateUser): ' + route);

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

  if (!user._id || !user._id.length) {
    throw Error('User._id required');
  }

  let { route, auth } = doConfig();

  if (!onSuccess) onSuccess = () => {};
  if (!onError) onError = () => {};

  console.log('PUT(Db.UpdateUser): ' + route);

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
