import React from 'react';
import User from '../User/user';
import DotEnv from 'dotenv';

let UserSession = React.createContext(new User());

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

UserSession.createUser = function (user, onSuccess, onError) {

  let { route, auth, cid } = doConfig();
  if (!onSuccess) onSuccess = () => {};
  if (!onError) onError = () => {};

  console.log('POST(Db.CreateUser): ' + route);

  if (user.clientId < 0) user.clientId = cid;

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

  let { route, auth, cid } = doConfig();
  if (!onSuccess) onSuccess = () => {};
  if (!onError) onError = () => {};

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
